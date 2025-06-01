import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {CustomAccessoriesType} from "../../helpers/cartTypes";
import {getFraction} from "../../helpers/helpers";

const CartItemLedExtra: FC<{ accessories: CustomAccessoriesType }> = ({accessories}) => {
    if (!accessories) return null;
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
                <div className={s.itemOption}>
                    <span>LED Aluminum Profiles:</span>
                    <span>{led_alum_profiles.map((profile, index) =>
                        <span className={s.profileItem} key={index}>{getFraction(profile.length)}'' x {profile.qty}</span>
                    )}</span>
                </div>
                : null}
            {led_gola_profiles.length ?
                <div className={s.itemOption}>
                    <span>LED Gola Profiles:</span>
                    <span>{led_gola_profiles.map((profile, index) =>
                        <span className={s.profileItem}
                              key={index}>{getFraction(profile.length)}'' x {profile.qty} - {profile.color}</span>
                    )}</span>
                </div>
                : null}
            {led_door_sensor ?
                <div className={s.itemOption}>
                    <span>Door Sensor:</span>
                    <span>{led_door_sensor}</span>
                </div>
                : null}
            {led_dimmable_remote ?
                <div className={s.itemOption}>
                    <span>Dimmable Remote:</span>
                    <span>{led_dimmable_remote}</span>
                </div>
                : null}
            {led_transformer ?
                <div className={s.itemOption}>
                    <span>Transformer:</span>
                    <span>{led_transformer}</span>
                </div>
                : null}

        </>
    );
};

export default CartItemLedExtra