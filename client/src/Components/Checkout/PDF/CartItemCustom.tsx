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


const CartItemCustom: FC<{ product: CartItemType }> = ({product}) => {
    const {material, width, height, depth, door_accessories, subcategory, led_accessories, standard_door} = product;
    switch (subcategory) {
        case 'glass-door':
            return <View><CartItemGlassDoorExtra product={product}/></View>
        case 'glass-shelf':
            return <View><CartItemShelfExtra product={product}/></View>
        case 'pvc':
            return <View><CartItemPVCExtra product={product}/></View>
        case 'door-accessories':
            return <View><CartItemDoorExtra accessories={door_accessories}/></View>
        case 'led-accessories':
            return <View><CartItemLEDExtra accessories={led_accessories}/></View>
        case 'standard-door':
        case 'standard-glass-door':
            return <View><CartItemDoor standard_door={standard_door}/></View>
        default:
            return <View>
                <Dimentions width={width} depth={depth} height={height}/>
                {material &&
                  <View>
                    <Text>Material: {material}</Text>
                  </View>
                }
            </View>
    }
}

export default CartItemCustom