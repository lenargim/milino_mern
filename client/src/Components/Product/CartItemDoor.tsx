import React, {FC} from 'react';
import s from "../OrderForm/Sidebar/sidebar.module.sass";
import {DoorType} from "../CustomPart/StandardDoorForm";
import {MaybeUndefined} from "../../helpers/productTypes";


const CartItemStandardDoor: FC<{ standard_door: MaybeUndefined<DoorType> }> = ({standard_door}) => {
    if (!standard_door) return null;
    const {color, doors: doorArr} = standard_door
    return (
        <>
            {doorArr.map((el, index) => {
                return (
                    <span className={s.itemOption} key={index}>
                        <span>Size: {el.width}x{el.height}. Amount: {el.qty}</span>
                    </span>
                )
            })}
            <div className={s.itemOption}>
                <span>Door Color: {color}</span>
            </div>
        </>
    );
};

export default CartItemStandardDoor