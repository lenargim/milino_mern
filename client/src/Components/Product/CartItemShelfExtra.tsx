import React, {FC} from 'react';
import s from "../OrderForm/Sidebar/sidebar.module.sass";
import {CartItemType} from "../../api/apiFunctions";
import Dimentions from "../../common/Dimentions";

const CartItemShelfExtra: FC<{ product: CartItemType, dimentions: string }> = ({product, dimentions}) => {
    const {glass_shelf} = product
    if (!glass_shelf) return null;
    return (
        <>
            <Dimentions dimentions={dimentions}/>
            <div className={s.itemOption}>
                <span>Glass Color: {glass_shelf}</span>
            </div>
        </>
    );
};

export default CartItemShelfExtra