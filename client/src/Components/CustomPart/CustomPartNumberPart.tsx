import React, {FC} from 'react';
import s from "../Product/product.module.sass";
import {changeAmountType} from "../../helpers/cartTypes";
import {useField} from "formik";

const LEDNumberPart: FC<{ el: string,label?:string }> = ({el, label}) => {
    const [{value}, , helpers] = useField(el);
    const qty = value ?? 0;
    const changeAmount = (type: changeAmountType) => {
        const newQty = type === 'minus' ? qty - 1 : qty + 1;
        helpers.setValue(newQty)
    }
    return (
        <div className={s.part}>
            <div className={s.number}>
                <h4>{label}</h4>
                <div className={s.buttons}>
                    <button value="minus" disabled={qty <= 0} onClick={() => changeAmount('minus')}
                            type={"button"}>-
                    </button>
                    {qty}
                    <button value="plus" onClick={() => changeAmount('plus')} type={"button"}>+</button>
                </div>
            </div>
        </div>
    );
};

export default LEDNumberPart;