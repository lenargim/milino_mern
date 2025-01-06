import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import s from './profile.module.sass'
import {UserType} from "../../api/apiTypes";
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
    const admin = useAppSelector(state => state.admin);
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
                </div>
                <div className={s.tableBody}>
                {users.map(el => <ListItem key={el._id} {...el} />)}
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;

const ListItem: FC<{ name: string, email: string, is_active: MaybeUndefined<boolean>, _id: string }> = ({
                                                                                                            name,
                                                                                                            is_active,
                                                                                                            email,
                                                                                                            _id
                                                                                                        }) => {
    const dispatch = useAppDispatch();
    const toggleUserEnabled = (e: ChangeEvent<HTMLInputElement>) => {
        adminUserToggleEnabled(_id, Boolean(!is_active)).then(res => {
            res && dispatch(setAdminUserEnabled(res))
        })
    }
    return (
        <div className={s.tableRow}>
            <div>{name}</div>
            <div>{email}</div>
            <div className="checkbox-wrap">
                <input className="checkbox" id={`toggle-${_id}`} type="checkbox" checked={is_active} onChange={(e) => toggleUserEnabled(e)}/>
                <label className="checkbox-label" htmlFor={`toggle-${_id}`}>
                    {is_active ? <EnabledSvg classes={s.svgEnabled}/> : <DisabledSVG classes={s.svgDisabled} />}
                </label>
            </div>
        </div>
    )
}