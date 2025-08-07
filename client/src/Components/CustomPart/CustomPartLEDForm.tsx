import {Form, FieldArray, useFormikContext} from 'formik';
import React, {FC, useEffect} from 'react';
import s from "../Product/product.module.sass";
import {TextInput} from "../../common/Form";
import CustomPartAlumProfile from "./CustomPartAlumProfile";
import CustomPartGolaProfile from "./CustomPartGolaProfile";
import {CustomPartFormType, LedAccessoriesFormType} from "./CustomPart";
import LEDNumberPart from "./CustomPartNumberPart";
import {CustomAccessoriesType} from "../../helpers/cartTypes";
import {MaybeNull} from "../../helpers/productTypes";

export const initialLEDAccessories:LedAccessoriesFormType = {
    led_alum_profiles: [],
    led_gola_profiles: [],
    led_door_sensor: 0,
    led_dimmable_remote: 0,
    led_transformer: 0,
}

const CustomPartLEDForm: FC = () => {
    const {values, setFieldValue, isSubmitting, errors} = useFormikContext<CustomPartFormType>();
    const {led_accessories, price} = values;


    useEffect(() => {
        if (!led_accessories) setFieldValue('led_accessories', [initialLEDAccessories]);
    }, [led_accessories])

    useEffect(() => {
        const newPrice = getLEDProductPrice(led_accessories)
        if (price !== newPrice) {
            setFieldValue('price', newPrice)
        }
    }, [values])

    if (!led_accessories) return null;
    const {led_alum_profiles, led_gola_profiles} = led_accessories
    return (
        <Form className={s.accessories}>
            <div className={s.block}>
                <h3>LED Aluminum Profile</h3>
                <FieldArray name="led_accessories.led_alum_profiles" render={(arrayHelpers) => (
                    <>
                        {led_alum_profiles.map((profile, index) => (
                            <CustomPartAlumProfile key={index} profile={profile} index={index} arrayHelpers={arrayHelpers}/>))}
                        <button type="button" className={['button yellow small'].join(' ')}
                                onClick={() => arrayHelpers.push({
                                    length: '',
                                    qty: 1
                                })}>+
                            Aluminum Profile
                        </button>
                    </>
                )}
                />
            </div>
            <div className={s.block}>
                <h3>LED Gola Profile</h3>
                <FieldArray name="led_accessories.led_gola_profiles" render={arrayHelpers => (
                    <>
                        {led_gola_profiles.map((profile, index) => (
                            <CustomPartGolaProfile key={index}  profile={profile} index={index} arrayHelpers={arrayHelpers}/>))}
                        <button type="button" className={['button yellow small'].join(' ')}
                                onClick={() => arrayHelpers.push({
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
                <LEDNumberPart el={'led_accessories.led_door_sensor'} label='Door sensor'/>
                <LEDNumberPart el={'led_accessories.led_dimmable_remote'} label="Dimmable Remote"/>
                <LEDNumberPart el={'led_accessories.led_transformer'} label="Transformer"/>
            </div>
            <div className={s.block}>
                <TextInput type={"text"} label={'Note'} name="Note"/>
            </div>
            <div className={s.total}>
                <span>Total: </span>
                <span>{price}$</span>
            </div>
            <button type="submit" className={['button yellow'].join(' ')} disabled={isSubmitting}>Add to cart
            </button>
        </Form>
    );
};

export default CustomPartLEDForm;


export const getLEDProductPrice = (values: MaybeNull<LedAccessoriesFormType>): number => {
    if (!values) return 0;
    const {
        led_alum_profiles,
        led_gola_profiles,
        led_door_sensor,
        led_dimmable_remote,
        led_transformer,
    } = values;
    const alumProfPrice = led_alum_profiles.reduce((acc, profile) => acc + (profile["length Number"] * 2.55 * profile.qty), 0);
    const golaProfPrice = led_gola_profiles.reduce((acc, profile) => acc + (profile["length Number"] * 5.5 * profile.qty), 0);
    const dimRemotePrice = led_dimmable_remote * 100;
    const doorSensorPrice = led_door_sensor * 150;
    const transformerPrice = led_transformer * 50;

    return +(alumProfPrice + golaProfPrice + dimRemotePrice + doorSensorPrice + transformerPrice).toFixed(1)
}