import React, {FC} from 'react';
import {s} from './PDFOrder'
import {DrawerInsertsType} from "../CustomPart/CustomPart";
import {Text, View} from '@react-pdf/renderer';

const CartItemDrawerInserts: FC<{ drawer_inserts: DrawerInsertsType, width: number }> = ({drawer_inserts, width}) => {
    const {box_type, color, insert_type} = drawer_inserts;
    const letter:string = insert_type ? ` (${insert_type})` : '';
    return (
        <View style={s.blocks}>
            <View style={s.itemOption}>
                <Text>Width:</Text>
                <Text>{width}"</Text>
            </View>
            <View style={s.itemOption}>
                <Text>Drawer Type:</Text>
                <Text>{`${box_type}${letter}. ${color}`}</Text>
            </View>
        </View>
    );
};

export default CartItemDrawerInserts;