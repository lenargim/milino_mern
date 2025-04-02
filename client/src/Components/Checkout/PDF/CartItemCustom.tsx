import React, {FC} from "react";
import Dimentions from "./Dimentions";
import {Text, View} from "@react-pdf/renderer";
import {CartItemType} from "../../../api/apiFunctions";
import CartItemGlassDoorExtra from "./CartItemGlassDoorExtra";
import CartItemShelfExtra from "./CartItemShelfExtra";
import CartItemPVCExtra from "./CartItemPVCExtra";
import CartItemDoorExtra from "./CartItemDoorExtra";
import CartItemLEDExtra from "./CartItemLEDExtra";
import CartItemDoor from "./CartItemDoor";
import CartItemPanel from "./CartItemPanel";
import {s} from '../PDF'


const CartItemCustom: FC<{ product: CartItemType, dimentions: string }> = ({product, dimentions}) => {
    const {material, door_accessories, subcategory, led_accessories, standard_door, standard_panels, product_id} = product;
    switch (subcategory) {
        case 'glass-door':
            return <View><CartItemGlassDoorExtra product={product} dimentions={dimentions}/></View>
        case 'glass-shelf':
            return <View><CartItemShelfExtra product={product} dimentions={dimentions}/></View>
        case 'pvc':
            return <View><CartItemPVCExtra product={product}/></View>
        case 'door-accessories':
            return <View><CartItemDoorExtra accessories={door_accessories}/></View>
        case 'led-accessories':
            return <View><CartItemLEDExtra accessories={led_accessories}/></View>
        case 'standard-door':
        case 'standard-glass-door':
            return <View><CartItemDoor standard_door={standard_door}/></View>
        case 'standard-panel':
            return <View><CartItemPanel standard_panels={standard_panels} prod_id={product_id}/></View>
        default:
            return <View>
                <Dimentions dimentions={dimentions}/>
                {material &&
                <Text style={s.itemOption}>
                  <Text>Material: {material}</Text>
                </Text>
                }
            </View>
    }
}

export default CartItemCustom