import React, {FC} from 'react';
import {AdminUsersType, UserBasicTypesType} from "../../api/apiTypes";
import {formatDateToTextShort, has_super_user_access, useAppDispatch} from "../../helpers/helpers";
import {adminToggleUserRole, adminUserToggleEnabled} from "../../api/apiFunctions";
import {setAdminUserEnabled, setAdminUserRole} from "../../store/reducers/adminSlice";
import s from "./profile.module.sass";
import EnabledSvg from "../../assets/img/EnabledSVG";
import DisabledSVG from "../../assets/img/DisabledSVG";
import {NavLink} from "react-router-dom";
import {UserAccessData} from "./ProfileAdmin";
import {useAuthUser} from "../../utils/customHooks";


const ProfileTableRow: FC<{
    user: AdminUsersType,
    row_user_type: UserBasicTypesType,
}> = (({user, row_user_type}) => {
    const dispatch = useAppDispatch();
    const authUser = useAuthUser();
    const is_admin = has_super_user_access(authUser);
    const {is_active, email, name, _id, is_active_in_constructor, company, createdAt, is_cart_filled, user_type} = user;
    const is_editable = is_cart_filled && is_active;
    const nav_link = `/profile/${is_admin ? 'admin' : 'manager'}/edit/${_id}/purchase`
    const toggleUserEnabled = (data: UserAccessData) => {
        adminUserToggleEnabled(_id, data).then(res => {
            res && dispatch(setAdminUserEnabled({user: res, row_user_type}))
        })
    }
    const toggleUserRole = (role: UserBasicTypesType) => {
        adminToggleUserRole(_id, role).then(res => {
            res && dispatch(setAdminUserRole({user: res, row_user_type}))
        })
    }
    return (
        <div className={is_admin ? s.tableRow : s.tableHeadManager}>
            <div>{formatDateToTextShort(createdAt)}</div>
            <div>{company}</div>
            <div>{name}</div>
            <div>{email}</div>
            {is_admin ? <>
                <div className="checkbox-wrap">
                    <input className="checkbox" id={`is-active-${_id}`} name="is-active" type="checkbox"
                           checked={is_active}
                           onChange={(e) =>
                               toggleUserEnabled({is_active: !is_active, is_active_in_constructor, user_type})}/>
                    <label className="checkbox-label" htmlFor={`is-active-${_id}`}>
                        {is_active ? <EnabledSvg classes={s.svgEnabled}/> : <DisabledSVG classes={s.svgDisabled}/>}
                    </label>
                </div>
                <div className="checkbox-wrap">
                    <input className="checkbox" id={`is-active-in-constructor-${_id}`} name="is-active-in-constructor"
                           type="checkbox"
                           checked={is_active_in_constructor} onChange={(e) =>
                        toggleUserEnabled({is_active, is_active_in_constructor: !is_active_in_constructor, user_type})}/>
                    <label className="checkbox-label" htmlFor={`is-active-in-constructor-${_id}`}>
                        {is_active_in_constructor ? <EnabledSvg classes={s.svgEnabled}/> :
                            <DisabledSVG classes={s.svgDisabled}/>}
                    </label>
                </div>
                <div className="checkbox-wrap">
                    {user_type === 'manager' ?
                        <button type="button" onClick={() => toggleUserRole('designer')}>To designer</button> :
                        <button type="button" onClick={() => toggleUserRole('manager')}>To manager</button>
                    }
                </div>
            </> : null}
            <div>
                {is_editable && <NavLink to={nav_link}>Edit Order</NavLink>}
            </div>
        </div>
    )
})

export default ProfileTableRow;