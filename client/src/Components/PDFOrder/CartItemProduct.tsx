import React, {FC} from "react";
import {Text, View} from "@react-pdf/renderer";
import {getFraction} from "../../helpers/helpers";
import {s} from "./PDFOrder";
import Dimensions from "./Dimentions";
import {CartItemFrontType} from "../../helpers/cartTypes";

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
    const {door:glass_door, shelf:glass_shelf} = glass;

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
            {options.length ?
                <View>
                    <Text style={s.itemOption}>Options:</Text>
                    {options.includes('Glass Door') ?
                        <View style={!isStandard.options ? s.itemOptionCustom:s.itemOption}>
                            <Text>Glass Door: {glass_door.filter(el => !!el).join(', ')}</Text>
                        </View> : null
                    }

                    {options.includes('Glass Shelf') ?
                        <View style={!isStandard.options ? s.itemOptionCustom:s.itemOption}>
                            <Text>Glass Shelf: {glass_shelf}</Text>
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