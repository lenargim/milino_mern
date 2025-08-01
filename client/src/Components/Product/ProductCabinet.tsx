import React, {FC, useEffect, useState} from 'react';
import {CabinetType, ProductFormType} from "../../helpers/productTypes";
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
import ProductLayout from "./ProductLayout";
import {CartAPIImagedType} from "../../helpers/cartTypes";

const ProductCabinet: FC<CabinetType> = ({
                                             product,
                                             productData
                                         }) => {
    const {
        id,
        attributes,
        widthDivider,
        category,
        isAngle,
        product_type,
    } = product;
    const {materialData, tablePriceData, sizeLimit, productPriceData} = productData
    const {values, setFieldValue} = useFormikContext<ProductFormType>();
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
    const realWidth = +width || +customWidthNumber || 0;
    const realBlindWidth = +blindWidth || +customBlindWidthNumber || 0;
    const realHeight = +height || +customHeightNumber || 0;
    const realDepth = !isAngle ? (+depth || +customDepthNumber || 0) : realWidth;
    const realMiddleSection = middleSectionNumber || 0
    const doorArr = getDoorMinMaxValuesArr(realWidth, doorValues, widthDivider);
    const [hingeArr, setHingeArr] = useState<string[]>(getHingeArr(doorArr || [], id, realWidth, realHeight, product_type));
    useEffect(() => {
        if (isAngle && realWidth !== depth) setFieldValue('Depth', realWidth);
        const doorNum = checkDoors(+doors, doorArr, hingeOpening)
        if (doors !== doorNum) setFieldValue('Doors', doorNum);

        if (price !== totalPrice) setFieldValue('price', totalPrice);
        if (newType !== image_active_number) setFieldValue('image_active_number', newType);
        if ((door_profile || door_glass_type || door_glass_color) && !chosenOptions.includes('Glass Door')) {
            setFieldValue('glass_door', [])
        }
    }, [values]);
    useEffect(() => {
        if (product_type === 'standard') {
            const newHeightRange = getHeightRangeBasedOnCurrentWidth(tablePriceData, width, category)
            if (!newHeightRange.includes(height)) setFieldValue('Height', newHeightRange[0]);
        }
    }, [width]);

    useEffect(() => {
        setHingeArr(getHingeArr(doorArr || [], id, width, height, product_type))
    }, [width, height])

    useEffect(() => {
        if (!hingeArr.includes(hingeOpening)) setFieldValue('Hinge opening', hingeArr[0]);
    }, [hingeArr, hingeOpening])

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
        custom: undefined,
        image_active_number: newType,
        note: note,
    };
    const totalPrice = calculateProduct(cabinetItem, materialData, tablePriceData, sizeLimit, product)
    return (
        <ProductLayout product={product}
                       hingeArr={hingeArr}
                       productData={productData}
        />
    )
};

export default ProductCabinet;