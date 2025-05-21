import React, {FC} from 'react';
import s from "../OrderForm/Sidebar/sidebar.module.sass";
import {CartItemFrontType} from "../../api/apiFunctions";
import Dimentions from "../../common/Dimentions";

const CartItemShelfExtra: FC<{ product: CartItemFrontType, dimensions: string }> = ({product, dimensions}) => {
    const {glass: {shelf: glass_shelf}} = product
    return (
        <>
            <Dimentions dimensions={dimensions}/>
            <div className={s.itemOption}>
                <span>Glass Color: {glass_shelf}</span>
            </div>
        </>
    );
};

export default CartItemShelfExtra