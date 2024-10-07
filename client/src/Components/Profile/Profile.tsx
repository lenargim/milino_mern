import React, {FC} from 'react';

import s from './profile.module.sass'
import {Outlet} from 'react-router-dom';
import ProfileSidebar from "./ProfileSidebar";

const Profile: FC = () => {
    return (
        <div className={s.profile}>
            <ProfileSidebar/>
            <main className={s.main}>
                <Outlet/>
            </main>
        </div>
    );
};

export default Profile;