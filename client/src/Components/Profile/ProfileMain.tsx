import React, {FC} from 'react';
import {UserType} from "../../api/apiTypes";
import s from './profile.module.sass'

const ProfileMain:FC<{ user: UserType }> = ({user}) => {
    const {name, email} = user
    return (
        <div className={s.profileMain}>
            <h1>Welcome to your Profile, {name} ({email})</h1>
        </div>
    );
};

export default ProfileMain;