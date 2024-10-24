import React, {FC} from 'react';
import s from "../OrderForm/Sidebar/sidebar.module.sass";
import {CartItemType} from "../../api/apiFunctions";
import Dimentions from "../../common/Dimentions";

const CartItemGlassDoorExtra: FC<{ product: CartItemType, dimentions:string }> = ({product, dimentions}) => {
    const {glass_door, material} = product
    if (!glass_door) return null;
    return (
        <>
            <Dimentions dimentions={dimentions}/>
            {material &&
              <div className={s.itemOption}>
                <span>Material:</span>
                <span>{material}</span>
              </div>}
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