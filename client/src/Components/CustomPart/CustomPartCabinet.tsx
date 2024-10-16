import React, {FC, useEffect} from 'react';
import { useFormikContext} from 'formik';
import CustomPartLayout from "./CustomPartLayout";
import {
    CustomPart,
    MaybeNull,
    MaybeUndefined
} from "../../helpers/productTypes";
import {getCustomPartPrice} from "../../helpers/calculatePrice";
import LEDForm from "./LEDForm";
import DoorAccessoiresForm from "./DoorAccessoiresForm";
import StandardDoorForm from "./StandardDoorForm";
export type CustomPartFormType = {
    product: CustomPart,
    isDepthIsConst: boolean
}
export type CustomPartFormValuesType = {
    Width: string,
    Height: string,
    Depth: string,
    ['Width Number']: number,
    ['Height Number']: number,
    ['Depth Number']: number,
    Material: string,
    Note: string,
    price: number,
    glass_door: string[],
    glass_shelf: string
}


export type HingeType = {
    title: string,
    label: string,
    qty: number,
    price: number
}

export type hingeHoleCustomType = {
    title: string,
    qty: number,
    price: 6
}

export type DoorAccessoiresType = {
    aventos: HingeType[],
    ['Door Hinge']: number,
    ['Hinge Holes']: number,
    PTO: HingeType[],
    servo: HingeType[]

}

export interface DoorAccessoiresValuesType extends DoorAccessoiresType {
    price: number,
    Note: string,
}

const CustomPartCabinet: FC<CustomPartFormType> = ({product, isDepthIsConst}) => {
    const {values, setFieldValue} = useFormikContext<CustomPartFormValuesType>();

    const {
        Material: material,
        Note,
        glass_door: [doorProfileVal, doorTypeVal, doorColorVal],
        'Width Number': widthNumber,
        'Height Number': heightNumber,
        'Depth Number': depthNumber,
        price
    } = values
    const {id, materials_array, width, type, glass_door} = product;
    const showDepthBlock = (type === 'custom' && !isDepthIsConst);

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
        newPrice = +(getCustomPartPrice(id, widthNumber, heightNumber, depthNumber, material,profileNumber)).toFixed(1);
        if (price !== newPrice) {
            setFieldValue('price', newPrice)
        }
    }, [values])

    if (type === 'led-accessories') return <LEDForm customPart={product} />
    if (type === 'door-accessories') return <DoorAccessoiresForm customPart={product} />
    if (type === 'standard-door' || type === 'standard-glass-door') return <StandardDoorForm customPart={product} />

    return (
        <CustomPartLayout product={product} isDepthIsConst={isDepthIsConst} />
    );
};

export default CustomPartCabinet;