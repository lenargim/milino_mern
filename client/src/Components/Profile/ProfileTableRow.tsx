import React, {FC} from 'react';
import {AdminUsersType, UserBasicTypesType} from "../../api/apiTypes";
import {formatDateToTextShort, useAppDispatch} from "../../helpers/helpers";
import {adminUserToggleEnabled} from "../../api/apiFunctions";
import {setAdminUserEnabled} from "../../store/reducers/adminSlice";
import s from "./profile.module.sass";
import EnabledSvg from "../../assets/img/EnabledSVG";
import DisabledSVG from "../../assets/img/DisabledSVG";
import {NavLink} from "react-router-dom";
import {UserAccessData} from "./ProfileAdmin";


const ProfileTableRow: FC<{ user: AdminUsersType, user_type:UserBasicTypesType }> = React.memo(({user, user_type}) => {
    const dispatch = useAppDispatch();
    const {is_active, email, name, _id, is_active_in_constructor, company, createdAt, is_cart_filled} = user;
    const is_editable = is_cart_filled && is_active;

    const toggleUserEnabled = (data: UserAccessData) => {
        adminUserToggleEnabled(_id, data).then(res => {
            res && dispatch(setAdminUserEnabled({user:res, user_type}))
        })
    }
    return (
        <div className={s.tableRow}>
            <div>{formatDateToTextShort(createdAt)}</div>
            <div>{company}</div>
            <div>{name}</div>
            <div>{email}</div>
            <div className="checkbox-wrap">
                <input className="checkbox" id={`is-active-${_id}`} name="is-active" type="checkbox" checked={is_active}
                       onChange={(e) => toggleUserEnabled({is_active: !is_active, is_active_in_constructor})}/>
                <label className="checkbox-label" htmlFor={`is-active-${_id}`}>
                    {is_active ? <EnabledSvg classes={s.svgEnabled}/> : <DisabledSVG classes={s.svgDisabled}/>}
                </label>
            </div>
            <div className="checkbox-wrap">
                <input className="checkbox" id={`is-active-in-constructor-${_id}`} name="is-active-in-constructor"
                       type="checkbox"
                       checked={is_active_in_constructor} onChange={(e) => toggleUserEnabled({
                    is_active,
                    is_active_in_constructor: !is_active_in_constructor
                })}/>
                <label className="checkbox-label" htmlFor={`is-active-in-constructor-${_id}`}>
                    {is_active_in_constructor ? <EnabledSvg classes={s.svgEnabled}/> :
                        <DisabledSVG classes={s.svgDisabled}/>}
                </label>
            </div>
            <div>
                {is_editable && <NavLink to={`/profile/admin/edit/${_id}/purchase`}>Edit Order</NavLink>}
            </div>
        </div>
    )
})

export default ProfileTableRow;