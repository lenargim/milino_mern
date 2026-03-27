import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {PanelAccessoriesTypeAPI} from "../../helpers/cartTypes";
import {MaybeUndefined} from "../../helpers/productTypes";

const CartItemPanelAccessories: FC<{ panel_accessories: MaybeUndefined<PanelAccessoriesTypeAPI> }> = ({panel_accessories}) => {
    if (!panel_accessories) return null;
    const {hinges_or_holes, cutout} = panel_accessories;
    return (
        <>
            {hinges_or_holes && <>
              <div className={s.bold}>Add {hinges_or_holes.type}:</div>
              <div className={s.offset}>
                <div className={s.itemOption}>
                  <span>From Top:</span>
                  <span>{hinges_or_holes.top}"</span>
                </div>
                <div className={s.itemOption}>
                  <span>From Bottom:</span>
                  <span>{hinges_or_holes.bottom}"</span>
                </div>
              </div>
            </>
            }
            {cutout && <>
              <div className={s.bold}>Add Cutout:</div>
              <div className={s.offset}>
                <div className={s.itemOption}>
                  <span>Width:</span>
                  <span>{cutout.width}"</span>
                </div>
                <div className={s.itemOption}>
                  <span>Height:</span>
                  <span>{cutout.height}"</span>
                </div>
              </div>
            </>
            }
        </>
    )
}

export default CartItemPanelAccessories;