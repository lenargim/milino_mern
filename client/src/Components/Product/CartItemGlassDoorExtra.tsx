import React, {FC} from 'react';
import {glassDoorExtraType} from "../../store/reducers/generalSlice";
import s from "../OrderForm/Sidebar/sidebar.module.sass";
import {CartItemType} from "../../api/apiFunctions";

const CartItemGlassDoorExtra: FC<{ product: CartItemType }> = ({product}) => {
    const {glass_door} = product
    if (!glass_door) return null;
    return (
        <>
            {glass_door[0] &&
              <div className={s.itemOption}>
                <span>Door Profile: </span>
                <span>{glass_door[0]}</span>
              </div>
            }
            {glass_door[1] &&
              <div className={s.itemOption}>
                <span>Door Type: </span>
                <span>{glass_door[1]}</span>
              </div>
            }
            {glass_door[2] &&
              <div className={s.itemOption}>
                <span>Door Color: </span>
                <span>{glass_door[2]}</span>
              </div>

            }
        </>
    )
}

export default CartItemGlassDoorExtra;