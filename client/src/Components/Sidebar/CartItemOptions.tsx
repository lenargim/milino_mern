import React, {FC} from 'react';
import {CartItemFrontType} from "../../api/apiFunctions";
import CartItemProduct from "./CartItemProduct";
import CartItemCustom from "./CartItemCustom";
import {getdimensionsRow} from "../../helpers/helpers";

const CartItemOptions:FC<{item: CartItemFrontType}> = ({item}) => {
    const {
        product_type,
        width, height, depth
    } = item;
    const dimensions = getdimensionsRow(width, height, depth);
    switch (product_type) {
        case "cabinet":
        case "standard":
            return <CartItemProduct product={item} dimensions={dimensions}/>
        default:
            return <CartItemCustom product={item} dimensions={dimensions}/>
    }
};

export default CartItemOptions;