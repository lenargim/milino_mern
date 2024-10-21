import React, {FC} from "react";
import {Text, View} from '@react-pdf/renderer';
import {CartItemType} from "../../../api/apiFunctions";
import {s} from '../PDF'

const CartItemPvcExtra: FC<{ product: CartItemType }> = ({product}) => {
    const {material, width} = product;

    return (
        <>
            {width && <View style={s.itemOption}>
              <Text>Width: {width} ft.</Text>
            </View>}
            {material &&
              <View style={s.itemOption}>
                <Text>Material: {material}</Text>
              </View>}
        </>

    )
};

export default CartItemPvcExtra;