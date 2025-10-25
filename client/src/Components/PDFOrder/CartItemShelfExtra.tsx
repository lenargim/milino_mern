import React, {FC} from "react";
import {Text, View} from '@react-pdf/renderer';
import {s} from './PDFOrder'
import Dimensions from "./Dimensions";
import {CartItemFrontType} from "../../helpers/cartTypes";

const CartItemShelfExtra: FC<{ product: CartItemFrontType}> = ({product}) => {
    if (!product.glass?.shelf) return null;

    return (
        <>
            <View style={s.itemOption}>
                <Text>Glass Color: {product.glass.shelf}</Text>
            </View>
        </>
    );
};

export default CartItemShelfExtra