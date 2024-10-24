import React, {FC} from 'react';
import {CartItemType} from "../../api/apiFunctions";
import CartItemProduct from "./CartItemProduct";
import CartItemCustom from "./CartItemCustom";
import {getDimentionsRow} from "../../helpers/helpers";

const CartItemOptions:FC<{item: CartItemType}> = ({item}) => {
    const {
        product_type,
        width, height, depth
    } = item;
    const dimentions = getDimentionsRow(width, height, depth);
    switch (product_type) {
        case "cabinet":
        case "standard":
            return <CartItemProduct product={item} dimentions={dimentions}/>
        default:
            return <CartItemCustom product={item} dimentions={dimentions}/>
    }
};

export default CartItemOptions;