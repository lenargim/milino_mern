import React, {FC} from 'react';
import s from "../Product/product.module.sass";
import {changeAmountType} from "../OrderForm/Sidebar/Sidebar";
import {useField} from "formik";
import {DoorAccessoryType} from "./CustomPart";


const NumberPartArrayItem: FC<{el: DoorAccessoryType}> = ({el}) => {
    const [{value}, , {setValue}] = useField<DoorAccessoryType>(`door_accessories[${el.id}]`)
    const {qty, label} = value
    const changeAmount = (type: changeAmountType) => {
        const newQty = type === 'minus' ? qty - 1 : qty + 1;
        setValue({...value, qty: newQty})
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

export default NumberPartArrayItem;