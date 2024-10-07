import React from 'react';
import {NavLink} from "react-router-dom";
import s from './not_found.module.sass'

const NotFound = () => {
    return (
        <div className="wrap">
            <div className={s.page}>
            <h1>404</h1>
            <h2>Page not found</h2>
            <NavLink to="/" className="button yellow">Back to main page</NavLink>
            </div>
        </div>
    );
};

export default NotFound;