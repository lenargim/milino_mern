import React, {FC} from "react";
import {Text, View} from '@react-pdf/renderer';
import {CartItemType} from "../../../api/apiFunctions";
import {s} from '../PDF'
import Dimentions from "./Dimentions";

const CartItemShelfExtra: FC<{ product: CartItemType }> = ({product}) => {
    const {glass_shelf, width, height, depth} = product
    if (!glass_shelf) return null;
    return (
        <>
            <Dimentions width={width} height={height} depth={depth}/>
            <View style={s.itemOption}>
                <Text>Glass Color: {glass_shelf}</Text>
            </View>
        </>
    );
};

export default CartItemShelfExtra