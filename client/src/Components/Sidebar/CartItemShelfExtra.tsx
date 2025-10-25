import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {CartItemFrontType} from "../../helpers/cartTypes";

const CartItemShelfExtra: FC<{ product: CartItemFrontType }> = ({product}) => {
    if (!product.glass?.shelf) return null;

    return (
        <div className={s.itemOption}>
            <span>Glass Color: {product.glass.shelf}</span>
        </div>
    );
};

export default CartItemShelfExtra