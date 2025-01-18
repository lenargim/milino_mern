import React from 'react';
import Header from "../../common/Header/Header";
import s from './../Login/login.module.sass'
import SignUpForm from "./SignUpForm";
import {NavLink} from "react-router-dom";


const SignUp = () => {
    return (
        <main className="wrap">
            <Header/>
            <div className={s.loginWrap}>
                <h1 className="h1">SignUp</h1>
                <SignUpForm/>
                <span className={s.signup}>
                <NavLink to='/'>Back to Login</NavLink>
                </span>
            </div>
        </main>

    );
};

export default SignUp;