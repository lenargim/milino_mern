import React, {FC, useEffect, useState} from 'react';
import {CabinetType, MaybeUndefined, ProductFormType} from "../../helpers/productTypes";
import {
    calculateProduct,
    getDoorMinMaxValuesArr,
    getType
} from "../../helpers/calculatePrice";
import {
    checkDoors, getHeightRangeBasedOnCurrentWidth, getHingeArr
} from "../../helpers/helpers";
import {useFormikContext} from "formik";
import ProductLayout from "./ProductLayout";
import {CartAPIImagedType, CartCustomType} from "../../helpers/cartTypes";

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
        width,
        blind_width,
        height,
        depth,
        custom_width,
        custom_height,
        custom_depth,
        custom_blind_width,
        middle_section,
        corner,
        doors_amount: doors,
        options: chosenOptions,
        glass_door: [door_profile, door_glass_type, door_glass_color],
        glass_shelf: shelf_glass_color,
        hinge_opening,
        led_borders,
        led_alignment,
        led_indent_string,
        note,
        image_active_number,
        price,
        custom
    } = values;
    const realWidth = width || +custom_width || 0;
    const realBlindWidth = +blind_width || +custom_blind_width || 0;
    const realHeight = height || +custom_height || 0;
    const realDepth = !isAngle ? (+depth || +custom_depth || 0) : realWidth;
    const realMiddleSection = middle_section || 0
    const doorArr = getDoorMinMaxValuesArr(realWidth, doorValues, widthDivider);
    const [hingeArr, setHingeArr] = useState<string[]>(getHingeArr(doorArr || [], id, realWidth, realHeight, product_type));

    useEffect(() => {
        if (isAngle && realWidth !== depth) setFieldValue('depth', realWidth);
        const doorNum = checkDoors(hinge_opening)
        if (doors !== doorNum) setFieldValue('doors_amount', doorNum);

        if (price !== totalPrice) setFieldValue('price', totalPrice);
        if (newType !== image_active_number) setFieldValue('image_active_number', newType);
        if ((door_profile || door_glass_type || door_glass_color) && !chosenOptions.includes('Glass Door')) {
            setFieldValue('glass_door', [])
        }
    }, [values]);
    useEffect(() => {
        if (product_type === 'standard') {
            const newHeightRange = getHeightRangeBasedOnCurrentWidth(tablePriceData, width, category)
            if (!newHeightRange.includes(height)) setFieldValue('height', newHeightRange[0]);
        }
    }, [width]);
    useEffect(() => {
        setHingeArr(getHingeArr(doorArr || [], id, width, height, product_type))
    }, [width, height])
    useEffect(() => {
        if (!hingeArr.includes(hinge_opening)) setFieldValue('hinge_opening', hingeArr[0]);
    }, [hingeArr, hinge_opening])

    const newType = getType(realWidth, realHeight, widthDivider, doors, category, attributes);

    const customVal:MaybeUndefined<CartCustomType> = custom ? {
        accessories: custom.closet_accessories ? {closet: custom.closet_accessories} : undefined,
        jewelery_inserts: custom.jewelery_inserts,
        mechanism: custom.mechanism
    } : undefined;
    const cabinetItem: CartAPIImagedType = {
        _id: '',
        room_id: '',
        product_id: id,
        product_type,
        amount: 1,
        width: realWidth,
        height: realHeight,
        depth: realDepth,
        blind_width: realBlindWidth,
        middle_section: realMiddleSection,
        corner,
        hinge: hinge_opening,
        options: chosenOptions,
        glass: {
            door: [door_profile, door_glass_type, door_glass_color],
            shelf: shelf_glass_color,
        },
        led: {
            border: led_borders,
            alignment: led_alignment,
            indent: led_indent_string
        },
        custom: customVal,
        image_active_number: newType,
        note,
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