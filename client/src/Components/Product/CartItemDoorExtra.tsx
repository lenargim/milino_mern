import React, {FC} from 'react';
import s from "../OrderForm/Sidebar/sidebar.module.sass";
import {MaybeUndefined} from "../../helpers/productTypes";
import {DoorAccessoireAPIType, DoorAccessoireType} from "../CustomPart/CustomPart";
import {convertDoorAccessories} from "../../helpers/helpers";

const CartItemDoorExtra: FC<{ accessories: MaybeUndefined<DoorAccessoireAPIType[]> }> = ({accessories}) => {
    if (!accessories) return null;
    const front = splitFrontDoorAccessories(accessories);
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
    aventos: DoorAccessoireType[],
    hinge: DoorAccessoireType[],
    PTO: DoorAccessoireType[],
    servo: DoorAccessoireType[]
}
export const splitFrontDoorAccessories = (accessories: DoorAccessoireAPIType[]): AccessoriesSplittedType => {
    const frontAccessories = accessories.map(el => (convertDoorAccessories(el)))
    return {
        aventos: frontAccessories.filter(el => el.filter === 'aventos'),
        hinge: frontAccessories.filter(el => el.filter === 'hinge'),
        PTO: frontAccessories.filter(el => el.filter === 'PTO'),
        servo: frontAccessories.filter(el => el.filter === 'servo')
    }
}