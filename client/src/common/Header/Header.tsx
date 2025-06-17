import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import s from './header.module.sass'
import logo from '../../assets/img/SiteLogo.jpg';

const Header: FC = () => {
    return (
        <header className={s.header}>
            <div className={s.left}>
                <NavLink to={'/'} className={s.logo}><img src={logo} alt="Milino"/></NavLink>
            </div>
        </header>
    );
};

export default Header;
