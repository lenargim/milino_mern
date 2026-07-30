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
import {CustomTypes} from "../../helpers/productTypes";
import CartItemDrawerRO from "./CartItemDrawerRO";
import CartItemPanelAccessories from "./CartItemPanelAccessories";
import CartItemLED from "./CartItemLED";
import {getCustomPartShelvesNameByIndex} from "../../helpers/helpers";
import {Text, View} from "@react-pdf/renderer";
import CartItemShelves from "./CartItemShelves";

const CartItemCustom: FC<{ product: CartItemFrontType }> = ({product}) => {
    const {subcategory, product_id, custom, width, led, glass} = product;

    // const {
    //     accessories,
    //     standard_doors,
    //     standard_panels,
    //     material,
    //     rta_closet,
    //     groove,
    //     drawer_accessories,
    //     panel_accessories,
    //     shelves,
    //     painted_molding
    // } = custom;

    switch (subcategory as CustomTypes) {
        case 'glass-door':
            return <CartItemGlassDoorExtra product={product}/>
        case 'glass-shelf':
            return <CartItemShelfExtra glass={glass}/>
        case 'pvc':
            return <CartItemPVCExtra product={product}/>
        case 'door-accessories':
            if (!custom?.accessories) return null;
            return <CartItemDoorExtra accessories={custom?.accessories}/>
        case 'led-accessories':
            if (!custom?.accessories?.led) return null;
            return <CartItemLEDExtra led={custom?.accessories.led}/>
        case 'standard-doors':
        case 'standard-glass-doors':
            if (!custom?.standard_doors?.length) return null;
            return <CartItemDoor standard_doors={custom?.standard_doors}/>
        case 'standard-panel':
            if (!custom?.standard_panels) return null;
            return <CartItemPanel standard_panels={custom?.standard_panels} prod_id={product_id}/>
        case 'rta-closets':
            if (!custom?.rta_closet?.length) return null
            return <CartItemRTAClosetCustom rta_closet={custom?.rta_closet}/>
        case 'drawer-inserts':
            if (!custom?.drawer_accessories?.inserts) return null;
            return <CartItemDrawerInserts inserts={custom?.drawer_accessories.inserts} width={width}/>
        case "ro_drawer":
            if (!custom?.drawer_accessories?.drawer_ro) return null;
            return <CartItemDrawerRO drawer_ro={custom?.drawer_accessories.drawer_ro} width={width}/>
        default:
            return <>
                {custom?.material &&
                    <div className={s.itemOption}>
                        <span>Material:</span>
                        <span>{custom?.material}</span>
                    </div>}
                {custom?.groove &&
                    <>
                        <div className={s.itemOption}>
                            <span>Groove Styles:</span>
                            <span>{custom?.groove.style}</span>
                        </div>
                        <div className={s.itemOption}>
                            <span>Clear Coat:</span>
                            <span>{custom?.groove.clear_coat ? 'Yes' : 'No'}</span>
                        </div>
                    </>}
                {led && <CartItemLED led={led}/>}
                {custom?.shelves && <CartItemShelves shelves={custom.shelves} />}
                <CartItemPanelAccessories panel_accessories={custom?.panel_accessories}/>
                {custom?.painted_molding &&
                    <div className={s.itemOption}>
                        <span>Quantity: {custom?.painted_molding}</span>
                    </div>
                }
            </>
    }
}

export default CartItemCustom;