import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import CartItemDoorExtra from "./CartItemDoorExtra";
import CartItemPVCExtra from "./CartItemPVCExtra";
import CartItemGlassDoorExtra from "./CartItemGlassDoorExtra";
import CartItemShelfExtra from "./CartItemShelfExtra";
import CartItemLEDExtra from "./CartItemLEDExtra";
import CartItemDoor from "./CartItemDoor";
import CartItemPanel from "./CartItemPanel";
import {CartItemFrontType} from "../../helpers/cartTypes";
import CartItemRTAClosetCustom from "./CartItemRTAClosetCustom";
import CartItemDrawerInserts from "./CartItemDrawerInserts";

const CartItemCustom: FC<{ product: CartItemFrontType}> = ({product}) => {
    const {subcategory, product_id, custom, width} = product;
    if (!custom) return null;
    const {accessories, standard_doors, standard_panels, material, rta_closet, groove, drawer_inserts} = custom;
    switch (subcategory) {
        case 'glass-door':
            return <CartItemGlassDoorExtra product={product}/>
        case 'glass-shelf':
            return <CartItemShelfExtra product={product}/>
        case 'pvc':
            return <CartItemPVCExtra product={product}/>
        case 'door-accessories':
            if (!accessories) return null;
            return <CartItemDoorExtra accessories={accessories}/>
        case 'led-accessories':
            if (!accessories || !accessories.led) return null;
            return <CartItemLEDExtra led={accessories.led}/>
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
        case 'drawer-inserts':
            if (!drawer_inserts) return null;
            return <CartItemDrawerInserts drawer_inserts={drawer_inserts} width={width}/>

        default:
            return <>
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