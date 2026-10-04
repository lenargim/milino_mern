import React, {FC} from 'react';
import s from "./profile.module.sass";
import {NavLink} from "react-router-dom";
import logo from "../../assets/img/SiteLogo.jpg";
import {has_manager_access, has_super_user_access, useAppDispatch} from "../../helpers/helpers";
import {logout} from "../../store/reducers/userSlice";
import {useAuthUser} from "../../utils/customHooks";

const ProfileSidebar: FC = () => {
    const user = useAuthUser();
    const {is_active_in_constructor, has_archives} = user
    const is_super_user = has_super_user_access(user);
    const is_manager = has_manager_access(user);
    const dispatch = useAppDispatch()

    return (
        <div className={s.profileSidebar}>
            <NavLink to={'/'} className={s.logo}><img src={logo} alt="Milino"/></NavLink>
            <aside className={s.sidebar}>
                {is_super_user &&
                    <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/admin">Admin</NavLink>
                }
                {is_manager &&
                    <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/manager">Manager</NavLink>}
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/purchase">Purchase
                    orders</NavLink>
                {has_archives &&
                    <NavLink className={({isActive}) => isActive ? s.active : ""}
                             to="/profile/archive">Archive </NavLink>
                }
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/door_types">Door
                    Types</NavLink>
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/tutorial">Tutorial</NavLink>
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/edit">Edit Profile</NavLink>
                {(is_active_in_constructor || is_super_user) &&
                    <NavLink className={({isActive}) => isActive ? s.active : ""}
                             to="/profile/constructor">Constructor</NavLink>
                }
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/catalog">Catalog</NavLink>
                <NavLink className={({isActive}) => isActive ? s.active : ""} to="/profile/catalog_2020">2020
                    Catalogs</NavLink>
                <button type="button" onClick={() => dispatch(logout())}>Log out</button>
            </aside>
        </div>
    );
};

export default ProfileSidebar;