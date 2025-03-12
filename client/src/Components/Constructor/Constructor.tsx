import React, {FC, useEffect, useState} from 'react';
import {UserType} from "../../api/apiTypes";
import {constructorSetCustomer} from "../../api/apiFunctions";
import Iframe from "./Iframe";

const Constructor: FC<{ user: UserType }> = ({user}) => {
    const {is_active_in_constructor, is_super_user, is_signed_in_constructor, _id, email} = user;
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    useEffect(() => {
        if (_id) {
            if (!is_signed_in_constructor) constructorSetCustomer(user);
            if (is_super_user || is_active_in_constructor) setHasPermission(true);

        }
    }, [user])

    return (
        <>
            {hasPermission ?
                <Iframe email={email} />
                : <h3>Need to grant permission</h3>
            }
        </>
    );
};

export default Constructor;