import React from 'react';
import s from "./profile.module.sass";
import {NavLink} from "react-router-dom";
import logo from "../../assets/img/SiteLogo.jpg";
import {logout} from "../../helpers/helpers";

const ProfileSidebar = () => {
    return (
        <div className={s.profileSidebar}>
            <NavLink to={'/'} className={s.logo}><img src={logo} alt="Milino"/></NavLink>
            <aside className={s.sidebar}>
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/rooms">Process Orders</NavLink>
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/edit">Edit Profile</NavLink>
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/orders">Orders History</NavLink>
                <button type="button" onClick={logout}>Log out</button>
            </aside>
        </div>
    );
};

export default ProfileSidebar;