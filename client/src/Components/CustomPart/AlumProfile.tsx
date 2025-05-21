import React, {FC} from "react";
import {useField} from "formik";
import {changeAmountType} from "../OrderForm/Sidebar/Sidebar"
import s from "../Product/product.module.sass";
import {ProductInputCustom} from "../../common/Form";

export type AlProfileType = {
    _id: string,
    length: number,
    qty: number
}

export type alProfileFormType = {
    _id: string,
    length: string,
    ['length Number']: number,
    qty: number
}

const AlumProfile: FC<{ profile: alProfileFormType, index: number }> = ({profile, index}) => {
    const [{value}, , {setValue}] = useField<AlProfileType[]>('led_accessories.led_alum_profiles')
    const {qty, _id} = profile;

    const deleteAlItem = (_id: string) => {
        const newArr = value.filter(profile => profile._id !== _id)
        setValue(newArr)
    };

    const changeAmount = (type: changeAmountType) => {
        const profile = value[index];
        profile.qty = type === 'minus' ? profile.qty - 1 : profile.qty + 1;
        value.splice(index, 1, profile)
        setValue(value)
    }
    return (
        <div className={s.row}>
            <button onClick={() => deleteAlItem(_id)} className={s.close} type={"button"}>×</button>
            <ProductInputCustom label="Length" name={`[led_accessories.led_alum_profiles].${index}.length`}/>
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

export default AlumProfile