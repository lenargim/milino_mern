import React, {FC} from "react";
import {Text} from '@react-pdf/renderer';
import {s} from './PDFOrder'
import {getFraction} from "../../helpers/helpers";
import {CartItemFrontType} from "../../helpers/cartTypes";

const CartItemPvcExtra: FC<{ product: CartItemFrontType }> = ({product}) => {
    const {custom, width} = product;
    if (!custom) return null;
    const {material} = custom
    return (
        <>
            {<Text style={s.itemOption}>
                <Text>Length:</Text>
                <Text>{getFraction(width)} Ft</Text>
            </Text>}
            {material &&
            <Text style={s.itemOption}>
              <Text>Material:</Text>
              <Text>{material}</Text>
            </Text>}
        </>

    )
};

export default CartItemPvcExtra;