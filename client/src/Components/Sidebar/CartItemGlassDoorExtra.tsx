import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import Dimentions from "../../common/Dimentions";
import {CartItemFrontType} from "../../helpers/cartTypes";

const CartItemGlassDoorExtra: FC<{ product: CartItemFrontType, dimensions:string }> = ({product, dimensions}) => {
    const {glass: glassObj, custom} = product;
    if (!glassObj || !custom) return null;
    const {door: glass_door} = glassObj;
    if (!glass_door) return null;
    const {material} = custom
    return (
        <>
            <Dimentions dimensions={dimensions}/>
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