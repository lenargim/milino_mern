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
        <div style={ {height: '100%'} }>
            <iframe src={process.env.REACT_APP_CONSTRUCTOR_ENV} style={{width: '100%', height: '100%',padding:0,margin:0}} />
        </div>
    );
};

export default Constructor;