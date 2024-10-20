import {Form, Formik, useFormikContext} from 'formik';
import React, {FC, useEffect} from 'react';
import {useAppDispatch} from "../../helpers/helpers";
import s from "../Product/product.module.sass";
import {TextInput} from "../../common/Form";
import {CustomPart, customPartDataType} from "../../helpers/productTypes";
import NumberPartArrayItem from "./NumberPartArrayItem";
import NumberPart from "./NumberPart";
import {CustomPartFormValuesType} from "./CustomPart";


export type HingeType = {
    title: string,
    label: string,
    qty: number,
    price: number
}

export type hingeHoleCustomType = {
    title: string,
    qty: number,
    price: 6
}

export type DoorAccessoiresType = {
    aventos: HingeType[],
    door_hinge: number,
    hinge_holes: number,
    PTO: HingeType[],
    servo: HingeType[]
}

const DoorAccessoiresForm: FC<{ customPart: CustomPart }> = ({customPart}) => {
    const dispatch = useAppDispatch();
    const {values, setFieldValue, errors} = useFormikContext<CustomPartFormValuesType>();
    const {door_accessories, price} = values;
    const {aventos, door_hinge, hinge_holes, PTO, servo} = door_accessories

    useEffect(() => {
        const newPrice = addToCartAccessories(door_accessories)
        if (price !== newPrice) {
            setFieldValue('price', newPrice)
        }
    }, [values])

    return (
        <Form className={s.accessories}>
            <div className={s.block}>
                <h3>Aventos</h3>
                {aventos.map((el, index) => <NumberPartArrayItem key={index} name="door_accessories.aventos"
                                                                 index={index}/>)}
            </div>
            <div className={s.block}>
                <h3>Hinge</h3>
                <NumberPart el={`door_accessories.door_hinge`} label={'Door Hinge'}/>
                <NumberPart el={`door_accessories.hinge_holes`} label={'Hinge Holes'}/>
            </div>

            <div className={s.block}>
                <h3>Push To Open</h3>
                {PTO.map((el, index) => <NumberPartArrayItem key={index} name="door_accessories.PTO"
                                                             index={index}/>)}
            </div>

            <div className={s.block}>
                <h3>Servo System</h3>
                {servo.map((el, index) => <NumberPartArrayItem key={index} name="door_accessories.servo"
                                                               index={index}/>)}
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

export default DoorAccessoiresForm;


const addToCartAccessories = (values: DoorAccessoiresType): number => {
    const {aventos, door_hinge: doorHinge, hinge_holes: hingeHoles, PTO, servo} = values
    const aventosPrice = aventos.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const doorHingePrice = doorHinge * 10;
    const hingeHolesPrice = hingeHoles * 6;
    const PTOPrice = PTO.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const servoPrice = servo.reduce((acc, item) => acc + (item.price * item.qty), 0);
    return +(aventosPrice + doorHingePrice + hingeHolesPrice + PTOPrice + servoPrice).toFixed(1)
}