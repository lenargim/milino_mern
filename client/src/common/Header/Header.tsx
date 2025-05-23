import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import s from './header.module.sass'
import {useAppSelector} from "../../helpers/helpers";
import logo from '../../assets/img/SiteLogo.jpg'

const Header: FC = () => {
    const isAuth = useAppSelector(state => state.user.isAuth)
    return (
        <header className={s.header}>
            <div className={s.left}>
                <NavLink to={'/'} className={s.logo}><img src={logo} alt="Milino"/></NavLink>
                {isAuth ? <NavLink to={'/profile'}>Profile</NavLink> : <NavLink to={'/'}>Log In</NavLink>}
            </div>
        </header>
    );
};

export default Header;
