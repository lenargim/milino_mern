import React, {FC} from "react";
import {Text, View} from '@react-pdf/renderer';
import {s} from './PDFOrder'
import {CartItemFrontType} from "../../helpers/cartTypes";
import Dimensions from "./Dimensions";

const CartItemGlassDoorExtra: FC<{ product: CartItemFrontType }> = ({product}) => {
    const {glass, custom} = product;
    const door = glass?.door
    return (
        <>
            {custom?.material &&
                <Text style={s.itemOption}>
                    <Text>Material:</Text><Text>{custom.material}</Text>
                </Text>
            }
            {
                door &&
                <View>
                    {door[0] && <Text style={s.itemOption}>Door Profile: {door[0]}</Text>}
                    {door[1] && <Text style={s.itemOption}>Door Type: {door[1]}</Text>}
                    {door[2] && <Text style={s.itemOption}>Door Color: {door[2]}</Text>}
                </View>
            }
        </>
    )
}

export default CartItemGlassDoorExtra;