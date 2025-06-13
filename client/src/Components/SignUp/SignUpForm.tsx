import {Form, Formik} from 'formik';
import React, {FC, useState} from 'react';
import {PasswordInput, PhoneInput, TextInput} from "../../common/Form";
import s from './../Login/login.module.sass'
import {SignUpSchema} from "./signUpSchema";
import {signUp} from "../../api/apiFunctions";
import {SignUpFrontType} from "../../api/apiTypes";
import modalSt from "../Checkout/checkout.module.sass";
import {useNavigate} from "react-router-dom";

const initialValues: SignUpFrontType = {
    name: '',
    company: '',
    email: '',
    phone: '',
    password: '',
    compare: '',
    website: ''

}

const SignUpForm = () => {
    const [userSuccessModalIsOpen, setUserSuccessModalIsOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={(e:SignUpFrontType) => {
                const {compare, ...data} = e;
                signUp(data).then(res => {
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
                <PasswordInput type={"password"} label={'Password'} name={'password'}/>
                <PasswordInput type={"password"} label={'Confirm password'} name={'compare'}/>
                <TextInput type={"text"} label={'Website'} name={'website'}/>
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