import React, {FC, useEffect} from 'react';
import {FieldArray, Form, useField, useFormikContext} from 'formik';
import {
    getSelectDoorVal,
    getSelectValfromVal,
} from "../../helpers/helpers";
import s from "../Product/product.module.sass";
import {TextInput} from "../../common/Form";
import {CustomPartType, MaybeNull} from "../../helpers/productTypes";
import {changeAmountType} from "../../helpers/cartTypes";
import SelectField, {optionTypeDoor} from "../../common/SelectField";
import SelectFieldInArr from "../../common/SelectFieldInArr";
import settings from './../../api/settings.json'
import {CustomPartFormType} from "./CustomPart";
import {StandardDoorAPIType} from "../../helpers/cartTypes";

export interface DoorType extends StandardDoorAPIType {
    name: string,
}

const initialStandardDoor: DoorType = {
    name: '',
    qty: 1,
    width: 0,
    height: 0
}

const CustomPartStandardDoorForm: FC<{ customPart: CustomPartType, color:string }> = ({customPart, color}) => {
    const {type} = customPart;
    const {values, setFieldValue, errors, isSubmitting} = useFormikContext<CustomPartFormType>();
    const {standard_doors, price} = values;
    const doorSizes = type === 'standard-doors' ? settings.StandardDoorSizes : settings.glassDoorSizes as DoorSizesArrType[];
    const doorSizesArr: optionTypeDoor[] = doorSizes.map(el => ({...el, label: el.value}))

    useEffect(() => {
        if (!standard_doors) setFieldValue('standard_doors', [initialStandardDoor]);
    }, [standard_doors])

    useEffect(() => {
        const newPrice = getCustomPartStandardDoorPrice(standard_doors, type, color);
        if (price !== newPrice) {
            setFieldValue('price', newPrice)
        }
    }, [standard_doors, doorSizesArr]);
    if (!standard_doors) return null;
    return (
        <Form className={s.accessories}>
            <div className={s.block}>
                <h3>Door Type</h3>
                <FieldArray name="standard_doors" render={({push, remove}) => (
                    <div>
                        {standard_doors && standard_doors.map((door, index) =>
                            <DoorItem door={door}
                                      index={index}
                                      key={index}
                                      remove={remove}
                                      doorSizesArr={doorSizesArr}/>)
                        }
                        <button
                            type="button"
                            onClick={() => push({name: '', qty: 1, width: 0, height: 0})}
                            className={['button yellow small'].join(' ')}>Add Door
                        </button>
                    </div>
                )}
                />
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

export default CustomPartStandardDoorForm;


export const getCustomPartStandardDoorPrice = (doors: MaybeNull<StandardDoorAPIType[]>, name: string, color:string): number => {
    if (!doors) return 0;
    const glassPrice: number = name !== 'standard-door' ? settings.standard_glass_door_price : 0;
    const colorPrice: number = color !== 'White' ? settings.standard_glass_door_color_coef : 0;
    return doors.reduce((acc, door) => {
        const sqr = door.width * door.height / 144;
        const doorPrice = sqr * (20 + glassPrice + colorPrice);
        return +(acc + (doorPrice * door.qty)).toFixed(1)
    }, 0);
}

const DoorItem: FC<{ door: DoorType, index: number, remove: Function, doorSizesArr: optionTypeDoor[] }> = ({
                                                                                                           door,
                                                                                                           index,
                                                                                                           remove,
                                                                                                           doorSizesArr
                                                                                                       }) => {
    const [{value}, meta, {setValue}] = useField<DoorType[]>('standard_doors');
    const {qty, name} = door;
    const selectVal = getSelectDoorVal(name, doorSizesArr);
    const changeAmount = (type: changeAmountType) => {
        const door = value[index];
        door.qty = type === 'minus' ? door.qty - 1 : door.qty + 1;
        value.splice(index, 1, door);
        setValue(value, true);

    }
    return (
        <div className={s.row}>
            <button onClick={() => remove(index)} className={s.close} type={"button"}>×</button>
            <SelectFieldInArr options={doorSizesArr}
                              name={`standard_doors`}
                              val={selectVal}
                              arrIndex={index}
                              placeholder={'Door size'}/>
            <div className={s.row}>×
                <div className={s.buttons}>
                    <button value="minus" disabled={qty <= 1} onClick={() => changeAmount('minus')}
                            type={"button"}>-
                    </button>
                    {qty}
                    <button value="plus" onClick={() => changeAmount('plus')} type={"button"}>+</button>
                </div>
            </div>
        </div>

    )
}

export type DoorSizesArrType = {
    width: number,
    height: number,
    value: string
}
