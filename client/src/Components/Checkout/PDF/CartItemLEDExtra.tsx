import React, {FC} from "react";
import {MaybeUndefined} from "../../../helpers/productTypes";
import {LEDAccessoriesType} from "../../CustomPart/LEDForm";
import {s} from '../PDF'
import {Text, View} from "@react-pdf/renderer";

const CartItemLedExtra: FC<{ accessories: MaybeUndefined<LEDAccessoriesType> }> = ({accessories}) => {
    if (!accessories) return null;
    const {
        led_alum_profiles: alumProfiles,
        led_gola_profiles: golaProfiles,
        door_sensor: doorSensor,
        dimmable_remote: dimRemote,
        transformer: transformer,
    } = accessories
    return (
        <>
            {alumProfiles.length ?
                <View style={s.itemOption}>
                    <Text>LED Aluminum Profiles: {alumProfiles.map(profile =>
                        <Text key={profile._id}>{profile.length}'' x {profile.qty}</Text>
                    )}</Text>
                </View>
                : null}
            {golaProfiles.length ?
                <View style={s.itemOption}>
                    <Text>LED Gola Profiles: {golaProfiles.map(profile =>
                        <Text key={profile._id}>{profile.length}'' x {profile.qty} - {profile.color}</Text>
                    )}</Text>
                </View>
                : null}
            {doorSensor ?
                <View style={s.itemOption}>
                    <Text>Door Sensor: {doorSensor}</Text>
                </View>
                : null}
            {dimRemote ?
                <View style={s.itemOption}>
                    <Text>Dimmable Remote: {dimRemote}</Text>
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