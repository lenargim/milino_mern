import React, {FC} from "react";
import {FieldArrayRenderProps} from "formik";
import {changeAmountType} from "../../helpers/cartTypes";
import s from "../Product/product.module.sass";
import {ProductInputCustom} from "../../common/Form";

export type AlProfileType = {
    length: number,
    qty: number
}

export type alProfileFormType = {
    length_string: string,
    length: number,
    qty: number
}

const CustomPartAlumProfile: FC<{ profile: alProfileFormType, index: number, arrayHelpers: FieldArrayRenderProps }> = ({
                                                                                                                           profile,
                                                                                                                           index,
                                                                                                                           arrayHelpers
                                                                                                                       }) => {
    const {remove, replace} = arrayHelpers;
    const {qty} = profile

    const changeAmount = (type: changeAmountType) => {
        const newQty = type === 'minus' ? qty - 1 : qty + 1;
        replace(index, {...profile, qty: newQty})
    }
    return (
        <div className={s.row}>
            <button className={s.close} onClick={() => remove(index)}>×</button>
            <ProductInputCustom label="Length" name={`[led_accessories.led_alum_profiles].${index}.length_string`}/>
            <div className={s.row}>×
                <div className={s.buttons}>
                    <button value="minus" disabled={qty <= 1} onClick={() => changeAmount('minus')} type={"button"}>-
                    </button>
                    {qty}
                    <button value="plus" onClick={() => changeAmount('plus')} type={"button"}>+</button>
                </div>
            </div>
        </div>
    )
}

export default CustomPartAlumProfile