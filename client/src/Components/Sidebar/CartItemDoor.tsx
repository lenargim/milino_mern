import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {StandardDoorAPIType} from "../../helpers/cartTypes";

const CartItemStandardDoor: FC<{ standard_doors: StandardDoorAPIType[] }> = ({standard_doors}) => {
    return (
        <>
            {standard_doors.map((el, index) => {
                return (
                    <span className={s.itemOption} key={index}>
                        <span>Size: {el.width}x{el.height}. Amount: {el.qty}</span>
                    </span>
                )
            })}
        </>
    );
};

export default CartItemStandardDoor