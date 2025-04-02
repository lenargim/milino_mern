import React, {FC} from "react";
import {DoorType} from "../../CustomPart/StandardDoorForm";
import {Text, View} from '@react-pdf/renderer';
import {MaybeUndefined} from "../../../helpers/productTypes";
import {s} from '../PDF'

const CartItemShelfExtra: FC<{ standard_door: MaybeUndefined<DoorType> }> = ({standard_door}) => {
    if (!standard_door) return null;
    const {color, doors: doorArr} = standard_door
    return (
        <View>
            {doorArr.map((el, index) => {
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