import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {CartCustomShelvesAPI} from "../../helpers/cartTypes";
import {getCustomPartShelvesNameByIndex} from "../../helpers/helpers";

const CartItemShelves: FC<{ shelves: CartCustomShelvesAPI }> = ({shelves}) => {
    const {qty, index, color} = shelves
    return (
        <>
            <div className={s.itemOption}>
                <span>Shelf Type:</span>
                <span>{getCustomPartShelvesNameByIndex(index)}</span>
                {color && <span>({color})</span>}
            </div>
            <div className={s.itemOption}>
                <span>Quantity:</span>
                <span>{qty}</span>
            </div>
        </>
    )
}

export default CartItemShelves;