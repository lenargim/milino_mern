import React, {FC} from 'react';
import {LEDAccessoriesType} from "../CustomPart/LEDForm";
import {MaybeUndefined} from "../../helpers/productTypes";
import s from "../OrderForm/Sidebar/sidebar.module.sass";

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
                <div className={s.itemOption}>
                    <span>LED Aluminum Profiles:</span>
                    <span>{led_alum_profiles.map(profile =>
                        <span className={s.profileItem} key={profile._id}>{profile.length}'' x {profile.qty}</span>
                    )}</span>
                </div>
                : null}
            {led_gola_profiles.length ?
                <div className={s.itemOption}>
                    <span>LED Gola Profiles:</span>
                    <span>{led_gola_profiles.map(profile =>
                        <span className={s.profileItem}
                              key={profile._id}>{profile.length}'' x {profile.qty} - {profile.color}</span>
                    )}</span>
                </div>
                : null}
            {door_sensor ?
                <div className={s.itemOption}>
                    <span>Door Sensor:</span>
                    <span>{door_sensor}</span>
                </div>
                : null}
            {dimmable_remote ?
                <div className={s.itemOption}>
                    <span>Dimmable Remote:</span>
                    <span>{dimmable_remote}</span>
                </div>
                : null}
            {transformer ?
                <div className={s.itemOption}>
                    <span>Transformer:</span>
                    <span>{transformer}</span>
                </div>
                : null}

        </>
    );
};

export default CartItemLedExtra