import React, {FC} from 'react';
import s from "../OrderForm/Sidebar/sidebar.module.sass";
import {Dimentions} from "./CartItem";
import {CartItemType} from "../../api/apiFunctions";
import CartItemDoorExtra from "./CartItemDoorExtra";
import CartItemPVCExtra from "./CartItemPVCExtra";
import CartItemGlassDoorExtra from "./CartItemGlassDoorExtra";
import CartItemShelfExtra from "./CartItemShelfExtra";
import CartItemLEDExtra from "./CartItemLEDExtra";
import CartItemDoor from "./CartItemDoor";

const CartItemCustom: FC<{ product: CartItemType }> = ({product}) => {
    const {material, width, height, depth, glass_door, glass_shelf, door_accessories, subcategory, led_accessories, standard_door } = product;

    switch (subcategory) {
        case 'glass-door':
            return <CartItemGlassDoorExtra product={product} />
        case 'glass-shelf':
            return <CartItemShelfExtra product={product} />
        case 'pvc':
            return <CartItemPVCExtra productExtra={product} />
        case 'door-accessories':
            return <CartItemDoorExtra accessories={door_accessories} />
        case 'led-accessories':
            return <CartItemLEDExtra accessories={led_accessories} />
        case 'standard-door':
        case 'standard-glass-door':
            return <CartItemDoor standard_door={standard_door} />
        default:
            return <>
                <Dimentions width={width} depth={depth} height={height}/>
                {material &&
                  <div className={s.itemOption}>
                    <span>Material:</span>
                    <span>{material}</span>
                  </div>}
            </>
    }
}

export default CartItemCustom;