import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {CartItemFrontType, GlassAPIType} from "../../helpers/cartTypes";
import {MaybeUndefined} from "../../helpers/productTypes";

const CartItemShelfExtra: FC<{ glass: MaybeUndefined<GlassAPIType> }> = ({glass}) => {
    if (!glass?.shelf) return null;

    return (
        <div className={s.itemOption}>
            <span>Glass Color: {glass.shelf}</span>
        </div>
    );
};

export default CartItemShelfExtra