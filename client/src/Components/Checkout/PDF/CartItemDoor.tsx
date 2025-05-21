import React, {FC} from "react";
import {Text, View} from '@react-pdf/renderer';
import {s} from '../PDF'
import {StandardDoorAPIType} from "../../../api/apiFunctions";

const CartItemShelfExtra: FC<{ standard_door: StandardDoorAPIType }> = ({standard_door}) => {
    const {color, doors} = standard_door;
    return (
        <View>
            {doors.map((el, index) => {
                return (
                    <Text style={s.itemOption} key={index}>
                        <Text>Size: {el.width}x{el.height}. Amount: {el.qty}</Text>
                    </Text>
                )
            })}
            <Text style={s.itemOption}>
                <Text>Door Color: {color}</Text>
            </Text>
        </View>
    );
};

export default CartItemShelfExtra