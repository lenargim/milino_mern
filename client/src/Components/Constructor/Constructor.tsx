import React, {FC, useEffect, useState} from 'react';
import {UserType} from "../../api/apiTypes";
import Iframe from "./Iframe";

const Constructor: FC<{ user: UserType }> = ({user}) => {
    const {is_active_in_constructor, is_super_user} = user;
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    useEffect(() => {
        if (is_super_user || is_active_in_constructor) setHasPermission(true);
    }, [user])

    return (
        <>
            {hasPermission ?
                <Iframe user={user}/>
                : <h3>Need to grant permission</h3>
            }
        </>
    );
};

export default Constructor;