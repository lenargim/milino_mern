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
                <Text style={s.itemOption}>
                    <Text>LED Aluminum Profiles:</Text>
                    <Text>{alum_profiles.map((profile, index) =>
                        <Text key={index}>{profile.length}'' x {profile.qty}</Text>
                    )}</Text>
                </Text>
                : null}
            {gola_profiles.length ?
                <View style={s.itemOption}>
                    <Text>LED Gola Profiles:</Text>
                    <Text>{gola_profiles.map((profile, index) =>
                        <Text key={index}>{profile.length}'' x {profile.qty} - {profile.color}</Text>
                    )}</Text>
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