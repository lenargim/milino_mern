import React, {FC} from "react";
import {productExtraType} from "../../../store/reducers/generalSlice";
import Dimentions from "./Dimentions";
import {Text, View} from "@react-pdf/renderer";
import {getFraction} from "../../../helpers/helpers";
import {s} from "../PDF";
import {CartItemType} from "../../../api/apiFunctions";

const CartItemProduct: FC<{ product: CartItemType }> = ({product}) => {
    const {
        width,
        depth,
        height,
        middle_section,
        blind_width,
        hinge,
        leather,
        options,
        corner,
        door_option,
        shelf_option,
        led_border,
        led_alignment,
        led_indent
    } = product;

    return (
        <View>
            <Dimentions width={width} depth={depth} height={height}/>

            {blind_width ?
                <View style={s.itemOption}>
                    <Text>Blind Width: {getFraction(blind_width)}</Text>
                </View>
                : null}

            {middle_section ?
                <View style={s.itemOption}>
                    <Text>Middle Section Height: {getFraction(middle_section)}</Text>
                </View> : null
            }
            {hinge ?
                <View style={s.itemOption}>
                    <Text>Hinge opening: {hinge}</Text>
                </View> : null}
            {led_border.length ?
                <View style={s.itemOption}>
                    <Text>LED: {`${led_border.map(el => el)}. ${led_alignment} ${led_indent ? led_indent + '"' : ''}`}</Text>
                </View> : null
            }
            {corner ?
                <View style={s.itemOption}>
                    <Text>Corner: {corner}</Text>
                </View> : null
            }
            {leather ?
                <View style={s.itemOption}>
                    <Text>Leather: {leather}</Text>
                </View> : null
            }
            {options.length ?
                <View>
                    <View style={s.itemOption}>Options:</View>
                    {options.includes('Glass Door') ?
                        <View style={s.itemOption}>
                            <Text>Glass Door: {door_option.join('|')}</Text>
                        </View> : null
                    }

                    {options.includes('Glass Shelf') ?
                        <View style={s.itemOption}>
                            <Text>Glass Shelf: {shelf_option.join('|')}</Text>
                        </View> : null
                    }

                    {options.filter(option => option !== 'Glass Door' && option !== 'Glass Shelf').map((el, index) =>
                        <View style={s.itemOption} key={index}>
                            <Text>{el}</Text>
                        </View>)}
                </View> : null
            }
        </View>
    )
}

export default CartItemProduct