import React, {FC, useEffect} from 'react';
import {
    CabinetType, CartExtrasType, extraPricesType, productSizesType,
} from "../../helpers/productTypes";
import {
    addGlassDoorPrice,
    addGlassShelfPrice,
    addPTODoorsPrice,
    addPTODrawerPrice,
    addPTOTrashBinsPrice, calculatePrice,
    getDoorMinMaxValuesArr,
    getDoorPrice,
    getDoorSquare,
    getDoorWidth,
    getDrawerPrice,
    getHingeArr,
    getInitialPrice,
    getLedPrice, getPriceForExtraHeight, getPriceForExtraWidth, getProductDataToCalculatePrice,
    getPvcPrice, getStartPrice, getTablePrice,
    getType
} from "../../helpers/calculatePrice";
import {
    checkDoors, getSquare, productValuesType
} from "../../helpers/helpers";
import {useFormikContext} from "formik";
import CabinetLayout from "./CabinetLayout";
import Test from "./Test";

const Cabinet: FC<CabinetType> = ({
                                      product,
                                      materialData,
                                      productRange,
                                      tablePriceData,
                                      sizeLimit
                                  }) => {
    const {
        attributes,
        widthDivider,
        category,
        legsHeight,
        isBlind,
        isAngle,
        cartExtras
    } = product;

    const {
        category: materialCat,
        door_type,
        door_finish_material,
        is_standard_cabinet,
        base_coef,
        base_price_type,
        box_material_coef,
        box_material_finish_coef,
        door_price_multiplier,
        drawer_brand,
        drawer_type,
        drawer_color,
        grain_coef,
        premium_coef,
        is_acrylic,
        leather,

    } = materialData

    const {widthRange, heightRange} = productRange;
    const {values, setFieldValue} = useFormikContext<productValuesType>();
    const productPriceData = getProductDataToCalculatePrice(product, drawer_brand);
    const {
        doorValues,
        drawersQty,
        shelfsQty,
        rolloutsQty,
    } = productPriceData;

    const {
        ['Width']: width,
        ['Blind Width']: blindWidth,
        ['Height']: height,
        ['Depth']: depth,
        ['Custom Width Number']: customWidthNumber,
        ['Custom Height Number']: customHeightNumber,
        ['Custom Depth Number']: customDepthNumber,
        ['Custom Blind Width Number']: customBlindWidthNumber,
        ['Doors']: doors,
        Options: chosenOptions,
        ['Door Profile']: doorProfile,
        ['Hinge opening']: hingeOpening,
        'LED borders': ledBorders,
        image_active_number,
        price: price,
    } = values;

    const realWidth = +width || +customWidthNumber || 0;
    const realBlindWidth = +blindWidth || +customBlindWidthNumber || 0;
    const realHeight = +height || +customHeightNumber || 0;
    const doorHeight = realHeight ? realHeight - legsHeight : 0;
    const realDepth = !isAngle ? (+depth || +customDepthNumber || 0) : realWidth;
    if (isAngle && realWidth !== depth) setFieldValue('Depth', realWidth);
    const doorArr = getDoorMinMaxValuesArr(realWidth, doorValues);
    const hingeArr = getHingeArr(doorArr || [], category);
    const boxFromFinishMaterial = chosenOptions.includes("Box from finish material");
    const doorWidth = getDoorWidth(realWidth, realBlindWidth, isBlind, isAngle);
    const doorSquare = getDoorSquare(doorWidth, doorHeight);
    const frontSquare = getSquare(realWidth, doorHeight);
    const newType = getType(realWidth, realHeight, widthDivider, doors, category, attributes);
    const extraPrices: extraPricesType = {
        ptoDoors: chosenOptions.includes('PTO for doors') ? addPTODoorsPrice(attributes, image_active_number) : 0,
        ptoDrawers: chosenOptions.includes('PTO for drawers') ? addPTODrawerPrice(image_active_number, drawersQty) : 0,
        glassShelf: chosenOptions.includes('Glass Shelf') ? addGlassShelfPrice(shelfsQty) : 0,
        glassDoor: chosenOptions.includes('Glass Door') ? addGlassDoorPrice(doorSquare, doorProfile) : 0,
        ptoTrashBins: chosenOptions.includes('PTO for Trash Bins') ? addPTOTrashBinsPrice() : 0,
        ledPrice: getLedPrice(realWidth, realHeight, ledBorders),
        pvcPrice: getPvcPrice(realWidth, realBlindWidth, doorHeight, is_acrylic, door_type, door_finish_material),
        doorPrice: getDoorPrice(frontSquare, door_price_multiplier),
        drawerPrice: getDrawerPrice(drawersQty + rolloutsQty, realWidth, materialCat, drawer_brand, drawer_type, drawer_color),
        boxMaterialCoef: boxFromFinishMaterial ? box_material_finish_coef : box_material_coef,
        frontSquare,
        premiumCoef: premium_coef,
        doorSquare: doorSquare
    }
    const allCoefs = extraPrices.boxMaterialCoef * premium_coef;
    const initialPrice = getInitialPrice(tablePriceData, productRange, category, allCoefs);

    const tablePrice = getTablePrice(realWidth, realHeight, realDepth, tablePriceData, category);
    const startPrice = getStartPrice(realWidth, realHeight, realDepth, allCoefs, sizeLimit, tablePrice);
    const sizes: productSizesType = {
        width: realWidth,
        height: realHeight,
        depth: realDepth,
        maxWidth: widthRange[widthRange.length - 1],
        maxHeight: heightRange[heightRange.length - 1],
    }
    const calculatedData = calculatePrice(sizes, extraPrices, productRange, startPrice, isAngle);
    const {totalPrice, coef, coefExtra} = calculatedData;
    const totalDepthPrice = initialPrice * (coef.depth + 1);
    extraPrices.width = getPriceForExtraWidth(initialPrice, tablePriceData, width, coef.width, allCoefs)
    extraPrices.height = getPriceForExtraHeight(tablePriceData, initialPrice, width, height, allCoefs, coef.height)
    extraPrices.depth = +(totalDepthPrice - initialPrice).toFixed(1);
    extraPrices.tablePrice = tablePrice;
    extraPrices.startPrice = startPrice

    useEffect(() => {
        const doorNum = checkDoors(+doors, doorArr, hingeOpening)
        if (doors !== doorNum) setFieldValue('Doors', doorNum);
        if (doors && !hingeArr.includes(hingeOpening)) setFieldValue('Hinge opening', hingeArr[0]);
        if (price !== totalPrice) {
            setFieldValue('price', totalPrice)
        }
        if (newType !== image_active_number) {
            setFieldValue('image_active_number', newType)
        }
        const newCartExtras: CartExtrasType = {
            ptoDoors: extraPrices.ptoDoors,
            ptoDrawers: extraPrices.ptoDrawers,
            glassShelf: extraPrices.glassShelf,
            glassDoor: extraPrices.glassDoor,
            ptoTrashBins: extraPrices.ptoTrashBins,
            ledPrice: extraPrices.ledPrice,
            coefExtra,
            attributes,
            boxFromFinishMaterial
        }
        if (JSON.stringify(cartExtras) === JSON.stringify(newCartExtras)) {
            setFieldValue('cartExtras', newCartExtras)
        }
    }, [values])

    return (
        <>
            <CabinetLayout product={product} extraPrices={extraPrices} productRange={productRange}
                           productPriceData={productPriceData} hingeArr={hingeArr}/>
            <Test addition={extraPrices} coef={coef}/>
        </>
    )
};

export default Cabinet;