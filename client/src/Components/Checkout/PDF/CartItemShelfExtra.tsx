import React, {FC} from "react";
import {Text, View} from '@react-pdf/renderer';
import {CartItemType} from "../../../api/apiFunctions";
import {s} from '../PDF'
import Dimentions from "./Dimentions";

const CartItemShelfExtra: FC<{ product: CartItemType,dimentions: string }> = ({product, dimentions}) => {
    const {glass_shelf} = product
    if (!glass_shelf) return null;
    return (
        <>
            <Dimentions dimentions={dimentions}/>
            <View style={s.itemOption}>
                <Text>Glass Color: {glass_shelf}</Text>
            </View>
        </>
    );
};

export default CartItemShelfExtra