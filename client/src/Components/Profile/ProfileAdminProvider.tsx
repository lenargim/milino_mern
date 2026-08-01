import React, {FC} from 'react';
import {Outlet} from "react-router-dom";
import {AdminProvider} from "../../helpers/AdminContext";

const ProfileAdminLayout:FC<{is_admin:boolean}> = ({is_admin}) => {
    return (
        <AdminProvider is_admin={is_admin}>
            <Outlet />
        </AdminProvider>
    );
};

export default ProfileAdminLayout;