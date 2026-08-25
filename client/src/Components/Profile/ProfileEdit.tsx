import React, {FC} from 'react';
import ProfileEditForm from "./ProfileEditForm";
import {useAuthUser} from "../../utils/customHooks";
import ProfileLinkForm from "./ProfileLinkForm";
import s from './profile.module.sass';

const ProfileEdit: FC = () => {
    const user = useAuthUser();

    return (
        <div className={s.profileEdit}>
            <ProfileEditForm user={user}/>
            <ProfileLinkForm user={user} />
        </div>
    );
};

export default ProfileEdit;