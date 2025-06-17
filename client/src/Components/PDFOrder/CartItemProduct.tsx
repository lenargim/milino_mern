import React, {FC} from "react";
import {Text, View} from "@react-pdf/renderer";
import {getFraction} from "../../helpers/helpers";
import {s} from "./PDFOrder";
import Dimensions from "./Dimentions";
import {CartItemFrontType} from "../../helpers/cartTypes";
import CartItemChosenOptions from "./CartItemChosenOptions";

const CartItemProduct: FC<{ product: CartItemFrontType,dimensions: string }> = ({product, dimensions}) => {
    const {
        blind_width,
        middle_section,
        hinge,
        led,
        isStandard,
        corner,
        options,
        glass
    } = product;
    const {indent, alignment, border} = led;

    return (
        <View>
            <Dimensions dimensions={dimensions} isStandard={isStandard.dimensions}/>
            {blind_width ?
                <View style={!isStandard.blind ? s.itemOptionCustom:s.itemOption}>
                    <Text>Blind Width: {getFraction(blind_width)}"</Text>
                </View>
                : null}

            {middle_section ?
                <View style={!isStandard.middle ? s.itemOptionCustom:s.itemOption}>
                    <Text>Cutout Height: {getFraction(middle_section)}"</Text>
                </View> : null
            }
            {hinge ?
                <View style={s.itemOption}>
                    <Text>Hinge opening: {hinge}</Text>
                </View> : null}
            {border.length ?
                <View style={!isStandard.led ? s.itemOptionCustom:s.itemOption}>
                    <Text>LED: {`${border.map(el => el)}. ${alignment} ${indent ? indent + '"' : ''}`}</Text>
                </View> : null
            }
            {corner ?
                <View style={s.itemOption}>
                    <Text>Corner: {corner}</Text>
                </View> : null
            }
            <CartItemChosenOptions options={options} glass={glass} isStandard={isStandard} />
        </View>
    )
}

export default CartItemProduct