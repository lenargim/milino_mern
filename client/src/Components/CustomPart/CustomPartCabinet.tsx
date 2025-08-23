import React, {FC} from 'react';
import {Form, useFormikContext} from 'formik';
import {CustomPartType} from "../../helpers/productTypes";
import {CustomPartFormType} from "./CustomPart";
import {
    filterCustomPartsMaterialsArray,
} from "../../helpers/helpers";
import s from "../Product/product.module.sass";
import {ProductInputCustom, ProductRadioInput, TextInput} from "../../common/Form";
import CustomPartGlassDoorBlock from "./CustomPartGlassDoorBlock";
import CustomPartGlassShelfBlock from "./CustomPartGlassShelfBlock";
import CustomPartSubmit from "./CustomPartSubmit";

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
    showDepthBlock: boolean,
    isStandardCabinet:boolean
}
const CustomPartCabinet: FC<CustomPartCabinet> = ({product, isDepthIsConst, isStandardCabinet}) => {
    const {values, setFieldValue} = useFormikContext<CustomPartFormType>();
    const {
        material,
        width,
        glass_door,
        depth,
        price
    } = values;
    const {materials_array, type, id} = product;
    const showDepthBlock = (type === 'custom' && !isDepthIsConst);
    if (showDepthBlock) {
        const newDepth = materials_array?.find(el => el.name === material)?.depth;
        if (newDepth && depth !== newDepth) setFieldValue('depth', newDepth);
    }

    const filtered_materials_array = filterCustomPartsMaterialsArray(materials_array, id, isStandardCabinet)
    const showHeightBlock = type !== 'pvc';
    const showGlassDoorBlock = type === 'glass-door'
    const showGlassShelfBlock = type === 'glass-shelf'
    return (
        <Form>
            {!width ?
                <div className={s.block}>
                    <h3>{type !== 'pvc' ? 'Width' : 'PVC Length(ft)'}</h3>
                    <div className={s.options}>
                        <ProductInputCustom name="width_string"/>
                    </div>
                </div> : null}

            {showHeightBlock ?
                <div className={s.block}>
                    <h3>Height</h3>
                    <div className={s.options}>
                        <ProductInputCustom name="height_string"/>
                    </div>
                </div> : null}

            {showDepthBlock ?
                <div className={s.block}>
                    <h3>Depth</h3>
                    <div className={s.options}>
                        <ProductInputCustom name="depth_string"/>
                    </div>
                </div> : null
            }

            {filtered_materials_array &&
            <div className={s.block}>
              <h3>Material</h3>
              <div className={s.options}>
                  {filtered_materials_array.map((m, index) => <ProductRadioInput key={index}
                                                                                 name="material"
                                                                                 value={m.name}/>)}
              </div>
            </div>
            }
            {showGlassDoorBlock && <CustomPartGlassDoorBlock glass_door={glass_door} is_custom={true}/>}
            {showGlassShelfBlock && <CustomPartGlassShelfBlock product={product}/>}

            <div className={s.block}>
                <TextInput type={"text"} label={'Note'} name="note"/>
            </div>
            <div className={s.total}>
                <span>Total: </span>
                <span>{price}$</span>
            </div>
            <CustomPartSubmit />
        </Form>
    );
};

export default CustomPartCabinet;