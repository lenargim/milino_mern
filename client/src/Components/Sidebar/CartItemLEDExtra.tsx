import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {LEDAccessoriesType} from "../../helpers/cartTypes";
import {getFraction} from "../../helpers/helpers";

const CartItemLedExtra: FC<{ led: LEDAccessoriesType }> = ({led}) => {
    const {
        alum_profiles,
        gola_profiles,
        transformer_60_W,
        transformer_100_W,
        remote_control,
        door_sensor_single,
        door_sensor_double
    } = led;
    return (
        <>
            {alum_profiles.length ?
                <div className={s.itemOption}>
                    <span>LED Aluminum Profiles:</span>
                    <span>{alum_profiles.map((profile, index) =>
                        <span className={s.profileItem}
                              key={index}>{getFraction(profile.length)}'' x {profile.qty}</span>
                    )}</span>
                </div>
                : null}
            {gola_profiles.length ?
                <div className={s.itemOption}>
                    <span>LED Gola Profiles:</span>
                    <span>{gola_profiles.map((profile, index) =>
                        <span className={s.profileItem}
                              key={index}>{getFraction(profile.length)}'' x {profile.qty} - {profile.color}</span>
                    )}</span>
                </div>
                : null}
            {transformer_60_W ?
                <div className={s.itemOption}>
                    <span>Transformer 60W:</span>
                    <span>{transformer_60_W}</span>
                </div>
                : null}
            {transformer_100_W ?
                <div className={s.itemOption}>
                    <span>Transformer 100W:</span>
                    <span>{transformer_100_W}</span>
                </div>
                : null}
            {remote_control ?
                <div className={s.itemOption}>
                    <span>Remote Control:</span>
                    <span>{remote_control}</span>
                </div>
                : null}
            {door_sensor_single ?
                <div className={s.itemOption}>
                    <span>Door Sensor Single:</span>
                    <span>{door_sensor_single}</span>
                </div>
                : null}
            {door_sensor_double ?
                <div className={s.itemOption}>
                    <span>Door Sensor Double:</span>
                    <span>{door_sensor_double}</span>
                </div>
                : null}
        </>
    );
};

export default CartItemLedExtra