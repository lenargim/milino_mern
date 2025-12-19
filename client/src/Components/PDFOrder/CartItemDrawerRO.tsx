import React, {FC} from 'react';
import {s} from './PDFOrder'
import {DrawerROType} from "../CustomPart/CustomPart";
import {Text, View} from '@react-pdf/renderer';

const CartItemDrawerRO: FC<{ drawer_ro: DrawerROType, width: number }> = ({drawer_ro, width}) => {
    return (
        <View style={s.blocks}>
            <View style={s.itemOption}>
                <Text>Width:</Text>
                <Text>{width}"</Text>
            </View>
            <View style={s.itemOption}>
                <Text>Type:</Text>
                <Text>{drawer_ro}</Text>
            </View>
        </View>
    );
};

export default CartItemDrawerRO;