import React, {FC} from "react";
import {s} from './PDFOrder'
import {Text, View} from "@react-pdf/renderer";
import {CustomAccessoriesType} from "../../helpers/cartTypes";

const CartItemLedExtra: FC<{ accessories: CustomAccessoriesType }> = ({accessories}) => {
    const {
        led_alum_profiles,
        led_gola_profiles,
        led_door_sensor,
        led_dimmable_remote,
        led_transformer
    } = accessories
    return (
        <>
            {led_alum_profiles.length ?
                <Text style={s.itemOption}>
                    <Text>LED Aluminum Profiles:</Text>
                    <Text>{led_alum_profiles.map((profile, index) =>
                        <Text key={index}>{profile.length}'' x {profile.qty}</Text>
                    )}</Text>
                </Text>
                : null}
            {led_gola_profiles.length ?
                <View style={s.itemOption}>
                    <Text>LED Gola Profiles:</Text>
                    <Text>{led_gola_profiles.map((profile, index) =>
                        <Text key={index}>{profile.length}'' x {profile.qty} - {profile.color}</Text>
                    )}</Text>
                </View>
                : null}
            {led_door_sensor ?
                <View style={s.itemOption}>
                    <Text>Door Sensor: {led_door_sensor}</Text>
                </View>
                : null}
            {led_dimmable_remote ?
                <View style={s.itemOption}>
                    <Text>Dimmable Remote: {led_dimmable_remote}</Text>
                </View>
                : null}
            {led_transformer ?
                <View style={s.itemOption}>
                    <Text>Transformer: {led_transformer}</Text>
                </View>
                : null}

        </>
    );
};

export default CartItemLedExtra