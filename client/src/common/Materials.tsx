import React, {FC} from 'react';
import s from "../Components/OrderForm/Sidebar/sidebar.module.sass";
import {MaterialsFormType} from "./MaterialsForm";
import {getMaterialStrings} from "../helpers/helpers";


export type MaterialStringsType = {
    categoryString: string,
    doorString: string,
    boxString: string,
    drawerString: string,
    leatherString: string
}

const Materials: FC<{ materials: MaterialsFormType }> = ({materials}) => {
    const materialStrings = getMaterialStrings(materials);
    const {drawerString, doorString, boxString, leatherString, categoryString} = materialStrings

    return (
        <div className={s.materials}>
            <h4 className={s.choose}>Materials you choose:</h4>
            {categoryString ? <MaterialItem label="Category" value={categoryString}/> : null}
            {doorString ? <MaterialItem label="Door" value={doorString}/> : null}
            {boxString ? <MaterialItem label="Box Material" value={boxString}/> : null}
            {drawerString ? <MaterialItem label="Drawer" value={drawerString}/> : null}
            {leatherString ? <MaterialItem label="Leather" value={leatherString}/> : null}
        </div>
    );
};

export default Materials;

const MaterialItem: FC<{ label: string, value: string }> = ({label, value}) => {
    return (
        <div className={s.chooseItem}>
            <span>{label}: {value}</span>
        </div>
    )
}