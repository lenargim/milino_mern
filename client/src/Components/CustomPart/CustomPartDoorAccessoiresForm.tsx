import {Form, useFormikContext} from 'formik';
import React, {FC, useEffect} from 'react';
import s from "../Product/product.module.sass";
import {TextInput} from "../../common/Form";
import {CustomPartFormValuesType, DoorAccessoryAPIType} from "./CustomPart";
import {convertDoorAccessories} from "../../helpers/helpers";
import CustomPartDoorAccessoryNumberPart from "./CustomPartDoorAccessoryNumberPart";

const DoorAccessoriesForm: FC = () => {
    const {values, setFieldValue} = useFormikContext<CustomPartFormValuesType>();
    const {door_accessories, price} = values;
    const aventos = door_accessories.filter(el => el.filter === 'aventos');
    const hinge = door_accessories.filter(el => el.filter === 'hinge');
    const PTO = door_accessories.filter(el => el.filter === 'PTO');
    const servo = door_accessories.filter(el => el.filter === 'servo');

    useEffect(() => {
        const newPrice = addToCartAccessories(door_accessories)
        if (price !== newPrice) {
            setFieldValue('price', newPrice)
        }
    }, [values]);

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
            <button type="submit" className={['button yellow'].join(' ')}>Add to cart</button>
        </Form>
    );
};

export default DoorAccessoriesForm;


export const addToCartAccessories = (values: DoorAccessoryAPIType[]): number => {
    const frontAccessories = values.map(el => (convertDoorAccessories(el)))
    return +(frontAccessories.reduce((acc, item) => acc + (item.price * item.qty), 0)).toFixed(1)
}