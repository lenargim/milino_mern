import React from 'react';
import s from "./profile.module.sass";
import {NavLink} from "react-router-dom";
import logo from "../../assets/img/SiteLogo.jpg";
import {logout, useAppSelector} from "../../helpers/helpers";
import {UserType} from "../../api/apiTypes";

const ProfileSidebar = () => {
    const user = useAppSelector<UserType>(state => state.user.user)
    const {is_super_user, is_active_in_constructor} = user
    return (
        <div className={s.profileSidebar}>
            <NavLink to={'/'} className={s.logo}><img src={logo} alt="Milino"/></NavLink>
            <aside className={s.sidebar}>
                {is_super_user &&
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/admin">Admin</NavLink>
                }
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/rooms">Purchase orders</NavLink>
                <NavLink to="https://www.youtube.com/watch?v=5vztBTlkKIE&ab_channel=MilinoCabinets" target={"_blank"}>Tutorial</NavLink>
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/edit">Edit Profile</NavLink>
                {(is_active_in_constructor || is_super_user) &&
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/constructor">Constructor</NavLink>
                }
                {/*<NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/catalog">Catalog</NavLink>*/}
                <button type="button" onClick={logout}>Log out</button>
            </aside>
        </div>
    );
};

export default ProfileSidebar;