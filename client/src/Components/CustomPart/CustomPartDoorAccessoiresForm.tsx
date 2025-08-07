import {Form, useFormikContext} from 'formik';
import React, {FC, useEffect} from 'react';
import s from "../Product/product.module.sass";
import {TextInput} from "../../common/Form";
import {CustomPartFormType, DoorAccessoryAPIType, DoorAccessoryFront, DoorAccessoryType} from "./CustomPart";
import {convertDoorAccessories} from "../../helpers/helpers";
import CustomPartDoorAccessoryNumberPart from "./CustomPartDoorAccessoryNumberPart";
import {MaybeNull} from "../../helpers/productTypes";
import DA from "../../api/doorAccessories.json";

const doorAccessories = DA as DoorAccessoryFront[]
export const initialDoorAccessories:DoorAccessoryType[] = doorAccessories.map(el => ({...el, qty: 0}));

const DoorAccessoriesForm: FC = () => {
    const {values, setFieldValue, isSubmitting} = useFormikContext<CustomPartFormType>();
    const {door_accessories, price} = values;

    useEffect(() => {
        if (!door_accessories) setFieldValue('door_accessories', initialDoorAccessories)
    }, [door_accessories])

    useEffect(() => {
        const newPrice = addToCartAccessories(door_accessories)
        if (price !== newPrice) {
            setFieldValue('price', newPrice)
        }
    }, [values]);

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
                <TextInput type={"text"} label={'Note'} name="Note"/>
            </div>
            <div className={s.total}>
                <span>Total: </span>
                <span>{price}$</span>
            </div>
            <button type="submit" className={['button yellow'].join(' ')} disabled={isSubmitting}>Add to cart</button>
        </Form>
    );
};

export default DoorAccessoriesForm;


export const addToCartAccessories = (values: MaybeNull<DoorAccessoryAPIType[]>): number => {
    if (!values) return 0;
    const frontAccessories = values.map(el => (convertDoorAccessories(el)))
    return +(frontAccessories.reduce((acc, item) => acc + (item.price * item.qty), 0)).toFixed(1)
}