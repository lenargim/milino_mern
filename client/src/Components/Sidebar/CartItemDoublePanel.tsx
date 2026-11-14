import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {DrawerROType} from "../CustomPart/CustomPart";
import {CustomPartDoublePanel, CustomPartDoublePanelType, getValueByKey} from "../../helpers/Enums";
import {MaybeUndefined} from "../../helpers/productTypes";

const CartItemDoublePanel: FC<{ double_panel:number }> = ({double_panel}) => {
    const val = getValueByKey(CustomPartDoublePanel, double_panel)
    if (!val) return null;
    return (
        <div className={s.blocks}>
            <div className={[s.itemOption].join(' ')}>
                <span>Panel Type:</span>
                <span>{val}</span>
            </div>
        </div>
    );
};

export default CartItemDoublePanel;