import React, {FC} from 'react';
import {s} from "./PDFOrder";
import {MaybeUndefined} from "../../helpers/productTypes";
import {GlassAPIType, IsStandardOptionsType} from "../../helpers/cartTypes";
import {Text, View} from "@react-pdf/renderer";

const CartItemChosenOptions:FC<{ options: string[], glass: MaybeUndefined<GlassAPIType>,isStandard:IsStandardOptionsType }> = ({options, glass, isStandard}) => {
    if (!options.length) return null;
    const showGlassDoorBlock = options.includes('Glass Door') && glass && glass.door;
    const showGlassShelfBlock = options.includes('Glass Shelf') && glass && glass.shelf;
    return (
        <View>
            <Text>Options:</Text>
            {showGlassDoorBlock ?
                <View style={isStandard.options ? s.itemOption: s.itemOptionCustom}>
                    <Text>Glass Door:</Text>
                    <Text>{glass?.door?.filter(el => !!el).join(', ')}</Text>
                </View> : null
            }

            {showGlassShelfBlock ?
                <View style={isStandard.options ? s.itemOption: s.itemOptionCustom}>
                    <Text>Glass Shelf:</Text>
                    <Text>{glass?.shelf}</Text>
                </View> : null
            }

            {options.filter(option => option !== 'Glass Door' && option !== 'Glass Shelf').map((el, index) =>
                <View style={isStandard.options ? s.itemOption: s.itemOptionCustom} key={index}>
                    <Text>{el}:</Text>
                    <Text>True</Text>
                </View>)}
        </View>
    );
};

export default CartItemChosenOptions;