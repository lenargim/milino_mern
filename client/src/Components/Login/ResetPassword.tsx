import React, {Dispatch, FC, useEffect, useState} from 'react';
import Header from "../../common/Header/Header";
import s from "./login.module.sass";
import {Form, Formik} from 'formik';
import {PasswordInput} from "../../common/Form";
import {resetPasswordSchema} from './resetPasswordSchema';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {getEmailByResetPasswordToken, postResetPasswordEmail} from "../../api/apiFunctions";
import {MaybeNull} from "../../helpers/productTypes";
import st from "./../Checkout/checkout.module.sass";


const ResetPassword: FC = () => {
    const params = useParams();
    const [name, setName] = useState<string>('User')
    const [isReset, setIsReset] = useState<MaybeNull<boolean>>(false)

    useEffect(() => {
        const getNameByToken = async () => {
            if (params.token) {
                const res = await getEmailByResetPasswordToken(params.token);
                if (res) setName(res.name);
            }
        }
        getNameByToken()
    }, [])
    return (
        <main className="wrap">
            <Header/>
            <div className={s.loginWrap}>
                <h1 className="h1">New Password for {name}</h1>
                <Formik
                    initialValues={{new_password: ''}}
                    validationSchema={resetPasswordSchema}
                    onSubmit={async (values) => {
                        if (!params.token) return alert('No token');
                        const res = await postResetPasswordEmail(values.new_password, params.token);
                        if (res && res.message) setIsReset(true);
                    }
                    }
                >
                    <Form className={s.login} autoComplete="false">
                        <PasswordInput type={"password"} label={'Password'} name={'new_password'}/>
                        <button type="submit" className={['button yellow'].join(' ')}>Update</button>
                    </Form>
                </Formik>
                <span className={s.signup}>
                    <nav>
                        <li><NavLink to='/'>Back to Log In</NavLink></li>
                    </nav>
                </span>
                {isReset ? <PasswordWasChanged setIsReset={setIsReset}/> : null}
            </div>
        </main>
    );
};

export default ResetPassword;


const PasswordWasChanged: FC<{ setIsReset: Dispatch<boolean> }> = ({setIsReset}) => {
    const navigate = useNavigate();
    setTimeout(() => {
        setIsReset(false)
        navigate(`/`)
    }, 4000)
    return (
        <div className={st.notificationWrap}>
            <div className={st.notification}>Password was changed! Now you could log in</div>
        </div>
    )
}