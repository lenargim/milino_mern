import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import s from './profile.module.sass'
import {AdminType, AdminUsersType, UserType} from "../../api/apiTypes";
import {useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {useNavigate} from "react-router-dom";
import {adminUserToggleEnabled, getAdminUsers} from "../../api/apiFunctions";
import {setAdminUserEnabled, setAdminUsers} from "../../store/reducers/adminSlice";
import {MaybeUndefined} from "../../helpers/productTypes";
import EnabledSvg from "../../assets/img/EnabledSVG";
import DisabledSVG from "../../assets/img/DisabledSVG";

const ProfileEdit: FC<{ user: UserType }> = ({user}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const admin = useAppSelector<AdminType>(state => state.admin);
    const {users} = admin;

    useEffect(() => {
        if (!user.is_super_user) {
            navigate('/profile')
        }
        getAdminUsers().then(res => {
            if (res) {
                dispatch(setAdminUsers(res))
            }
        })
    }, [])

    return (
        <div className={s.roomsMain}>
            <h1>Enable Users</h1>
            <div className={s.table}>
                <div className={s.tableHead}>
                    <div>Name</div>
                    <div>Email</div>
                    <div>Enabled</div>
                    <div>Constructor</div>
                </div>
                <div className={s.tableBody}>
                    {users.map(el => <ListItem key={el._id} user={el}/>)}
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;

export type UserAccessData = {is_active:boolean, is_active_in_constructor: boolean};

const ListItem: FC<{ user: AdminUsersType }> = ({user}) => {
    const {is_active, email, name, _id, is_active_in_constructor} = user
    const dispatch = useAppDispatch();
    const toggleUserEnabled = (data: UserAccessData) => {
            adminUserToggleEnabled(_id, data).then(res => {
                res && dispatch(setAdminUserEnabled(res))
            })
    }
    return (
        <div className={s.tableRow}>
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
                <input className="checkbox" id={`is-active-in-constructor-${_id}`} name="is-active-in-constructor" type="checkbox"
                       checked={is_active_in_constructor} onChange={(e) => toggleUserEnabled({is_active, is_active_in_constructor: !is_active_in_constructor})}/>
                <label className="checkbox-label" htmlFor={`is-active-in-constructor-${_id}`}>
                    {is_active_in_constructor ? <EnabledSvg classes={s.svgEnabled}/> :
                        <DisabledSVG classes={s.svgDisabled}/>}
                </label>
            </div>
        </div>
    )
}