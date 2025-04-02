import React, {FC} from "react";
import {Text} from '@react-pdf/renderer';
import {CartItemType} from "../../../api/apiFunctions";
import {s} from '../PDF'
import {getFraction} from "../../../helpers/helpers";

const CartItemPvcExtra: FC<{ product: CartItemType }> = ({product}) => {
    const {material, width} = product;

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