import React, {FC} from "react";
import CartItemCustom from "./CartItemCustom";
import {View} from "@react-pdf/renderer";
import {CartItemType} from "../../../api/apiFunctions";
import CartItemProduct from "./CartItemProduct";
import {getDimentionsRow} from "../../../helpers/helpers";

const CartItemOptions: FC<{ item: CartItemType }> = ({item}) => {
    const {product_type, width, height, depth} = item;
    const dimentions = getDimentionsRow(width, height, depth);
    switch (product_type) {
        case "cabinet":
        case "standard":
            return <View><CartItemProduct product={item} dimentions={dimentions}/></View>
        default:
            return <View><CartItemCustom product={item} dimentions={dimentions}/></View>
    }
}

export default CartItemOptions