import React, {FC, useEffect} from 'react';
import {Form, useFormikContext} from 'formik';
import {CustomPartType, CustomTypes, MaybeUndefined} from "../../helpers/productTypes";
import {CustomPartFormType} from "./CustomPart";
import {
    checkHeightBlockShownInCustomPart,
    filterCustomPartsMaterialsArray,
} from "../../helpers/helpers";
import s from "../Product/product.module.sass";
import {ProductInputCustom, ProductRadioInput, TextInput} from "../../common/Form";
import CustomPartGlassDoorBlock from "./CustomPartGlassDoorBlock";
import CustomPartGlassShelfBlock from "./CustomPartGlassShelfBlock";
import CustomPartSubmit from "./CustomPartSubmit";
import CustomPartMaterialsArray from "./CustomPartMaterialsArray";

type CustomPartCabinet = {
    product: CustomPartType,
    isDepthIsConst: boolean,
    isStandardCabinet: boolean
}

export type CustomPartFormTypeLayout = {
    width_string: string,
    height_string: string,
    depth_string: string,
    width: number,
    height: number,
    depth: number,
    material: string,
    note: string,
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

export type DoorAccessoriesType = {
    aventos: HingeType[],
    door_hinge: number,
    hinge_holes: number,
    PTO: HingeType[],
    servo: HingeType[]

}

export interface DoorAccessoriesValuesType extends DoorAccessoriesType {
    price: number,
    Note: string,
}

export type CustomPartLayout = {
    product: CustomPartType,
    isStandardCabinet: boolean
}


const CustomPartCabinet: FC<CustomPartCabinet> = ({product, isStandardCabinet}) => {
    const {values, setFieldValue, errors} = useFormikContext<CustomPartFormType>();
    const {
        material,
        glass_door,
        depth,
        price
    } = values;
    const {materials_array, type, id} = product;

    useEffect(() => {
        const new_depth = materials_array && materials_array.find(el => el.name === material)?.depth;
        if (new_depth && depth !== new_depth) setFieldValue('depth', new_depth);
    }, [material])
    const showGlassDoorBlock = type === 'glass-door';
    const showGlassShelfBlock = type === 'glass-shelf';
    const showDepthBlock = type === 'custom';
    return (
        <Form>
            <div className={s.block}>
                <h3>Width</h3>
                <div className={s.options}>
                    <ProductInputCustom name="width_string"/>
                </div>
            </div>
            <div className={s.block}>
                <h3>Height</h3>
                <div className={s.options}>
                    <ProductInputCustom name="height_string"/>
                </div>
            </div>
            {showDepthBlock ? <div className={s.block}>
                <h3>Depth</h3>
                <div className={s.options}>
                    <ProductInputCustom name="depth_string"/>
                </div>
            </div> : null}
            <CustomPartMaterialsArray product={product} isStandardCabinet={isStandardCabinet} />
            {showGlassDoorBlock && <CustomPartGlassDoorBlock glass_door={glass_door} is_custom={true} product_id={id}/>}
            {showGlassShelfBlock && <CustomPartGlassShelfBlock/>}
            <div className={s.block}>
                <TextInput type={"text"} label={'Note'} name="note"/>
            </div>
            <div className={s.total}>
                <span>Total: </span>
                <span>{price}$</span>
            </div>
            <CustomPartSubmit/>
        </Form>
    );
};

export default CustomPartCabinet;