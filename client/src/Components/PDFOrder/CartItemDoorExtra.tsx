import React, {FC} from "react";
import {Text, View} from "@react-pdf/renderer";
import {s} from './PDFOrder'
import {splitFrontDoorAccessories} from "../Sidebar/CartItemDoorExtra";
import {CustomAccessoriesType} from "../../helpers/cartTypes";

const CartItemDoorExtra: FC<{ accessories: CustomAccessoriesType }> = ({accessories}) => {
    const {door} = accessories;
    if (!door) return null;
    const front = splitFrontDoorAccessories(door);
    const {aventos, PTO, hinge, servo} = front;

    const hasAventos = aventos && aventos.length;
    const hasPTO = PTO && PTO.length;
    const hasHinge = hinge && hinge.length
    const hasServo = servo && servo.length

    return (
        <View style={s.blocks}>
            {hasAventos ? <View>
                <Text style={s.h2}>Aventos:</Text>
                {aventos.map((el, index) =>
                    <Text style={s.itemOption} key={index}>
                        <Text>{el.label}: {el.price}$ x {el.qty}</Text>
                    </Text>
                )}
            </View> : null}

            {hasHinge ? <View>
                <Text style={s.h2}>Hinge:</Text>
                {hinge.map((el, index) =>
                    <Text style={s.itemOption} key={index}>
                        <Text>{el.label}: {el.price}$ x {el.qty}</Text>
                    </Text>
                )}
            </View> : null}

            {hasPTO ? <View>
                <Text style={s.h2}>Push to Open:</Text>
                {PTO.map((el, index) =>
                    <Text style={s.itemOption} key={index}>
                        <Text>{el.label}: {el.price}$ x {el.qty}</Text>
                    </Text>
                )}
            </View> : null}

            {hasServo ? <View>
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