import React, {FC, useState} from 'react';
import {NavLink, Outlet, useParams} from "react-router-dom";
import s from "./profile.module.sass";

const states = ['Regular', 'White Shaker'] as const;
type statesType = typeof states[number];
const ProfileCatalog: FC = () => {
    const [state, setState] = useState<statesType>('Regular')
    return (
        <>
            <h1>Catalog</h1>
            <div className={s.nav}>
            {states.map((state, index) => <NavLink key={index}
                                        className={({isActive}) => isActive ? s.linkActive : ''}
                                        to={`${state}`}>{state}</NavLink>)}
            </div>
            <Outlet />
        </>
    );
};

export default ProfileCatalog;