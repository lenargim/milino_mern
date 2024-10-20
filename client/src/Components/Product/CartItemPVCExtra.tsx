import React, {FC} from 'react';
import s from "../OrderForm/Sidebar/sidebar.module.sass";
import {getFraction} from "../../helpers/helpers";
import {CartItemType} from "../../api/apiFunctions";

const CartItemPvcExtra:FC<{productExtra: CartItemType}> = ({productExtra}) => {
    const {material, width} = productExtra;

    return (
        <>
            {<div className={s.itemOption}>
              <span>Length:</span>
              <span>{getFraction(width)} Ft</span>
            </div>}
            {material &&
              <div className={s.itemOption}>
                <span>Material:</span>
                <span>{material}</span>
              </div>}
        </>

    )
};

export default CartItemPvcExtra;