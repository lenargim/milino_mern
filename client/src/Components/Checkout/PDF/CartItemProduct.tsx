import React, {FC} from "react";
import Dimentions from "./Dimentions";
import {Text, View} from "@react-pdf/renderer";
import {getFraction} from "../../../helpers/helpers";
import {s} from "../PDF";
import {CartItemType} from "../../../api/apiFunctions";

const CartItemProduct: FC<{ product: CartItemType,dimentions: string }> = ({product, dimentions}) => {
    const {
        middle_section,
        blind_width,
        hinge,
        options,
        corner,
        door_option,
        shelf_option,
        led_border,
        led_alignment,
        led_indent,
        isStandard
    } = product;

    return (
        <View>
            <Dimentions dimentions={dimentions} isStandard={isStandard.dimensions}/>
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
            {led_border.length ?
                <View style={!isStandard.led ? s.itemOptionCustom:s.itemOption}>
                    <Text>LED: {`${led_border.map(el => el)}. ${led_alignment} ${led_indent ? led_indent + '"' : ''}`}</Text>
                </View> : null
            }
            {corner ?
                <View style={s.itemOption}>
                    <Text>Corner: {corner}</Text>
                </View> : null
            }
            {options.length ?
                <View>
                    <View style={s.itemOption}>Options:</View>
                    {options.includes('Glass Door') ?
                        <View style={!isStandard.options ? s.itemOptionCustom:s.itemOption}>
                            <Text>Glass Door: {door_option.filter(el => !!el).join(', ')}</Text>
                        </View> : null
                    }

                    {options.includes('Glass Shelf') ?
                        <View style={!isStandard.options ? s.itemOptionCustom:s.itemOption}>
                            <Text>Glass Shelf: {shelf_option}</Text>
                        </View> : null
                    }

                    {options.filter(option => option !== 'Glass Door' && option !== 'Glass Shelf').map((el, index) =>
                        <View style={!isStandard.options ? s.itemOptionCustom:s.itemOption} key={index}>
                            <Text>{el}</Text>
                        </View>)}
                </View> : null
            }
        </View>
    )
}

export default CartItemProduct