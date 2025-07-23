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
import Dimensions from "./Dimentions";
import {CartItemFrontType} from "../../helpers/cartTypes";
import CartItemRTAClosetCustom from "./CartItemRTAClosetCustom";


const CartItemCustom: FC<{ product: CartItemFrontType, dimensions: string }> = ({product, dimensions}) => {
    const {subcategory, product_id, custom} = product;
    if (!custom) return null;
    const {accessories, standard_door, standard_panels, material, rta_closet} = custom;
    switch (subcategory) {
        case 'glass-door':
            return <View><CartItemGlassDoorExtra product={product} dimensions={dimensions}/></View>
        case 'glass-shelf':
            return <View><CartItemShelfExtra product={product} dimensions={dimensions}/></View>
        case 'pvc':
            return <View><CartItemPVCExtra product={product}/></View>
        case 'door-accessories': {
            if (!accessories) return null;
            return <View><CartItemDoorExtra accessories={accessories}/></View>
        }
        case 'led-accessories': {
            if (!accessories) return null;
            return <View><CartItemLEDExtra accessories={accessories}/></View>
        }
        case 'standard-door':
        case 'standard-glass-door':
            if (!standard_door) return null;
            return <View><CartItemDoor standard_door={standard_door}/></View>
        case 'standard-panel':
            if (!standard_panels) return null;
            return <View><CartItemPanel standard_panels={standard_panels} prod_id={product_id}/></View>
        case 'rta-closets':
            if (!rta_closet) return null
            return <View><CartItemRTAClosetCustom rta_closet={rta_closet}/></View>
        default:
            return <View>
                <Dimensions dimensions={dimensions}/>
                {material &&
                <Text style={s.itemOption}>
                  <Text>Material: {material}</Text>
                </Text>
                }
            </View>
    }
}

export default CartItemCustom