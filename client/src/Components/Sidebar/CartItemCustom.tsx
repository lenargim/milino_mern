import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import CartItemDoorExtra from "./CartItemDoorExtra";
import CartItemPVCExtra from "./CartItemPVCExtra";
import CartItemGlassDoorExtra from "./CartItemGlassDoorExtra";
import CartItemShelfExtra from "./CartItemShelfExtra";
import CartItemLEDExtra from "./CartItemLEDExtra";
import CartItemDoor from "./CartItemDoor";
import CartItemPanel from "./CartItemPanel";
import Dimentions from "../../common/Dimentions";
import {CartItemFrontType} from "../../helpers/cartTypes";
import CartItemRTAClosetCustom from "./CartItemRTAClosetCustom";

const CartItemCustom: FC<{ product: CartItemFrontType, dimensions: string }> = ({product, dimensions}) => {
    const {subcategory, product_id, custom} = product;
    if (!custom) return null;
    const {accessories, standard_doors, standard_panels, material, rta_closet, groove} = custom;
    console.log(groove)
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
        case 'standard-doors':
        case 'standard-glass-doors':
            if (!standard_doors) return null;
            return <CartItemDoor standard_doors={standard_doors}/>
        case 'standard-panel':
            if (!standard_panels) return null;
            return <CartItemPanel standard_panels={standard_panels} prod_id={product_id}/>
        case 'rta-closets':
            if (!rta_closet) return null
            return <CartItemRTAClosetCustom rta_closet={rta_closet}/>
        default:
            return <>
                <Dimentions dimensions={dimensions}/>
                {material &&
                <div className={s.itemOption}>
                  <span>Material:</span>
                  <span>{material}</span>
                </div>}
                {
                    groove &&
                    <>
                      <div className={s.itemOption}>
                        <span>Groove Styles:</span>
                        <span>{groove.style}</span>
                      </div>
                      <div className={s.itemOption}>
                        <span>Clear Coat:</span>
                        <span>{groove.clear_coat ? 'Yes' : 'No'}</span>
                      </div>
                    </>
                }
            </>
    }
}

export default CartItemCustom;