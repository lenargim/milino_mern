import React, {FC, useEffect, useState} from 'react';
import Iframe from "./Iframe";
import {constructorLogin} from "../../api/apiFunctions";
import {useAppSelector} from "../../helpers/helpers";
import {UserType} from "../../api/apiTypes";
import {Navigate} from "react-router-dom";

const Constructor: FC = () => {
    const user = useAppSelector<UserType>(state => state.user.user!);
    const hasPermission = user.is_active_in_constructor || user.is_super_user;

    const [isLoading, setIsLoading] = useState(true);
    const [customerToken, setCustomerToken] = useState<string>();

    useEffect(() => {
        if (!hasPermission) return;

        constructorLogin(user)
            .then(token => {
                setCustomerToken(token);
            })
            .catch(console.error)
            .finally(() => {
                setIsLoading(false);
            });
    }, [])

    if (!hasPermission) return <Navigate to="/"/>
    if (isLoading) return <div>Loading...</div>;
    if (!customerToken) return <div>Constructor login failed</div>
    return (
        <Iframe customer_token={customerToken}/>
    );
};

export default Constructor;