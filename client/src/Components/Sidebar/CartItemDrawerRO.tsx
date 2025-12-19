import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {DrawerROType} from "../CustomPart/CustomPart";

const CartItemDrawerRO: FC<{ drawer_ro: DrawerROType, width: number }> = ({drawer_ro, width}) => {
    return (
        <div className={s.blocks}>
            <div className={[s.itemOption].join(' ')}>
                <span>Width:</span>
                <span>{width}"</span>
            </div>
            <div className={[s.itemOption].join(' ')}>
                <span>Type:</span>
                <span>{drawer_ro}</span>
            </div>
        </div>
    );
};

export default CartItemDrawerRO;