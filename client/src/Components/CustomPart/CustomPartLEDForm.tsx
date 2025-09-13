import {Form, FieldArray, useFormikContext} from 'formik';
import React, {FC, useEffect} from 'react';
import s from "../Product/product.module.sass";
import {TextInput} from "../../common/Form";
import CustomPartAlumProfile from "./CustomPartAlumProfile";
import CustomPartGolaProfile from "./CustomPartGolaProfile";
import {CustomPartFormType} from "./CustomPart";
import LEDNumberPart from "./CustomPartNumberPart";
import CustomPartSubmit from "./CustomPartSubmit";
import {LedAccessoriesFormType} from "../../helpers/productTypes";

export const initialLEDAccessories:LedAccessoriesFormType = {
    alum_profiles: [],
    gola_profiles: [],
    transformer_60_W: 0,
    transformer_100_W: 0,
    remote_control: 0,
    door_sensor_single: 0,
    door_sensor_double: 0,
}

const CustomPartLEDForm: FC = () => {
    const {values, setFieldValue, errors} = useFormikContext<CustomPartFormType>();
    const {led_accessories, price} = values;

    useEffect(() => {
        if (!led_accessories) setFieldValue('led_accessories', [initialLEDAccessories]);
    }, [led_accessories])

    if (!led_accessories) return null;
    const {alum_profiles, gola_profiles} = led_accessories
    return (
        <Form className={s.accessories}>
            <div className={s.block}>
                <h3>LED Aluminum Profile</h3>
                <FieldArray name="led_accessories.alum_profiles" render={(arrayHelpers) => (
                    <>
                        {alum_profiles.map((profile, index) => (
                            <CustomPartAlumProfile key={index} profile={profile} index={index} arrayHelpers={arrayHelpers}/>))}
                        <button type="button"
                                className={['button yellow small'].join(' ')}
                                onClick={() => arrayHelpers.push({length_string: '', length: '', qty: 1})}
                        >+ Aluminum Profile</button>
                    </>
                )}
                />
            </div>
            <div className={s.block}>
                <h3>LED Gola Profile</h3>
                <FieldArray name="led_accessories.gola_profiles" render={arrayHelpers => (
                    <>
                        {gola_profiles.map((profile, index) => (
                            <CustomPartGolaProfile key={index}  profile={profile} index={index} arrayHelpers={arrayHelpers}/>))}
                        <button type="button" className={['button yellow small'].join(' ')}
                                onClick={() => arrayHelpers.push({
                                    length_string: '',
                                    length: '',
                                    color: 'Black',
                                    qty: 1
                                })}>+
                            Gola Profile
                        </button>
                    </>
                )}
                />
            </div>

            <div className={s.block}>
                <h3>Accessories</h3>
                <LEDNumberPart el={'led_accessories.transformer_60_W'} label="Transformer 60W"/>
                <LEDNumberPart el={'led_accessories.transformer_100_W'} label="Transformer 100W"/>
                <LEDNumberPart el={'led_accessories.remote_control'} label="Remote control"/>
                <LEDNumberPart el={'led_accessories.door_sensor_single'} label='Door sensor single'/>
                <LEDNumberPart el={'led_accessories.door_sensor_double'} label='Door sensor double'/>
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

export default CustomPartLEDForm;