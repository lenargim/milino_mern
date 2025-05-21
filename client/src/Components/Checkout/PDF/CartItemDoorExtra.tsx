import React, {FC} from "react";
import {Text, View} from "@react-pdf/renderer";
import {s} from '../PDF'
import {splitFrontDoorAccessories} from "../../Product/CartItemDoorExtra";
import {CustomAccessoriesType} from "../../../api/apiFunctions";

const CartItemDoorExtra: FC<{ accessories: CustomAccessoriesType }> = ({accessories}) => {
    const {door} = accessories;
    if (!door) return null;
    const front = splitFrontDoorAccessories(door);
    const {aventos, PTO, hinge, servo} = front;
    return (
        <View style={s.blocks}>
            {aventos.length ? <View>
                <Text style={s.h2}>Aventos:</Text>
                {aventos.map((el, index) =>
                    <Text style={s.itemOption} key={index}>
                        <Text>{el.label}: {el.price}$ x {el.qty}</Text>
                    </Text>
                )}
            </View> : null}

            {hinge.length ? <View>
                <Text style={s.h2}>Hinge:</Text>
                {hinge.map((el, index) =>
                    <Text style={s.itemOption} key={index}>
                        <Text>{el.label}: {el.price}$ x {el.qty}</Text>
                    </Text>
                )}
            </View> : null}

            {PTO.length ? <View>
                <Text style={s.h2}>Push to Open:</Text>
                {PTO.map((el, index) =>
                    <Text style={s.itemOption} key={index}>
                        <Text>{el.label}: {el.price}$ x {el.qty}</Text>
                    </Text>
                )}
            </View> : null}

            {servo.length ? <View>
                <Text style={s.h2}>Servo System:</Text>
                {servo.map((el, index) =>
                    <Text style={s.itemOption} key={index}>
                        <Text>{el.label}: {el.price}$ x {el.qty}</Text>
                    </Text>
                )}
            </View> : null}
        </View>
    );
};

export default CartItemDoorExtra