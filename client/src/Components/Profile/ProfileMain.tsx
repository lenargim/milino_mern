import React, {FC} from 'react';
import s from './profile.module.sass'
import {useAppSelector} from "../../helpers/helpers";

const ProfileMain:FC = () => {
    const user = useAppSelector(state => state.user.user)!;
    const {name, email} = user
    return (
        <div className={s.profileMain}>
            <h1>Welcome to your Profile, {name} ({email})</h1>
        </div>
    );
};

export default ProfileMain;