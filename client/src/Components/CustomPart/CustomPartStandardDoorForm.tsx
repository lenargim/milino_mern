import React, {FC, useEffect} from 'react';
import {FieldArray, Form, useField, useFormikContext } from 'formik';
import {
    getSelectDoorVal,
    getSelectValfromVal,
} from "../../helpers/helpers";
import s from "../Product/product.module.sass";
import {TextInput} from "../../common/Form";
import {CustomPartType} from "../../helpers/productTypes";
import {changeAmountType} from "../Sidebar/Sidebar";
import SelectField, {optionTypeDoor} from "../../common/SelectField";
import SelectFieldInArr from "../../common/SelectFieldInArr";
import settings from './../../api/settings.json'
import {CustomPartFormValuesType} from "./CustomPart";
import {StandardDoorAPIType} from "../../api/apiFunctions";


type Door = {
    name: string,
    qty: number,
    width: number,
    height: number
}

export type DoorType = {
    doors: Door[]
    color: string,
}

const CustomPartStandardDoorForm: FC<{ customPart: CustomPartType }> = ({customPart}) => {
    const {type} = customPart;
    const {values, setFieldValue, errors} = useFormikContext<CustomPartFormValuesType>();
    const {standard_door, price} = values
    const {doors, color} = standard_door

    const doorColors = settings.doorColors as string[];
    const doorColorsArr = doorColors.map(el => ({value: el, label: el}))

    const doorSizes = type === 'standard-door' ? settings.StandardDoorSizes : settings.glassDoorSizes as DoorSizesArrType[];
    const doorSizesArr: optionTypeDoor[] = doorSizes.map(el => ({...el, label: el.value}))

    useEffect(() => {
        const newPrice = getCustomPartStandardDoorPrice(standard_door, type);
        if (price !== newPrice) {
            setFieldValue('price', newPrice)
        }
    }, [standard_door, doors, color, doorSizesArr])

    return (
        <Form className={s.accessories}>
            <div className={s.block}>
                <h3>Door Type</h3>
                <FieldArray name="standard_door.doors" render={({push, remove}) => (
                    <div>
                        {doors.map((door, index) =>
                            <DoorItem door={door} index={index} key={index} remove={remove}
                                      doorSizesArr={doorSizesArr}/>)}
                        {typeof errors['standard_door'] === 'string' &&
                          <div className="error">{errors['standard_door']}</div>}
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
                <h3>Color</h3>
                <SelectField options={doorColorsArr} name="standard_door.color" label="Color"
                             val={getSelectValfromVal(color, doorColorsArr)}/>
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

export default CustomPartStandardDoorForm;

export const getCustomPartStandardDoorPrice = (values: StandardDoorAPIType, name: string): number => {
    const {doors: doorsArr, color} = values;
    const glassPrice: number = name !== 'standard-door' ? 10 : 0;
    const colorPrice: number = color !== 'White' ? 30 : 0;
    return doorsArr.reduce((acc, door) => {
        const sqr = door.width * door.height / 144;
        const doorPrice = sqr * (20 + glassPrice + colorPrice);
        return acc + (+(doorPrice * door.qty).toFixed(1))
    }, 0);
}

const DoorItem: FC<{ door: Door, index: number, remove: Function, doorSizesArr: optionTypeDoor[] }> = ({
                                                                                                           door,
                                                                                                           index,
                                                                                                           remove,
                                                                                                           doorSizesArr
                                                                                                       }) => {
    const [{value}, _, {setValue}] = useField<DoorType>('standard_door');
    const {qty, name} = door;
    const selectVal = getSelectDoorVal(name, doorSizesArr);
    const changeAmount = (type: changeAmountType) => {
        const door = value.doors[index];
        door.qty = type === 'minus' ? door.qty - 1 : door.qty + 1;
        value.doors.splice(index, 1, door);
        setValue(value, true);

    }
    return (
        <div className={s.row}>
            <button onClick={() => remove(index)} className={s.close} type={"button"}>×</button>
            <SelectFieldInArr options={doorSizesArr} name={`standard_door.doors`} val={selectVal} arrIndex={index}
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
