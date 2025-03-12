import {Form, Formik,} from 'formik';
import React, {FC, useEffect, useState} from 'react';
import {SignUpSchema} from "../SignUp/signUpSchema";
import s from './profile.module.sass'
import {PasswordInput, PhoneInput, TextInput} from "../../common/Form";
import {EditProfileType, UserType} from "../../api/apiTypes";
import {constructorSetCustomer, updateProfile} from "../../api/apiFunctions";
import {setUser} from "../../store/reducers/userSlice";
import {useAppDispatch} from "../../helpers/helpers";
import ProfileEditForm from "./ProfileEditForm";
import {ProfileEditSchema} from "./ProfileEditSchema";

const ProfileEdit: FC<{ user: UserType }> = ({user}) => {
    const dispatch = useAppDispatch();
    const getInitialValues = (user: UserType): EditProfileType => {
        const {is_active, is_active_in_constructor, is_signed_in_constructor, is_super_user, email, ...userData} = user
        return {...userData, password: '', compare: ''}
    }
    let initialValues = getInitialValues(user);

    useEffect(() => {
        initialValues = getInitialValues(user);
    }, [user]);
    if (!initialValues._id) return null;
    return (
        <Formik initialValues={initialValues}
                validationSchema={ProfileEditSchema}
                onSubmit={(values, {resetForm, setValues}) => {
                    updateProfile(values).then(user => {
                        if (user) {
                            dispatch(setUser(user));
                            resetForm();
                            setValues({...user, password: '', compare: ''});
                            console.log(user);
                            constructorSetCustomer(user).then(res => {
                                console.log(res)
                            });
                        }
                    })
                }}>
            <div className={s.roomEdit}>
                <h1>Update Profile</h1>
                <ProfileEditForm user={user}/>
            </div>
        </Formik>
    );
};

export default ProfileEdit;