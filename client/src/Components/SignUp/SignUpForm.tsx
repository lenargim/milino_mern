import {Form, Formik} from 'formik';
import React from 'react';
import {TextInput} from "../../common/Form";
import s from './../Login/login.module.sass'
import {signUpSchema} from "./signUpSchema";
import {signUp} from "../../api/apiFunctions";
import {SignUpType} from "../../api/apiTypes";
import {useDispatch} from "react-redux";
import {setIsAuth, setUser} from "../../store/reducers/userSlice";

const initialValues: SignUpType = {
    name: '',
    email: '',
    password: ''
}

const SignUpForm = () => {
    const dispatch = useDispatch()
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(e) => {
                signUp(e).then(user => {
                    if (user) {
                        dispatch(setIsAuth(true))
                        dispatch(setUser(user))
                    }
                })
            }}
            validationSchema={signUpSchema}
        >
            <Form className={s.login} autoComplete="false">
                <TextInput type={"text"} label={'Name'} name={'name'}/>
                <TextInput type={"email"} label={'Email'} name={'email'}/>
                <TextInput type={"password"} label={'password'} name={'password'}/>
                <button type="submit" className={['button yellow'].join(' ')}>Sign Up</button>
            </Form>
        </Formik>
    );
};

export default SignUpForm;