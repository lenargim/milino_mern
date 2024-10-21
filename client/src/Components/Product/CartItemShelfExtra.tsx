import React, {FC} from 'react';
import s from "../OrderForm/Sidebar/sidebar.module.sass";
import {CartItemType} from "../../api/apiFunctions";
import {Dimentions} from "./CartItem";

const CartItemShelfExtra: FC<{ product: CartItemType }> = ({product}) => {
    const {glass_shelf, width, height, depth} = product
    if (!glass_shelf) return null;
    return (
        <>
            <Dimentions width={width} height={height} depth={depth}/>
            <span className={s.itemOption}>
            <span>Glass Color: {glass_shelf}</span>
        </span>
        </>
    );
};

export default CartItemShelfExtra