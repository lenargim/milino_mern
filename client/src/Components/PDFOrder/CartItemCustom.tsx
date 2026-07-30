import React, {FC} from "react";
import {Text, View} from "@react-pdf/renderer";
import CartItemGlassDoorExtra from "./CartItemGlassDoorExtra";
import CartItemShelfExtra from "./CartItemShelfExtra";
import CartItemPVCExtra from "./CartItemPVCExtra";
import CartItemDoorExtra from "./CartItemDoorExtra";
import CartItemLEDExtra from "./CartItemLEDExtra";
import CartItemDoor from "./CartItemDoor";
import CartItemPanel from "./CartItemPanel";
import {s} from './PDFOrder'
import {CartItemFrontType} from "../../helpers/cartTypes";
import CartItemRTAClosetCustom from "./CartItemRTAClosetCustom";
import CartItemDrawerInserts from "./CartItemDrawerInserts";
import {CustomTypes} from "../../helpers/productTypes";
import CartItemDrawerRO from "./CartItemDrawerRO";
import CartItemPanelAccessories from "./CartItemPanelAccessories";
import CartItemLED from "./CartItemLED";
import {getCustomPartShelvesNameByIndex} from "../../helpers/helpers";
import CartItemShelves from "./CartItemShelves";


const CartItemCustom: FC<{ product: CartItemFrontType, }> = ({product}) => {
    const {subcategory, product_id, custom, width, glass, led} = product;
    // if (!custom) return null;
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
            return <View><CartItemGlassDoorExtra product={product}/></View>
        case 'glass-shelf':
            return <View><CartItemShelfExtra glass={glass}/></View>
        case 'pvc':
            return <View><CartItemPVCExtra product={product}/></View>
        case 'door-accessories': {
            if (!custom?.accessories) return null;
            return <View><CartItemDoorExtra accessories={custom?.accessories}/></View>
        }
        case 'led-accessories': {
            if (!custom?.accessories || !custom?.accessories.led) return null;
            return <View><CartItemLEDExtra led={custom?.accessories.led}/></View>
        }
        case 'standard-doors':
        case 'standard-glass-doors':
            if (!custom?.standard_doors?.length) return null;
            return <View><CartItemDoor standard_doors={custom?.standard_doors}/></View>
        case 'standard-panel':
            if (!custom?.standard_panels) return null;
            return <View><CartItemPanel standard_panels={custom?.standard_panels} prod_id={product_id}/></View>
        case 'rta-closets':
            if (!custom?.rta_closet?.length) return null
            return <View><CartItemRTAClosetCustom rta_closet={custom?.rta_closet}/></View>
        case 'drawer-inserts':
            if (!custom?.drawer_accessories?.inserts) return null;
            return <View><CartItemDrawerInserts inserts={custom?.drawer_accessories.inserts} width={width}/></View>
        case "ro_drawer":
            if (!custom?.drawer_accessories?.drawer_ro) return null;
            return <View><CartItemDrawerRO drawer_ro={custom?.drawer_accessories.drawer_ro} width={width}/></View>
        default:
            return <View>
                {custom?.material &&
                    <Text style={s.itemOption}>
                        <Text>Material: {custom?.material}</Text>
                    </Text>
                }
                {
                    custom?.groove &&
                    <View>
                        <View style={s.itemOption}>
                            <Text>Groove Styles:</Text>
                            <Text>{custom?.groove.style}</Text>
                        </View>
                        <View style={s.itemOption}>
                            <Text>Clear Coat:</Text>
                            <Text>{custom?.groove.clear_coat ? 'Yes' : 'No'}</Text>
                        </View>
                    </View>
                }
                {led && <CartItemLED led={led}/>}
                {<CartItemPanelAccessories panel_accessories={custom?.panel_accessories}/>}
                {custom?.shelves && <CartItemShelves shelves={custom.shelves} />}
                {custom?.painted_molding &&
                    <View style={s.itemOption}>
                        <Text>Quantity: {custom?.painted_molding}</Text>
                    </View>
                }
            </View>
    }
}

export default CartItemCustom