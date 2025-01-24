import React, {FC, useState} from 'react';
import s from "./profile.module.sass";

const states = ['Regular', 'White Shaker'] as const;
export type statesType = typeof states[number];
const ProfileCatalog: FC = () => {
    const [state, setState] = useState<statesType>('Regular');
    return (
        <>
            <h1>Catalog</h1>
            <div className={s.nav}>
                {states.map((el, index) => {
                    return <ProfileCatalogRadio key={index} value={el} state={state} setState={setState} />
                })}
            </div>
            {/*<ProfileCatalogItem state={state} />*/}
        </>
    );
};

export default ProfileCatalog;

const ProfileCatalogRadio:FC<{value:statesType, state:statesType, setState: (value: statesType) => void}> = ({value, state, setState}) => {
    return (
        <div className={[s.navItem,value === state ? s.linkActive : ''].join(' ')}>
            <input type={"radio"} value={value} name="catalog" id={value} onClick={() => setState(value)} />
            <label htmlFor={value}>{value}</label>
        </div>
    )
}