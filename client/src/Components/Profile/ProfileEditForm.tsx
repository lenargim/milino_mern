import {Form, FormikErrors, useFormikContext,} from 'formik';
import React, {FC, useEffect, useState} from 'react';
import s from './profile.module.sass'
import {PasswordInput, PhoneInput, TextInput} from "../../common/Form";
import {EditProfileType, UserType} from "../../api/apiTypes";

const ProfileEditForm: FC<{ user: UserType }> = ({user}) => {
    const [isEnabled, setIsEnabled] = useState<boolean>(true);
    const {values, errors} = useFormikContext<EditProfileType>();
    const {password, compare, phone, name, company} = values;

    const enableSubmit = (values:EditProfileType, errors:FormikErrors<EditProfileType>, user:UserType):boolean => {
        if (Object.keys(errors).length) return false;
        const sameData = name === user.name && phone === user.phone && company === user.company;
        return !(sameData && (!password || !compare));
    }

    useEffect(() => {
        setIsEnabled(enableSubmit(values, errors, user))
    }, [values,errors])
    return (
        <Form className={s.block}>
            <TextInput type={"text"} label={'Name'} name={'name'}/>
            <TextInput type={"text"} label={'Company'} name={'company'}/>
            <PhoneInput type="text" label="Phone number" name={'phone'}/>
            <TextInput type={"text"} label={'Website'} name={'website'}/>
            <PasswordInput type={"password"} label={'Password'} name={'password'}/>
            <PasswordInput type={"password"} label={'Confirm password'} name={'compare'}/>
            <button type="submit" className={['button yellow'].join(' ')}
                    disabled={!isEnabled}>Update
            </button>
        </Form>
    );
};

export default ProfileEditForm;