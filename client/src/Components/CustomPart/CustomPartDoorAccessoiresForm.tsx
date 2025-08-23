import {Form, useFormikContext} from 'formik';
import React, {FC, useEffect} from 'react';
import s from "../Product/product.module.sass";
import {TextInput} from "../../common/Form";
import {CustomPartFormType, DoorAccessoryFront, DoorAccessoryType} from "./CustomPart";
import CustomPartDoorAccessoryNumberPart from "./CustomPartDoorAccessoryNumberPart";
import DA from "../../api/doorAccessories.json";
import CustomPartSubmit from "./CustomPartSubmit";

const doorAccessories = DA as DoorAccessoryFront[]
export const initialDoorAccessories:DoorAccessoryType[] = doorAccessories.map(el => ({...el, qty: 0}));

const DoorAccessoriesForm: FC = () => {
    const {values, setFieldValue} = useFormikContext<CustomPartFormType>();
    const {door_accessories, price} = values;

    useEffect(() => {
        if (!door_accessories) setFieldValue('door_accessories', initialDoorAccessories)
    }, [door_accessories])

    if (!door_accessories) return null;
    const aventos = door_accessories.filter(el => el.filter === 'aventos');
    const hinge = door_accessories.filter(el => el.filter === 'hinge');
    const PTO = door_accessories.filter(el => el.filter === 'PTO');
    const servo = door_accessories.filter(el => el.filter === 'servo');

    return (
        <Form className={s.accessories}>
            <div className={s.block}>
                <h3>Aventos</h3>
                {aventos.map((el) => <CustomPartDoorAccessoryNumberPart key={el.id} el={el}/>)}
            </div>
            <div className={s.block}>
                <h3>Hinge</h3>
                {hinge.map((el) => <CustomPartDoorAccessoryNumberPart key={el.id} el={el}/>)}
            </div>

            <div className={s.block}>
                <h3>Push To Open</h3>
                {PTO.map((el) => <CustomPartDoorAccessoryNumberPart key={el.id} el={el}/>)}
            </div>

            <div className={s.block}>
                <h3>Servo System</h3>
                {servo.map((el) => <CustomPartDoorAccessoryNumberPart key={el.id} el={el}/>)}
            </div>


            <div className={s.block}>
                <TextInput type={"text"} label={'Note'} name="note"/>
            </div>
            <div className={s.total}>
                <span>Total: </span>
                <span>{price}$</span>
            </div>
            <CustomPartSubmit />
        </Form>
    );
};

export default DoorAccessoriesForm;