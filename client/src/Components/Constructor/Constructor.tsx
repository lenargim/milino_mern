import React, {FC, useEffect, useState} from 'react';
import Iframe from "./Iframe";
import {constructorLogin} from "../../api/apiFunctions";
import {useAppSelector} from "../../helpers/helpers";
import {MaybeNull} from "../../helpers/productTypes";
import {UserType} from "../../api/apiTypes";

const Constructor: FC = () => {
    const user = useAppSelector<MaybeNull<UserType>>(state => state.user.user);
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [isConstructorSigned, setIsConstructorSigned] = useState<boolean>(false);
    useEffect(() => {
        if (user) {
            const {is_active_in_constructor, is_super_user} = user;
            if (is_super_user || is_active_in_constructor) setHasPermission(true);
        }
    }, [user]);
    useEffect(() => {
        if (user) constructorLogin(user).then(customer_token => {
            customer_token && setIsConstructorSigned(true)
        })
    },[])

    if (!user) return null;
    return (
        <>
            {hasPermission ?
                <Iframe user={user} isConstructorSigned={isConstructorSigned}/>
                : <h3>Need to grant permission</h3>
            }
        </>
    );
};

export default Constructor;