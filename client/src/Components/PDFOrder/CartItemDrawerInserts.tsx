import React, {FC} from 'react';
import {s} from './PDFOrder'
import {DrawerAccessoriesType, DrawerInserts} from "../CustomPart/CustomPart";
import {Text, View} from '@react-pdf/renderer';

const CartItemDrawerInserts: FC<{ inserts: DrawerInserts, width: number }> = ({inserts, width}) => {
    const {box_type, color, insert_type} = inserts;
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