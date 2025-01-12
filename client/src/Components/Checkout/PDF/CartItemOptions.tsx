import React, {FC} from "react";
import CartItemCustom from "./CartItemCustom";
import {View} from "@react-pdf/renderer";
import {CartItemType} from "../../../api/apiFunctions";
import CartItemProduct from "./CartItemProduct";

const CartItemOptions: FC<{ item: CartItemType }> = ({item}) => {
    const {product_type} = item;

    switch (product_type) {
        case "cabinet":
        case "standard":
            return <View><CartItemProduct product={item}/></View>
        default:
            return <View><CartItemCustom product={item}/></View>
    }
}

export default CartItemOptions