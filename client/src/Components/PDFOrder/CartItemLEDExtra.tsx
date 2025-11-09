import React, {FC} from "react";
import {s} from './PDFOrder'
import {Text, View} from "@react-pdf/renderer";
import {LEDAccessoriesType} from "../../helpers/cartTypes";

const CartItemLedExtra: FC<{ led: LEDAccessoriesType }> = ({led}) => {
    const {
        alum_profiles,
        gola_profiles,
        transformer_60_W,
        transformer_100_W,
        remote_control,
        door_sensor_single,
        door_sensor_double
    } = led
    return (
        <>
            {alum_profiles.length ?
                <View style={s.row}>
                    <Text>LED Aluminum Profiles:</Text>
                    <Text style={s.list}>
                        {alum_profiles.map((p) => `${p.length}'' x ${p.qty}`).join('\n')}
                    </Text>
                </View>
                : null}
            {gola_profiles.length ?
                <View style={s.row}>
                    <Text>LED Gola Profiles:</Text>
                    <Text style={s.list}>
                        {gola_profiles.map((p) => `${p.length}'' x ${p.qty} - ${p.color}`).join('\n')}
                    </Text>
                </View>
                : null}
            {transformer_60_W ?
                <View style={s.itemOption}>
                    <Text>Transformer 60W: {transformer_60_W}</Text>
                </View>
                : null}
            {transformer_100_W ?
                <View style={s.itemOption}>
                    <Text>Transformer 100W: {transformer_100_W}</Text>
                </View>
                : null}
            {remote_control ?
                <View style={s.itemOption}>
                    <Text>Remote Control: {remote_control}</Text>
                </View>
                : null}
            {door_sensor_single ?
                <View style={s.itemOption}>
                    <Text>Door Sensor Single: {door_sensor_single}</Text>
                </View>
                : null}
            {door_sensor_double ?
                <View style={s.itemOption}>
                    <Text>Door Sensor Double: {door_sensor_double}</Text>
                </View>
                : null}
        </>
    );
};

export default CartItemLedExtra