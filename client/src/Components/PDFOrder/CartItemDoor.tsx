import React, {FC} from "react";
import {Text, View} from '@react-pdf/renderer';
import {s} from './PDFOrder'
import {StandardDoorAPIType} from "../../helpers/cartTypes";

const CartItemShelfExtra: FC<{ standard_doors: StandardDoorAPIType[] }> = ({standard_doors}) => {
    return (
        <View>
            {standard_doors.map((el, index) => {
                return (
                    <Text style={s.itemOption} key={index}>
                        <Text>Size: {el.width}x{el.height}. Amount: {el.qty}</Text>
                    </Text>
                )
            })}
        </View>
    );
};

export default CartItemShelfExtra