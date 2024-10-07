import React from 'react';
import Header from "../../common/Header/Header";
import s from './../Login/login.module.sass'
import SignUpForm from "./SignUpForm";
import {NavLink} from "react-router-dom";


const SignUp = () => {
    return (
        <div className="wrap">
            <Header/>
            <div className={s.loginWrap}>
                <h1 className="h1">SignUp</h1>
                <SignUpForm/>
                <span className={s.signup}>
                <NavLink to='/login'>Back to Login</NavLink>
                </span>
            </div>
        </div>

    );
};

export default SignUp;