import React, {FC} from 'react';
import s from './profile.module.sass'
import {Outlet} from 'react-router-dom';
import ProfileSidebar from "./ProfileSidebar";

const Profile: FC = () => {
    return (
        <main className={s.profile}>
            <ProfileSidebar/>
            <div className={s.profileWrap}>
                <Outlet/>
            </div>
        </main>
    );
};

export default Profile;