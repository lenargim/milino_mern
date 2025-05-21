import React, {FC} from 'react';
import s from "../OrderForm/Sidebar/sidebar.module.sass";
import {DoorType} from "../CustomPart/StandardDoorForm";
import {MaybeUndefined} from "../../helpers/productTypes";
import {StandardDoorAPIType} from "../../api/apiFunctions";


const CartItemStandardDoor: FC<{ standard_door: StandardDoorAPIType }> = ({standard_door}) => {
    const {color, doors} = standard_door;
    return (
        <>
            {doors.map((el, index) => {
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