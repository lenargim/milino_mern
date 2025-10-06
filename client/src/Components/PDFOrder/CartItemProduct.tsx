import React, {FC} from "react";
import {Text, View} from "@react-pdf/renderer";
import {getFraction} from "../../helpers/helpers";
import {s} from "./PDFOrder";
import Dimensions from "./Dimentions";
import {CartItemFrontType} from "../../helpers/cartTypes";
import CartItemLED from "./CartItemLED";
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
        glass,
        custom
    } = product;

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
            {led && <CartItemLED led={led} />}
            {corner ?
                <View style={s.itemOption}>
                    <Text>Corner: {corner}</Text>
                </View> : null
            }
            <CartItemChosenOptions options={options} glass={glass} isStandard={isStandard} />
            {
                custom?.accessories?.closet ? <View style={s.itemOption}>
                    <Text>Closet Accessories:</Text>
                    <Text>{custom.accessories.closet}</Text>
                </View> : null
            }
            {
                custom?.jewelery_inserts?.length ? <View style={s.itemOption}>
                    <Text>Jewelery Inserts:</Text>
                    <Text>{custom.jewelery_inserts.join(', ')}</Text>
                </View> : null
            }
        </View>
    )
}

export default CartItemProduct