import React, {FC} from 'react';
import s from "./profile.module.sass";
import {NavLink} from "react-router-dom";
import logo from "../../assets/img/SiteLogo.jpg";
import {useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {logout} from "../../store/reducers/userSlice";

const ProfileSidebar:FC = () => {
    const user = useAppSelector(state => state.user.user)!;
    const {is_super_user, is_active_in_constructor} = user;
    const dispatch = useAppDispatch()
    return (
        <div className={s.profileSidebar}>
            <NavLink to={'/'} className={s.logo}><img src={logo} alt="Milino"/></NavLink>
            <aside className={s.sidebar}>
                {is_super_user &&
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/admin">Admin</NavLink>
                }
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/purchase">Purchase orders</NavLink>
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/tutorial">Tutorial</NavLink>
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/edit">Edit Profile</NavLink>
                {(is_active_in_constructor || is_super_user) &&
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/constructor">Constructor</NavLink>
                }
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/catalog">Catalog</NavLink>
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/catalog_2020">2020 Catalogs</NavLink>
                <button type="button" onClick={() => dispatch(logout())}>Log out</button>
            </aside>
        </div>
    );
};

export default ProfileSidebar;