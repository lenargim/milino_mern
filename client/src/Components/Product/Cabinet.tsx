import React, {FC, useEffect} from 'react';
import {CabinetType} from "../../helpers/productTypes";
import {
    getAttributesProductPrices,
    getDoorMinMaxValuesArr,
    getHingeArr,
    getProductCoef, getProductDataToCalculatePrice,
    getStartPrice, getTablePrice,
    getType
} from "../../helpers/calculatePrice";
import {
    checkDoors, productValuesType
} from "../../helpers/helpers";
import {useFormikContext} from "formik";
import CabinetLayout from "./CabinetLayout";
import {CabinetItemType} from "../../api/apiFunctions";

const Cabinet: FC<CabinetType> = ({
                                      product,
                                      materialData,
                                      productRange,
                                      tablePriceData,
                                      sizeLimit
                                  }) => {
    const {
        id,
        attributes,
        widthDivider,
        category,
        isAngle,
        isProductStandard
    } = product;
    const {
        box_material_coef,
        box_material_finish_coef,
        drawer_brand,
        premium_coef,
    } = materialData

    const {values, setFieldValue} = useFormikContext<productValuesType>();
    const productPriceData = getProductDataToCalculatePrice(product, drawer_brand);
    const {doorValues} = productPriceData;

    const {
        ['Width']: width,
        ['Blind Width']: blindWidth,
        ['Height']: height,
        ['Depth']: depth,
        ['Custom Width Number']: customWidthNumber,
        ['Custom Height Number']: customHeightNumber,
        ['Custom Depth Number']: customDepthNumber,
        ['Custom Blind Width Number']: customBlindWidthNumber,
        ['Middle Section Number']: middleSectionNumber,
        Corner: corner,
        'Doors': doors,
        Options: chosenOptions,
        ['Door Profile']: door_profile,
        ['Door Glass Type']: door_glass_type,
        ['Door Glass Color']: door_glass_color,
        ['Shelf Profile']: shelf_profile,
        ['Shelf Glass Type']: shelf_glass_type,
        ['Shelf Glass Color']: shelf_glass_color,
        ['Hinge opening']: hingeOpening,
        'LED borders': ledBorders,
        ['LED alignment']: led_alignment,
        ['LED indent']: led_indent,
        Note: note,
        image_active_number,
        price: price,
    } = values;

    const realWidth = +width || +customWidthNumber || 0;
    const realBlindWidth = +blindWidth || +customBlindWidthNumber || 0;
    const realHeight = +height || +customHeightNumber || 0;
    const realDepth = !isAngle ? (+depth || +customDepthNumber || 0) : realWidth;
    const realMiddleSection = middleSectionNumber || 0
    const doorArr = getDoorMinMaxValuesArr(realWidth, doorValues, widthDivider);
    const hingeArr = getHingeArr(doorArr || [], id);
    const boxFromFinishMaterial = chosenOptions.includes("Box from finish material");
    const newType = getType(realWidth, realHeight, widthDivider, doors, category, attributes);
    const boxMaterialCoef = boxFromFinishMaterial ? box_material_finish_coef : box_material_coef;
    const allCoefs = !isProductStandard ? boxMaterialCoef * premium_coef : 1;
    const tablePrice = getTablePrice(realWidth, realHeight, realDepth, tablePriceData, category);
    const startPrice = getStartPrice(realWidth, realHeight, realDepth, allCoefs, sizeLimit, tablePrice);
    const cabinetItem: CabinetItemType = {
        product_id: id,
        product_type: product.product_type,
        amount: 1,
        width: realWidth,
        height: realHeight,
        depth: realDepth,
        blind_width: realBlindWidth,
        middle_section: realMiddleSection,
        corner: corner,
        hinge: hingeOpening,
        options: chosenOptions,
        door_option: [door_profile, door_glass_type, door_glass_color],
        shelf_option: [shelf_profile, shelf_glass_type, shelf_glass_color],
        led_border: ledBorders,
        led_alignment: led_alignment,
        led_indent: led_indent,
        image_active_number: newType,
        note: note,
        material: '',
        leather: ''
    }
    const coef = getProductCoef(cabinetItem, tablePriceData, product);
    const productCoef = 1 + (coef.width + coef.height + coef.depth)
    const attributesPrices = getAttributesProductPrices(cabinetItem, product, materialData);
    let attrPrice = Object.values(attributesPrices).reduce((partialSum, a) => partialSum + a, 0);
    const totalPrice = startPrice ? +(startPrice * productCoef + attrPrice).toFixed(1) : 0;
    useEffect(() => {
        if (isAngle && realWidth !== depth) setFieldValue('Depth', realWidth);
        const doorNum = checkDoors(+doors, doorArr, hingeOpening)
        if (doors !== doorNum) setFieldValue('Doors', doorNum);
        if (doors && !hingeArr.includes(hingeOpening)) setFieldValue('Hinge opening', hingeArr[0]);
        if (price !== totalPrice) {
            setFieldValue('price', totalPrice)
        }
        if (newType !== image_active_number) {
            setFieldValue('image_active_number', newType)
        }
    }, [values])
    console.log(`table price ${tablePrice}`)
    return (
        <>
            <CabinetLayout product={product} productRange={productRange}
                           tablePriceData={tablePriceData}
                           productPriceData={productPriceData}
                           hingeArr={hingeArr}
                           allCoefs={allCoefs} coef={coef}
            />
        </>
    )
};

export default Cabinet;