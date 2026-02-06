import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {DrawerAccessoriesType, DrawerInserts} from "../CustomPart/CustomPart";

const CartItemDrawerInserts: FC<{ inserts: DrawerInserts, width: number }> = ({inserts, width}) => {
    const {box_type, color, insert_type} = inserts;
    const letter:string = insert_type ? ` (${insert_type})` : '';
    return (
        <div className={s.blocks}>
            <div className={[s.itemOption].join(' ')}>
                <span>Width:</span>
                <span>{width}"</span>
            </div>
            <div className={[s.itemOption].join(' ')}>
                <span>Drawer Type:</span>
                <span>{`${box_type}${letter}. ${color}`}</span>
            </div>
        </div>
    );
};

export default CartItemDrawerInserts;