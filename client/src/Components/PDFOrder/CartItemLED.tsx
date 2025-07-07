import React, {FC} from "react";
import {Text, View} from "@react-pdf/renderer";
import {s} from "./PDFOrder";
import {CartLEDAPI} from "../../helpers/cartTypes";

const CartItemLED: FC<{
    led: CartLEDAPI
}> = ({led}) => {
    const {indent, alignment, border} = led;
    return (
        <View>
            {border.length ?
                <View style={s.itemOptionCustom}>
                    <Text>LED: {`${border.map(el => el)}. ${alignment} ${indent ? indent + '"' : ''}`}</Text>
                </View> : null
            }
        </View>
    )
}

export default CartItemLED