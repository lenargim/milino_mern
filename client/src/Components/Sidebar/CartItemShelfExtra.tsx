import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import Dimentions from "../../common/Dimentions";
import {CartItemFrontType} from "../../helpers/cartTypes";

const CartItemShelfExtra: FC<{ product: CartItemFrontType, dimensions: string }> = ({product, dimensions}) => {
    if (!product.glass?.shelf) return null;

    return (
        <>
            <Dimentions dimensions={dimensions}/>
            <div className={s.itemOption}>
                <span>Glass Color: {product.glass.shelf}</span>
            </div>
        </>
    );
};

export default CartItemShelfExtra