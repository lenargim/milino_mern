import React, {FC, useEffect} from 'react';
import {useFormikContext} from 'formik';
import CustomPartLayout from "./CustomPartLayout";
import {CustomPartType} from "../../helpers/productTypes";
import {getCustomPartPrice} from "../../helpers/calculatePrice";
import {CustomPartFormValuesType} from "./CustomPart";
import {getFinishColorCoefCustomPart} from "../../helpers/helpers";
import {MaterialsFormType} from "../../common/MaterialsForm";

type CustomPartCabinet = {
    product: CustomPartType,
    materials: MaterialsFormType
    isDepthIsConst: boolean,
    isStandardCabinet: boolean
}
const CustomPartCabinet: FC<CustomPartCabinet> = ({product, isDepthIsConst, materials, isStandardCabinet}) => {
    const {values, setFieldValue} = useFormikContext<CustomPartFormValuesType>();

    const {
        Material: material,
        glass_door: [doorProfileVal],
        'Width Number': widthNumber,
        'Height Number': heightNumber,
        'Depth Number': depthNumber,
        price
    } = values
    const {id, materials_array, type} = product;
    const showDepthBlock = (type === 'custom' && !isDepthIsConst);
    if (showDepthBlock) {
        const newDepth = materials_array?.find(el => el.name === material)?.depth;
        if (newDepth && depthNumber !== newDepth) setFieldValue('Depth Number', newDepth);
    }
    useEffect(() => {
        let newPrice;
        const finishColorCoef = getFinishColorCoefCustomPart(id, material, materials.door_color);
        newPrice = +(getCustomPartPrice(id, widthNumber, heightNumber, depthNumber, material, doorProfileVal) * finishColorCoef).toFixed(1);
        if (price !== newPrice) {
            setFieldValue('price', newPrice)
        }
    }, [values])

    return (
        <CustomPartLayout product={product} showDepthBlock={showDepthBlock} isStandardCabinet={isStandardCabinet}/>
    );
};

export default CustomPartCabinet;