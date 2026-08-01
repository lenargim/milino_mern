import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {CartItemFrontType} from "../../helpers/cartTypes";

const CartItemGlassDoorExtra: FC<{ product: CartItemFrontType }> = ({product}) => {
    const {glass, custom} = product;
    const door = glass?.door
    return (
        <>
            {custom?.material &&
                <div className={s.itemOption}>
                    <span>Material:</span>
                    <span>{custom?.material}</span>
                </div>}
            {door &&
                <>
                    {door[0] &&
                        <div className={s.itemOption}>
                            <span>Door Profile: </span>
                            <span>{door[0]}</span>
                        </div>}
                    {door[1] &&
                        <div className={s.itemOption}>
                            <span>Door Type: </span>
                            <span>{door[1]}</span>
                        </div>}
                    {door[2] &&
                        <div className={s.itemOption}>
                            <span>Door Color: </span>
                            <span>{door[2]}</span>
                        </div>
                    }
                </>
            }
        </>
    )
}

export default CartItemGlassDoorExtra;