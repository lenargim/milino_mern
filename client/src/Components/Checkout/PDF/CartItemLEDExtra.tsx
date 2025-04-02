import React, {FC} from "react";
import {MaybeUndefined} from "../../../helpers/productTypes";
import {LEDAccessoriesType} from "../../CustomPart/LEDForm";
import {s} from '../PDF'
import {Text, View} from "@react-pdf/renderer";

const CartItemLedExtra: FC<{ accessories: MaybeUndefined<LEDAccessoriesType> }> = ({accessories}) => {
    if (!accessories) return null;
    const {
        led_alum_profiles,
        led_gola_profiles,
        door_sensor,
        dimmable_remote,
        transformer
    } = accessories
    return (
        <>
            {led_alum_profiles.length ?
                <Text style={s.itemOption}>
                    <Text>LED Aluminum Profiles:</Text>
                    <Text>{led_alum_profiles.map(profile =>
                        <Text key={profile._id}>{profile.length}'' x {profile.qty}</Text>
                    )}</Text>
                </Text>
                : null}
            {led_gola_profiles.length ?
                <View style={s.itemOption}>
                    <Text>LED Gola Profiles:</Text>
                    <Text>{led_gola_profiles.map(profile =>
                        <Text key={profile._id}>{profile.length}'' x {profile.qty} - {profile.color}</Text>
                    )}</Text>
                </View>
                : null}
            {door_sensor ?
                <View style={s.itemOption}>
                    <Text>Door Sensor: {door_sensor}</Text>
                </View>
                : null}
            {dimmable_remote ?
                <View style={s.itemOption}>
                    <Text>Dimmable Remote: {dimmable_remote}</Text>
                </View>
                : null}
            {transformer ?
                <View style={s.itemOption}>
                    <Text>Transformer: {transformer}</Text>
                </View>
                : null}

        </>
    );
};

export default CartItemLedExtra