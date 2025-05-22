import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {MaybeUndefined} from "../../helpers/productTypes";
import {DoorAccessoryAPIType, DoorAccessoryType} from "../CustomPart/CustomPart";
import {convertDoorAccessories} from "../../helpers/helpers";
import {CustomAccessoriesType} from "../../api/apiFunctions";

const CartItemDoorExtra: FC<{ accessories: CustomAccessoriesType }> = ({accessories}) => {
    const {door} = accessories;
    if (!door) return null;
    const front = splitFrontDoorAccessories(door);
    const {aventos, PTO, hinge, servo} = front;
    return (
        <>
            {aventos.length ? <span className={s.part}>
                <span>Aventos:</span>
                {aventos.map((el, index) =>
                    <span className={s.itemOption} key={index}>
                            <span>{el.label}: {el.price}$ x {el.qty}</span>
                        </span>
                )}
            </span> : null}

            {hinge.length ? <span className={s.part}>
                <span>Hinge:</span>
                {hinge.map((el, index) =>
                    <span className={s.itemOption} key={index}>
                            <span>{el.label}: {el.price}$ x {el.qty}</span>
                        </span>
                )}
            </span> : null}

            {PTO.length ? <span className={s.part}>
                <span>Push to Open:</span>
                {PTO.map((el, index) =>
                    <span className={s.itemOption} key={index}>
                            <span>{el.label}: {el.price}$ x {el.qty}</span>
                        </span>
                )}
            </span> : null}

            {servo.length ? <span className={s.part}>
                <span>Servo System:</span>
                {servo.map((el, index) =>
                    <span className={s.itemOption} key={index}>
                            <span>{el.label}: {el.price}$ x {el.qty}</span>
                        </span>
                )}
            </span> : null}

        </>
    );
};

export default CartItemDoorExtra

type AccessoriesSplittedType = {
    aventos: DoorAccessoryType[],
    hinge: DoorAccessoryType[],
    PTO: DoorAccessoryType[],
    servo: DoorAccessoryType[]
}
export const splitFrontDoorAccessories = (accessories: DoorAccessoryAPIType[]): AccessoriesSplittedType => {
    const frontAccessories = accessories.map(el => (convertDoorAccessories(el)))
    return {
        aventos: frontAccessories.filter(el => el.filter === 'aventos'),
        hinge: frontAccessories.filter(el => el.filter === 'hinge'),
        PTO: frontAccessories.filter(el => el.filter === 'PTO'),
        servo: frontAccessories.filter(el => el.filter === 'servo')
    }
}