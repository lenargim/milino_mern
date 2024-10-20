import React, {FC} from 'react';
import s from "../OrderForm/Sidebar/sidebar.module.sass";
import {DoorType} from "../CustomPart/StandardDoorForm";
import {MaybeUndefined} from "../../helpers/productTypes";


const CartItemStandardDoor: FC<{ standard_door: MaybeUndefined<DoorType> }> = ({standard_door}) => {
    if (!standard_door) return null;
    const {color, doors: doorArr} = standard_door
    return (
        <>
           <span className={s.itemOption}>
            <span>Door Color: {color}</span>
        </span>
            {doorArr.map((el, index) => {
                return (
                    <span className={s.itemOption} key={index}>
                        <span>Size: {el.name}. Amount: {el.qty}</span>
                    </span>
                )
            })}
        </>
    );
};

export default CartItemStandardDoor