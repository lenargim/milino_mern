import React, {FC} from 'react';
import ProfileDesigners from "./ProfileDesigners";
import ProfileManagers from "./ProfileManagers";
import {UserBasicTypesType} from "../../api/apiTypes";


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
    return (
        <div>
            <ProfileDesigners/>
            <ProfileManagers />
        </div>
    );
};

export default ProfileAdmin;

export type UserAccessData = { is_active: boolean, is_active_in_constructor: boolean, user_type:UserBasicTypesType };
