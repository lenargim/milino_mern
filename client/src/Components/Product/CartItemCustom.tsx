import React, {FC} from 'react';
import s from "../OrderForm/Sidebar/sidebar.module.sass";
import {CartItemType} from "../../api/apiFunctions";
import CartItemDoorExtra from "./CartItemDoorExtra";
import CartItemPVCExtra from "./CartItemPVCExtra";
import CartItemGlassDoorExtra from "./CartItemGlassDoorExtra";
import CartItemShelfExtra from "./CartItemShelfExtra";
import CartItemLEDExtra from "./CartItemLEDExtra";
import CartItemDoor from "./CartItemDoor";
import Dimentions from "../../common/Dimentions";
import CartItemPanel from "./CartItemPanel";

const CartItemCustom: FC<{ product: CartItemType, dimentions:string }> = ({product, dimentions}) => {
    const {material, door_accessories, subcategory, led_accessories, standard_door, standard_panels, _id, product_id} = product;
    switch (subcategory) {
        case 'glass-door':
            return <CartItemGlassDoorExtra product={product} dimentions={dimentions}/>
        case 'glass-shelf':
            return <CartItemShelfExtra product={product} dimentions={dimentions}/>
        case 'pvc':
            return <CartItemPVCExtra productExtra={product}/>
        case 'door-accessories':
            return <CartItemDoorExtra accessories={door_accessories}/>
        case 'led-accessories':
            return <CartItemLEDExtra accessories={led_accessories}/>
        case 'standard-door':
        case 'standard-glass-door':
            return <CartItemDoor standard_door={standard_door}/>
        case 'standard-panel':
            return <CartItemPanel standard_panels={standard_panels} prod_id={product_id} />

        default:
            return <>
                <Dimentions dimentions={dimentions}/>
                {material &&
                  <div className={s.itemOption}>
                    <span>Material:</span>
                    <span>{material}</span>
                  </div>}
            </>
    }
}

export default CartItemCustom;