import React, {FC, useEffect} from 'react';
import {getConstructorCustomers} from "../../api/apiFunctions";
import {UserType} from "../../api/apiTypes";

const Constructor: FC<{ user: UserType }> = () => {
    useEffect(() => {
        getConstructorCustomers().then((customers) => {
            console.log(customers)
        })
    }, [])

    return (
        <div>

        </div>
    );
};

export default Constructor;