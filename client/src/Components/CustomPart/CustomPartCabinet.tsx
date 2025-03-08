import React, {FC, useEffect} from 'react';
import { useFormikContext} from 'formik';
import CustomPartLayout from "./CustomPartLayout";
import {
    CustomPartType,
    MaybeNull,
    MaybeUndefined
} from "../../helpers/productTypes";
import {getCustomPartPrice} from "../../helpers/calculatePrice";
import {CustomPartFormValuesType} from "./CustomPart";
import {getFinishColorCoefCustomPart, useAppSelector} from "../../helpers/helpers";
import {MaterialsFormType} from "../../common/MaterialsForm";
export type CustomPartFormType = {
    product: CustomPartType,
    materials: MaterialsFormType
    isDepthIsConst: boolean,
}
const CustomPartCabinet: FC<CustomPartFormType> = ({product, isDepthIsConst, materials}) => {
    const {values, setFieldValue} = useFormikContext<CustomPartFormValuesType>();

    const {
        Material: material,
        glass_door: [doorProfileVal],
        'Width Number': widthNumber,
        'Height Number': heightNumber,
        'Depth Number': depthNumber,
        price
    } = values
    const {id, materials_array, type, glass_door} = product;
    const showDepthBlock = !!(type === 'custom' && !isDepthIsConst);
    if (showDepthBlock) {
        const newDepth = materials_array?.find(el => el.name === material)?.depth;
        if (newDepth && depthNumber !== newDepth) setFieldValue('Depth Number', newDepth);
    }
    useEffect(() => {
        let profileNumber:MaybeNull<number> = null;
        let newPrice;
        if (type === "glass-door") {
            if (glass_door) {
                const {Profile: doorProfiles} = glass_door;
                if (doorProfiles) {
                    let profileCurrent:MaybeUndefined<string> = doorProfiles?.find(el => el.value === doorProfileVal)?.type;
                    if (profileCurrent) profileNumber = +profileCurrent
                }
            }
        }
        const finishColorCoef = getFinishColorCoefCustomPart(id,material,materials.door_color);
        newPrice = +(getCustomPartPrice(id, widthNumber, heightNumber, depthNumber, material,profileNumber)*finishColorCoef).toFixed(1);
        if (price !== newPrice) {
            setFieldValue('price', newPrice)
        }
    }, [values])

    return (
        <CustomPartLayout product={product} showDepthBlock={showDepthBlock}  />
    );
};

export default CustomPartCabinet;