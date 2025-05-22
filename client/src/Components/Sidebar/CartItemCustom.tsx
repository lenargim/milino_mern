import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {CartItemFrontType} from "../../api/apiFunctions";
import CartItemDoorExtra from "./CartItemDoorExtra";
import CartItemPVCExtra from "./CartItemPVCExtra";
import CartItemGlassDoorExtra from "./CartItemGlassDoorExtra";
import CartItemShelfExtra from "./CartItemShelfExtra";
import CartItemLEDExtra from "./CartItemLEDExtra";
import CartItemDoor from "./CartItemDoor";
import CartItemPanel from "./CartItemPanel";
import Dimentions from "../../common/Dimentions";

const CartItemCustom: FC<{ product: CartItemFrontType, dimensions:string }> = ({product, dimensions}) => {
    const {subcategory, product_id, custom} = product;
    if (!custom) return null;
    const {accessories, standard_door, standard_panels, material} = custom;
    switch (subcategory) {
        case 'glass-door':
            return <CartItemGlassDoorExtra product={product} dimensions={dimensions}/>
        case 'glass-shelf':
            return <CartItemShelfExtra product={product} dimensions={dimensions}/>
        case 'pvc':
            return <CartItemPVCExtra product={product}/>
        case 'door-accessories':
            if (!accessories) return null;
            return <CartItemDoorExtra accessories={accessories}/>
        case 'led-accessories':
            if (!accessories) return null;
            return <CartItemLEDExtra accessories={accessories}/>
        case 'standard-door':
        case 'standard-glass-door':
            if (!standard_door) return null;
            return <CartItemDoor standard_door={standard_door}/>
        case 'standard-panel':
            if (!standard_panels) return null;
            return <CartItemPanel standard_panels={standard_panels} prod_id={product_id} />

        default:
            return <>
                <Dimentions dimensions={dimensions}/>
                {material &&
                  <div className={s.itemOption}>
                    <span>Material:</span>
                    <span>{material}</span>
                  </div>}
            </>
    }
}

export default CartItemCustom;