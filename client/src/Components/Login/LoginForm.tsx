import {Form, Formik} from 'formik';
import React, {FC, useState} from 'react';
import {loginSchema} from "./loginSchema";
import {PasswordInput, TextInput} from "../../common/Form";
import s from './login.module.sass'
import {logIn} from "../../api/apiFunctions";
import {setIsAuth, setUser} from "../../store/reducers/userSlice";
import {useDispatch} from "react-redux";
import modalSt from './../Checkout/checkout.module.sass'
import {LogInType} from "../../api/apiTypes";

const initialValues:LogInType = {
    email: '',
    password: ''
}

const LoginForm = () => {
    const dispatch = useDispatch()
    const [userErrorModalIsOpen, setUserErrorModalIsOpen] = useState<boolean>(false)
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(e:LogInType) => {
                logIn(e).then(user => {
                    if (user) {
                        if (user.is_active) {
                            dispatch(setUser(user))
                            dispatch(setIsAuth(true));
                        } else {
                            setUserErrorModalIsOpen(true)
                            setTimeout(() => {
                                setUserErrorModalIsOpen(false)
                            }, 5000)
                        }
                    }
                })
            }}
            validationSchema={loginSchema}
        >
            <Form className={s.login} autoComplete="false">
                <TextInput type={"email"} label={'Email'} name={'email'}/>
                <PasswordInput type={"password"} label={'password'} name={'password'}/>
                <button type="submit" className={['button yellow'].join(' ')}>Log in</button>
                {userErrorModalIsOpen && <UserUnactivated/>}
            </Form>
        </Formik>
    );
};

export default LoginForm;

const UserUnactivated: FC = () => {
    return (
        <div className={modalSt.notificationWrap}>
            <div className={modalSt.notification}>
                Your account has not been activated.
            </div>
        </div>
    )
}