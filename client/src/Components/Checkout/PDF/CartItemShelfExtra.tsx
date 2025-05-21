import React, {FC} from "react";
import {Text, View} from '@react-pdf/renderer';
import {CartItemFrontType} from "../../../api/apiFunctions";
import {s} from '../PDF'
import Dimensions from "./Dimentions";

const CartItemShelfExtra: FC<{ product: CartItemFrontType,dimensions: string }> = ({product, dimensions}) => {
    const {glass: {shelf: glass_shelf}} = product
    if (!glass_shelf) return null;
    return (
        <>
            <Dimensions dimensions={dimensions}/>
            <View style={s.itemOption}>
                <Text>Glass Color: {glass_shelf}</Text>
            </View>
        </>
    );
};

export default CartItemShelfExtra