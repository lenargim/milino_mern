import {Form, Formik,} from 'formik';
import React, {FC, useEffect, useState} from 'react';
import {signUpSchema} from "../SignUp/signUpSchema";
import s from './profile.module.sass'
import {TextInput} from "../../common/Form";
import {EditProfileType, UserType} from "../../api/apiTypes";
import {updateProfile} from "../../api/apiFunctions";
import {setIsAuth, setUser} from "../../store/reducers/userSlice";
import {useAppDispatch} from "../../helpers/helpers";

const ProfileEdit: FC<{ user: UserType }> = ({user}) => {
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const initialValues: EditProfileType = {...user, password: ''};
    const [values, setValues] = useState<EditProfileType>(initialValues);
    const {name, email} = values
    useEffect(() => {
        if (name === user.name && email === user.email) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
        setIsUpdated(false)
    },[name, email])
    return (
        <Formik initialValues={initialValues}
                innerRef={(formikActions) => (formikActions ? setValues(formikActions.values) : null)}
                validationSchema={signUpSchema}
                onSubmit={(values) => {
                    updateProfile(values).then(user => {
                        if (user) {
                            dispatch(setUser(user))
                            dispatch(setIsAuth(true))
                            setIsUpdated(true)
                            setIsDisabled(true)
                        }
                    })
                }}>
            <div className={s.roomEdit}>
            <h1>Update Profile</h1>
            <Form className={s.block}>
                <TextInput type={"text"} label={'Name'} name={'name'}/>
                <TextInput type={"email"} label={'Email'} name={'email'}/>
                <TextInput type={"password"} label={'password'} name={'password'}/>
                <button type="submit" className={['button yellow', isUpdated ? s.updated : ''].join(' ')}
                        disabled={isDisabled}>
                    {isUpdated ? 'Updated!' : 'Update'}
                </button>
            </Form>
            </div>
        </Formik>
    );
};

export default ProfileEdit;