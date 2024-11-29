import {Form, useFormikContext} from 'formik';
import React, {FC} from 'react';
import s from "../Product/product.module.sass";
import {ProductInputCustom, ProductRadioInput, TextInput} from "../../common/Form";
import GlassDoorBlock from "./GlassDoorBlock";
import GlassShelfBlock from "./GlassShelfBlock";
import {CustomPartFormType} from "./CustomPartCabinet";

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
    door_hinge: number,
    hinge_holes: number,
    PTO: HingeType[],
    servo: HingeType[]

}

export interface DoorAccessoiresValuesType extends DoorAccessoiresType {
    price: number,
    Note: string,
}

export const CustomPartLayout:FC<CustomPartFormType> = ({product, isDepthIsConst}) => {
    const {values} = useFormikContext<CustomPartFormValuesType>();
    const {
        price
    } = values
    const {materials_array, width, type} = product;
    const showHeightBlock = type !== 'pvc';
    const showDepthBlock = (type === 'custom' && !isDepthIsConst);
    const showGlassDoorBlock = type === 'glass-door'
    const showGlassShelfBlock = type === 'glass-shelf'

    return (
        <Form>
            {!width ?
                <div className={s.block}>
                    <h3>{type !== 'pvc' ? 'Width' : 'PVC Length(ft)'}</h3>
                    <div className={s.options}>
                        <ProductInputCustom name={'Width'}/>
                    </div>
                </div> : null}

            {showHeightBlock ?
            <div className={s.block}>
                <h3>Height</h3>
                <div className={s.options}>
                    <ProductInputCustom name={'Height'}/>
                </div>
            </div> : null}

            {showDepthBlock ?
                <div className={s.block}>
                    <h3>Depth</h3>
                    <div className={s.options}>
                        <ProductInputCustom name={'Depth'}/>
                    </div>
                </div> : null
            }

            {materials_array &&
              <div className={s.block}>
                <h3>Material</h3>
                <div className={s.options}>
                    {materials_array.map((m, index) => <ProductRadioInput key={index}
                                                                          name={'Material'}
                                                                          value={m.name}/>)}
                </div>
              </div>
            }
            {showGlassDoorBlock && <GlassDoorBlock product={product}/>}
            {showGlassShelfBlock && <GlassShelfBlock product={product}/>}

            <div className={s.block}>
                <TextInput type={"text"} label={'Note'} name="Note"/>
            </div>
            <div className={s.total}>
                <span>Total: </span>
                <span>{price}$</span>
            </div>
            <button type="submit" className={['button yellow'].join(' ')}>Add to cart</button>
        </Form>
    );
};

export default CustomPartLayout;