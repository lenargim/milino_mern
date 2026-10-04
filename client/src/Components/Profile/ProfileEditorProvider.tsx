import React, {FC} from 'react';
import {Outlet} from "react-router-dom";
import {EditorProvider} from "../../helpers/EditorContext";
import {UserTypesType} from "../../api/apiTypes";

const ProfileEditorLayout:FC<{user_type:UserTypesType}> = ({user_type}) => {
    return (
        <EditorProvider user_type={user_type}>
            <Outlet />
        </EditorProvider>
    );
};

export default ProfileEditorLayout;