import React, {FC} from 'react';
import {CartItemType} from "../../api/apiFunctions";
import CartItemProduct from "./CartItemProduct";
import CartItemCustom from "./CartItemCustom";

const CartItemOptions:FC<{item: CartItemType}> = ({item}) => {
    const {
        product_type
    } = item;
    switch (product_type) {
        case "cabinet":
        case "standard":
            return <CartItemProduct product={item}/>
        default:
            return <CartItemCustom product={item}/>
    }
};

export default CartItemOptions;