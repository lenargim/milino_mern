import {Form, Formik} from 'formik';
import React, {FC, useState} from 'react';
import {PhoneInput, TextInput} from "../../common/Form";
import s from './../Login/login.module.sass'
import {signUpSchema} from "./signUpSchema";
import {signUp} from "../../api/apiFunctions";
import {SignUpType} from "../../api/apiTypes";
import modalSt from "../Checkout/checkout.module.sass";
import {useNavigate} from "react-router-dom";

const initialValues: SignUpType = {
    name: '',
    company: '',
    email: '',
    phone: '',
    password: ''
}

const SignUpForm = () => {
    const [userSuccessModalIsOpen, setUserSuccessModalIsOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={signUpSchema}
            onSubmit={(e) => {
                signUp(e).then(res => {
                    if (res) {
                        setUserSuccessModalIsOpen(true)
                        setTimeout(() => {
                            setUserSuccessModalIsOpen(false)
                            navigate('/')
                        }, 5000)
                    }
                })
            }}
        >
            <Form className={s.login} autoComplete="false">
                <TextInput type={"text"} label={'Name'} name={'name'}/>
                <TextInput type={"text"} label={'Company'} name={'company'}/>
                <TextInput type={"email"} label={'Email'} name={'email'}/>
                <PhoneInput type="text" name="phone" label="Phone number"/>
                <TextInput type={"password"} label={'Password'} name={'password'}/>
                <button type="submit" className={['button yellow'].join(' ')}>Sign Up</button>
                {userSuccessModalIsOpen && <UserWillBeActivated />}
            </Form>
        </Formik>
    );
};

export default SignUpForm;

const UserWillBeActivated: FC = () => {
    return (
        <div className={modalSt.notificationWrap}>
            <div className={modalSt.notification}>
                Thank you for your submission!<br/>
                We will contact you soon.
            </div>
        </div>
    )
}