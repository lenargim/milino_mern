import React from 'react';
import s from "./profile.module.sass";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {emptyUser, setIsAuth, setUser} from "../../store/reducers/userSlice";
import logo from "../../assets/img/SiteLogo.jpg";

const ProfileSidebar = () => {
    const dispatch = useDispatch();
    const logOut = () => {
        localStorage.removeItem('token')
        dispatch(setUser(emptyUser))
        dispatch(setIsAuth(false))
    }
    return (
        <div className={s.profileSidebar}>
            <NavLink to={'/'} className={s.logo}><img src={logo} alt="Milino"/></NavLink>
            <aside className={s.sidebar}>
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/rooms">Rooms</NavLink>
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/edit">Edit Profile</NavLink>
                <button type="button" onClick={logOut}>Log out</button>
            </aside>
        </div>
    );
};

export default ProfileSidebar;