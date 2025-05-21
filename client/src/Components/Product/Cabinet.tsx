import React, {FC, useEffect} from 'react';
import {CabinetType, productValuesType} from "../../helpers/productTypes";
import {
    calculateProduct,
    getDoorMinMaxValuesArr,
    getProductDataToCalculatePrice,
    getType
} from "../../helpers/calculatePrice";
import {
    checkDoors, getHeightRangeBasedOnCurrentWidth, getHingeArr
} from "../../helpers/helpers";
import {useFormikContext} from "formik";
import CabinetLayout from "./CabinetLayout";
import {CartAPIImagedType} from "../../api/apiFunctions";

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
        isProductStandard,
        product_type
    } = product;
    const {drawer_brand} = materialData
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
        glass_door: [door_profile, door_glass_type, door_glass_color],
        glass_shelf: shelf_glass_color,
        ['Hinge opening']: hingeOpening,
        'LED borders': ledBorders,
        ['LED alignment']: led_alignment,
        ['LED indent']: led_indent,
        Note: note,
        image_active_number,
        price: price,
    } = values;
    useEffect(() => {
        if (isAngle && realWidth !== depth) setFieldValue('Depth', realWidth);
        const doorNum = checkDoors(+doors, doorArr, hingeOpening)
        if (doors !== doorNum) setFieldValue('Doors', doorNum);
        if (doors && !hingeArr.includes(hingeOpening)) setFieldValue('Hinge opening', hingeArr[0]);
        if (price !== totalPrice) {
            setFieldValue('price', totalPrice)
        }
        if (newType !== image_active_number) {
            setFieldValue('image_active_number', newType);

        }
        if ((door_profile || door_glass_type || door_glass_color) && !chosenOptions.includes('Glass Door')) {
            setFieldValue('glass_door', [])
        }
    }, [values]);
    useEffect(() => {
        if (isProductStandard) {
            const newHeightRange = getHeightRangeBasedOnCurrentWidth(tablePriceData, width, category)
            if (!newHeightRange.includes(height)) setFieldValue('Height', newHeightRange[0]);
        }
    }, [width]);

    const realWidth = +width || +customWidthNumber || 0;
    const realBlindWidth = +blindWidth || +customBlindWidthNumber || 0;
    const realHeight = +height || +customHeightNumber || 0;
    const realDepth = !isAngle ? (+depth || +customDepthNumber || 0) : realWidth;
    const realMiddleSection = middleSectionNumber || 0
    const doorArr = getDoorMinMaxValuesArr(realWidth, doorValues, widthDivider);
    const hingeArr = getHingeArr(doorArr || [], id);
    const newType = getType(realWidth, realHeight, widthDivider, doors, category, attributes);
    const cabinetItem: CartAPIImagedType = {
        _id: '',
        room_id: '',
        product_id: id,
        product_type: product_type,
        amount: 1,
        width: realWidth,
        height: realHeight,
        depth: realDepth,
        blind_width: realBlindWidth,
        middle_section: realMiddleSection,
        corner: corner,
        hinge: hingeOpening,
        options: chosenOptions,
        glass: {
            door: [door_profile, door_glass_type, door_glass_color],
            shelf: shelf_glass_color,
        },
        led: {
            border: ledBorders,
            alignment: led_alignment,
            indent: led_indent
        },
        image_active_number: newType,
        note: note,
    };
    const totalPrice = calculateProduct(cabinetItem, materialData, tablePriceData, sizeLimit, product)
    return (
        <CabinetLayout product={product}
                       productRange={productRange}
                       productPriceData={productPriceData}
                       hingeArr={hingeArr}
                       tablePriceData={tablePriceData}
        />
    )
};

export default Cabinet;