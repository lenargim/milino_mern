import React, {FC} from 'react';
import s from "../Components/Sidebar/sidebar.module.sass";
import {getMaterialStrings} from "../helpers/helpers";
import {RoomMaterialsFormType} from "../helpers/roomTypes";

export type MaterialStringsType = {
    categoryString: string,
    doorString: string,
    boxString: string,
    drawerString: string,
    leatherString: string,
    rod:string
}

const Materials: FC<{ materials: RoomMaterialsFormType }> = ({materials}) => {
    const materialStrings = getMaterialStrings(materials);
    const {drawerString, doorString, boxString, leatherString, categoryString, rod} = materialStrings

    return (
        <div className={s.materials}>
            <h4 className={s.choose}>Materials you choose:</h4>
            {categoryString ? <MaterialItem label="Category" value={categoryString}/> : null}
            {doorString ? <MaterialItem label="Door" value={doorString}/> : null}
            {boxString ? <MaterialItem label="Box Material" value={boxString}/> : null}
            {drawerString ? <MaterialItem label="Drawer" value={drawerString}/> : null}
            {leatherString ? <MaterialItem label="Leather" value={leatherString}/> : null}
            {rod ? <MaterialItem label="Hanging rods" value={rod}/> : null}
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