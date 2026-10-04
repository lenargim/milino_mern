import React, {FC, useEffect, useState} from 'react';
import Iframe from "./Iframe";
import {constructorLogin} from "../../api/apiFunctions";
import {has_super_user_access, useAppSelector} from "../../helpers/helpers";
import {UserType} from "../../api/apiTypes";
import {Navigate} from "react-router-dom";

const Constructor: FC = () => {
    const user = useAppSelector<UserType>(state => state.user.user!);
    const hasPermission = user.is_active_in_constructor || has_super_user_access(user);

    const [isLoading, setIsLoading] = useState(true);
    const [customerToken, setCustomerToken] = useState<string>();

    useEffect(() => {
        if (!hasPermission) {
            setIsLoading(false);
            return;
        }

        constructorLogin(user)
            .then(token => {
                setCustomerToken(token);
            })
            .catch(console.error)
            .finally(() => {
                setIsLoading(false);
            });
    }, [hasPermission, user])

    if (!hasPermission) return <Navigate to="/"/>
    if (isLoading) return <div>Loading...</div>;
    if (!customerToken) return <div>Constructor login failed</div>
    return (
        <Iframe customer_token={customerToken}/>
    );
};

export default Constructor;