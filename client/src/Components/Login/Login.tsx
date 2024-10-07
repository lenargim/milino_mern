import React from 'react';
import Header from "../../common/Header/Header";
import LoginForm from "./LoginForm";
import {NavLink} from "react-router-dom";
import s from './login.module.sass'


const Login = () => {
    return (
        <div className="wrap">
            <Header/>
            <div className={s.loginWrap}>
                <h1 className="h1">Login</h1>
                <LoginForm/>
                <span className={s.signup}>
                <NavLink to='/signup'>Sign Up here</NavLink> if you don't have account
                </span>
            </div>
        </div>

    );
};

export default Login;