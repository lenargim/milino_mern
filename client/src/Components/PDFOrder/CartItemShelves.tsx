import React, {FC} from 'react';
import {s} from './PDFOrder'
import {CartCustomShelvesAPI} from "../../helpers/cartTypes";
import {getCustomPartShelvesNameByIndex} from "../../helpers/helpers";
import {Text, View} from "@react-pdf/renderer";

const CartItemShelves: FC<{ shelves: CartCustomShelvesAPI }> = ({shelves}) => {
    const {qty, index, color} = shelves
    return (
        <View>
            <View style={s.itemOption}>
                <Text>Shelf Type:</Text>
                <Text>{getCustomPartShelvesNameByIndex(index)}</Text>
                {color && <Text>({color})</Text>}
            </View>
            <View style={s.itemOption}>
                <Text>Quantity:</Text>
                <Text>{qty}</Text>
            </View>
        </View>
    )
}

export default CartItemShelves;