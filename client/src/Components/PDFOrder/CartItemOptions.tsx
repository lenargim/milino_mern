import React, {FC} from "react";
import CartItemCustom from "./CartItemCustom";
import {View} from "@react-pdf/renderer";
import CartItemProduct from "./CartItemProduct";
import {getdimensionsRow} from "../../helpers/helpers";
import {CartItemFrontType} from "../../helpers/cartTypes";

const CartItemOptions: FC<{ item: CartItemFrontType }> = ({item}) => {
    const {product_type, width, height, depth} = item;
    const dimensions = getdimensionsRow(width, height, depth);
    switch (product_type) {
        case "cabinet":
        case "standard":
            return <View><CartItemProduct product={item} dimensions={dimensions}/></View>
        default:
            return <View><CartItemCustom product={item} dimensions={dimensions}/></View>
    }
}

export default CartItemOptions