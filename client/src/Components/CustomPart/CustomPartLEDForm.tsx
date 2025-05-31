import {Form, useFormikContext} from 'formik';
import React, {FC, useEffect} from 'react';
import s from "../Product/product.module.sass";
import {TextInput} from "../../common/Form";
import {v4 as uuidv4} from "uuid";
import CustomPartAlumProfile from "./CustomPartAlumProfile";
import CustomPartGolaProfile from "./CustomPartGolaProfile";
import {CustomPartFormValuesType, LedAccessoriesFormType} from "./CustomPart";
import LEDNumberPart from "./CustomPartNumberPart";
import {CustomAccessoriesType} from "../../helpers/cartTypes";

export type LEDAccessoriesType = Exclude<CustomAccessoriesType, 'door'>

const CustomPartLEDForm: FC = () => {
    const {values, setFieldValue, isSubmitting} = useFormikContext<CustomPartFormValuesType>();
    const {led_accessories, price} = values;
    const {led_alum_profiles, led_gola_profiles} = led_accessories

    const newPrice = getLEDProductPrice(led_accessories)
    useEffect(() => {
        if (price !== newPrice) {
            setFieldValue('price', newPrice)
        }
    }, [values, newPrice])

    const addProfile = (field: string) => {
        switch (field) {
            case 'led_alum_profiles':
                setFieldValue('led_accessories.led_alum_profiles', [...led_alum_profiles, {
                    _id: uuidv4(),
                    length: '',
                    qty: 1
                }])
                break;
            case 'led_gola_profiles':
                setFieldValue('led_accessories.led_gola_profiles', [...led_gola_profiles, {
                    _id: uuidv4(),
                    length: '',
                    color: 'Black',
                    qty: 1
                }])
                break;
        }
    }

    return (
        <Form className={s.accessories}>
            <div className={s.block}>
                <h3>LED Aluminum Profile</h3>
                {led_alum_profiles.length
                    ? led_alum_profiles.map((profile, index) => <CustomPartAlumProfile
                        key={profile._id}
                        profile={profile}
                        index={index}
                    />)
                    : null}
                <button type="button" className={['button yellow small'].join(' ')}
                        onClick={() => addProfile('led_alum_profiles')}>+
                    Aluminum Profile
                </button>
            </div>
            <div className={s.block}>
                <h3>LED Gola Profile</h3>
                {led_gola_profiles.length
                    ? led_gola_profiles.map((profile, index) => <CustomPartGolaProfile
                        profile={profile}
                        index={index}
                        key={profile._id}
                    />)
                    : null}
                <button type="button" className={['button yellow small'].join(' ')}
                        onClick={() => addProfile('led_gola_profiles')}>+
                    Gola Profile
                </button>
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
            <button type="submit" className={['button yellow'].join(' ')} disabled={isSubmitting}>Add to cart</button>
        </Form>
    );
};

export default CustomPartLEDForm;


export const getLEDProductPrice = (values: LedAccessoriesFormType): number => {
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