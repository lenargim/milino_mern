import React, {FC, useEffect} from 'react';
import {has_super_user_access} from "../../helpers/helpers";
import {useNavigate} from "react-router-dom";
import {useAuthUser} from "../../utils/customHooks";
import ProfileDesigners from "./ProfileDesigners";
import ProfileManagers from "./ProfileManagers";


export type SortTypes = 'createdAt' | 'name' | 'email' | 'company';
export type SortAdminUsers = Partial<{
    [key in SortTypes]: 1 | -1
}>;

export function getSortClass(sort:SortAdminUsers,type:SortTypes):string {
    switch (type) {
        case 'createdAt':
            if (sort.createdAt === 1) return 'asc';
            if (sort.createdAt === -1) return 'desc';
            break;
        case 'company':
            if (sort.company === 1) return 'asc';
            if (sort.company === -1) return 'desc';
            break;
        case 'name':
            if (sort.name === 1) return 'asc';
            if (sort.name === -1) return 'desc';
            break;
        case 'email':
            if (sort.email === 1) return 'asc';
            if (sort.email === -1) return 'desc';
    }
    return ''
}

const ProfileAdmin: FC = () => {
    const navigate = useNavigate();

    const user = useAuthUser();
    useEffect(() => {
        if (!has_super_user_access(user)) {
            navigate('/profile')
        }
    }, [])

    return (
        <div>
            <ProfileDesigners user_type="designer" />
            <ProfileManagers user_type="manager" />
        </div>
    );
};

export default ProfileAdmin;

export type UserAccessData = { is_active: boolean, is_active_in_constructor: boolean };
