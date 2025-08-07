import React, {FC, useEffect} from 'react';
import s from "../Product/product.module.sass";
import {ProductInputCustom, TextInput} from "../../common/Form";
import {FieldArray, FieldArrayRenderProps, Form, useFormikContext, useField} from "formik";
import {CustomPartFormType, RTAClosetCustomOptions, RTAPartCustomType} from "./CustomPart";
import {RoomMaterialsFormType} from "../../helpers/roomTypes";
import SelectField, {optionType} from "../../common/SelectField";
import {changeAmountType} from "../../helpers/cartTypes";
import {getSelectValfromVal} from "../../helpers/helpers";
import styles from "./../../common/Form.module.sass"
import {getRTAClosetCustomPartPrice} from "../../helpers/calculatePrice";


export const newItemRTACloset: RTAPartCustomType = {
    name: '',
    'Width': '',
    'Width Number': 0,
    qty: 1
}

const CustomPartRTACloset: FC<{ materials: RoomMaterialsFormType }> = ({materials}) => {
    const dropdownOptions: optionType[] = RTAClosetCustomOptions.map(el => ({value: el, label: el}));
    const {values, setFieldValue, isSubmitting} = useFormikContext<CustomPartFormType>();
    const {price, rta_closet_custom} = values;
    useEffect(() => {
        if (!rta_closet_custom.length) setFieldValue('rta_closet_custom', [newItemRTACloset]);
    }, [rta_closet_custom])
    useEffect(() => {
        const newPrice = getRTAClosetCustomPartPrice(rta_closet_custom, materials);
        if (price !== newPrice) setFieldValue('price', newPrice);
    }, [values])
    return (
        <Form className={s.accessories}>
            <div className={s.block}>
                <h3>Additional part</h3>
                <FieldArray name="rta_closet_custom" render={(arrayHelpers) => (
                    <div>
                        {rta_closet_custom.map((part, index) => (
                            <CustomPartRTAClosetItem key={index}
                                                     part={part}
                                                     index={index}
                                                     arrayHelpers={arrayHelpers}
                                                     dropdownOptions={dropdownOptions}
                            />
                        ))}
                        <button type="button" onClick={() => arrayHelpers.push(newItemRTACloset)}
                                className={['button yellow small'].join(' ')}>
                            + Add Part
                        </button>
                    </div>
                )}
                />
                {/*{meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}*/}
            </div>
            <div className={s.block}>
                <TextInput type={"text"} label={'Note'} name="Note"/>
            </div>
            <div className={s.total}>
                <span>Total: </span>
                <span>{price}$</span>
            </div>
            <button type="submit" className={['button yellow'].join(' ')} disabled={isSubmitting}>Add to cart</button>
        </Form>
    );
};

export default CustomPartRTACloset;


const CustomPartRTAClosetItem: FC<{ arrayHelpers: FieldArrayRenderProps, part: RTAPartCustomType, index: number, dropdownOptions: optionType[] }> = ({
                                                                                                                                                         arrayHelpers,
                                                                                                                                                         part,
                                                                                                                                                         index,
                                                                                                                                                         dropdownOptions
                                                                                                                                                     }) => {
    const {name, qty} = part
    const val = getSelectValfromVal(name, dropdownOptions);
    const {remove, replace} = arrayHelpers;
    const changeAmount = (type: changeAmountType) => {
        replace(index, {...part, qty: type === 'minus' ? qty - 1 : qty + 1})
    }
    return (
        <div className={s.row}>
            <button onClick={() => remove(index)} className={s.close} type={"button"}>×</button>
            <SelectField name={`rta_closet_custom[${index}].name`}
                         label="Additional part"
                         val={val}
                         options={dropdownOptions}
            />
            <div className={s.options}>
                <ProductInputCustom name={`rta_closet_custom[${index}].Width`} label={'Width'}/>
            </div>

            <div className={s.row}>×
                <div className={s.buttons}>
                    <button value="minus" disabled={qty <= 1} onClick={() => changeAmount('minus')}
                            type={"button"}>-
                    </button>
                    {qty}
                    <button value="plus" onClick={() => changeAmount('plus')} type={"button"}>+</button>
                </div>
            </div>
        </div>
    )
}