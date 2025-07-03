import React, {FC, useEffect} from 'react';
import s from "../Product/product.module.sass";
import {ProductInputCustom, TextInput} from "../../common/Form";
import {FieldArray, FieldArrayRenderProps, Form, useFormikContext, useField} from "formik";
import {CustomPartFormType, SimpleClosetCustomOptions, SimplePartCustomType} from "./CustomPart";
import {RoomMaterialsFormType} from "../../helpers/roomTypes";
import SelectField, {optionType} from "../../common/SelectField";
import {changeAmountType} from "../../helpers/cartTypes";
import {getSelectValfromVal} from "../../helpers/helpers";
import styles from "./../../common/Form.module.sass"
import {getSimpleClosetCustomPartPrice} from "../../helpers/calculatePrice";


export const newItemSimpleCloset: SimplePartCustomType = {
    name: '',
    'Width': '',
    'Width Number': 0,
    qty: 1
}

const CustomPartSimpleCloset: FC<{ materials: RoomMaterialsFormType }> = ({
                                                                              materials
                                                                          }) => {
    const dropdownOptions: optionType[] = SimpleClosetCustomOptions.map(el => ({value: el, label: el}));
    const {values, setFieldValue, isSubmitting} = useFormikContext<CustomPartFormType>();
    const {price, simple_closet_custom} = values;
    const [field, meta, helpers] = useField('simple_closet_custom');
    useEffect(() => {
        if (!field.value.length) helpers.setValue([newItemSimpleCloset]);
    }, [])
    useEffect(() => {
        const newPrice = getSimpleClosetCustomPartPrice(simple_closet_custom, materials);
        if (price !== newPrice) setFieldValue('price', newPrice);
    }, [values])
    return (
        <Form className={s.accessories}>
            <div className={s.block}>
                <h3>Additional part</h3>
                <FieldArray name="simple_closet_custom" render={(arrayHelpers) => (
                    <div>
                        {simple_closet_custom.map((part, index) => (
                            <CustomPartSimpleClosetItem key={index}
                                                        part={part}
                                                        index={index}
                                                        arrayHelpers={arrayHelpers}
                                                        dropdownOptions={dropdownOptions}
                            />
                        ))}
                        <button type="button" onClick={() => arrayHelpers.push(newItemSimpleCloset)}
                                className={['button yellow small'].join(' ')}>
                            + Add Part
                        </button>
                    </div>
                )}
                />
                {meta.touched && meta.error && typeof meta.error === 'string' &&
                <div className={styles.error}>{meta.error}</div>}
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

export default CustomPartSimpleCloset;


const CustomPartSimpleClosetItem: FC<{ arrayHelpers: FieldArrayRenderProps, part: SimplePartCustomType, index: number, dropdownOptions: optionType[] }> = ({
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
            <SelectField name={`simple_closet_custom[${index}].name`}
                         label="Additional part"
                         val={val}
                         options={dropdownOptions}
            />
            <div className={s.options}>
                <ProductInputCustom name={`simple_closet_custom[${index}].Width`} label={'Width'}/>
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