import React, {FC} from "react";
import {Text, View} from '@react-pdf/renderer';
import {s} from './PDFOrder'
import Dimensions from "./Dimensions";
import {CartItemFrontType, GlassAPIType} from "../../helpers/cartTypes";
import {MaybeUndefined} from "../../helpers/productTypes";

const CartItemShelfExtra: FC<{ glass: MaybeUndefined<GlassAPIType>}> = ({glass}) => {
    if (!glass?.shelf) return null;

    return (
        <>
            <View style={s.itemOption}>
                <Text>Glass Color: {glass.shelf}</Text>
            </View>
        </>
    );
};

export default CartItemShelfExtra