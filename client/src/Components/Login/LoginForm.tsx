import {Form, Formik} from 'formik';
import React from 'react';
import {loginSchema} from "./loginSchema";
import {TextInput} from "../../common/Form";
import s from './login.module.sass'
import {logIn} from "../../api/apiFunctions";
import {setIsAuth, setUser} from "../../store/reducers/userSlice";
import {useDispatch} from "react-redux";

const initialValues = {
    email: '',
    password: ''
}

const LoginForm = () => {
    const dispatch = useDispatch()
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(e) => {
                logIn(e).then(user => {
                    if (user) {
                        if (user) {
                            dispatch(setUser(user))
                            dispatch(setIsAuth(true))
                        }
                    }
                })
            }}
            validationSchema={loginSchema}
        >
            <Form className={s.login} autoComplete="false">
                <TextInput type={"email"} label={'Email'} name={'email'}/>
                <TextInput type={"password"} label={'password'} name={'password'}/>
                <button type="submit" className={['button yellow'].join(' ')}>Log in</button>
            </Form>
        </Formik>
    );
};

export default LoginForm;