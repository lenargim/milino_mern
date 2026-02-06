import React, {Dispatch, FC, useState} from 'react';
import Header from "../../common/Header/Header";
import s from "./login.module.sass";
import {Form, Formik} from 'formik';
import {TextInput} from "../../common/Form";
import {forgotPasswordSchema} from './forgotPasswordSchema'
import {postForgotPasswordEmail} from "../../api/apiFunctions";
import {NavLink, useNavigate} from "react-router-dom";
import st from "../Checkout/checkout.module.sass";
import {MaybeNull} from "../../helpers/productTypes";


const ForgotPassword = () => {
    const [isSent, setIsSent] = useState<MaybeNull<boolean>>(false)
    return (
        <main className="wrap">
            <Header/>
            <div className={s.loginWrap}>
                <h1 className="h1">Enter your Email</h1>
                <Formik
                    initialValues={{email: ''}}
                    validationSchema={forgotPasswordSchema}
                    onSubmit={async (values, formikHelpers) => {
                        const status = await postForgotPasswordEmail(values.email);
                        formikHelpers.resetForm();
                        if (status === 200) setIsSent(true);
                    }
                    }
                >
                    <Form className={s.login} autoComplete="false">
                        <TextInput type={"email"} label={'Email'} name={'email'}/>
                        <button type="submit" className={['button yellow'].join(' ')}>Send</button>
                    </Form>
                </Formik>
                <span className={s.signup}>
                    <nav>
                        <li><NavLink to='/'>Back to Log In</NavLink></li>
                    </nav>
                </span>
                {isSent ? <EmailWasSent setIsSent={setIsSent}/> : null}
            </div>
        </main>
    );
};

export default ForgotPassword;

const EmailWasSent: FC<{ setIsSent: Dispatch<boolean> }> = ({setIsSent}) => {
    const navigate = useNavigate();
    setTimeout(() => {
        setIsSent(false)
        navigate(`/`)
    }, 4000)
    return (
        <div className={st.notificationWrap}>
            <div className={st.notification}>Link was sent to your E-mail</div>
        </div>
    )
}