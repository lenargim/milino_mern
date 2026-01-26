import React from 'react';
import Header from "../../common/Header/Header";
import s from "./login.module.sass";
import {Form, Formik} from 'formik';
import {TextInput} from "../../common/Form";
import {forgotPasswordSchema} from './forgotPasswordSchema'
import {AuthAPI} from "../../api/api";


const ForgotPassword = () => {
    return (
        <main className="wrap">
            <Header/>
            <div className={s.loginWrap}>
                <h1 className="h1">Enter your Email</h1>
                <Formik
                    initialValues={{email: ''}}
                    validationSchema={forgotPasswordSchema}
                    onSubmit={(values) => {
                        // AuthAPI.forgotPassword(values.email).
                    }
                    }
                >
                    <Form className={s.login} autoComplete="false">
                        <TextInput type={"email"} label={'Email'} name={'email'}/>
                        <button type="submit" className={['button yellow'].join(' ')}>Send</button>
                    </Form>
                </Formik>
            </div>
        </main>
    );
};

export default ForgotPassword;