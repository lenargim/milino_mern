import React, {FC} from "react";
import CartItemCustom from "./CartItemCustom";
import {View} from "@react-pdf/renderer";
import CartItemProduct from "./CartItemProduct";
import {CartItemFrontType} from "../../helpers/cartTypes";
import Dimensions from "./Dimensions";

const CartItemOptions: FC<{ item: CartItemFrontType }> = ({item}) => {
    const {product_type} = item;
    return (
        <View>
            <Dimensions item={item}/>
            {product_type === 'custom'
                ? <CartItemCustom product={item}/>
                : <CartItemProduct product={item}/>}
        </View>
    )
}

export default CartItemOptions