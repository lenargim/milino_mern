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
import CartItemDrawerInserts from "./CartItemDrawerInserts";


const CartItemCustom: FC<{ product: CartItemFrontType, dimensions: string }> = ({product, dimensions}) => {
    const {subcategory, product_id, custom, width} = product;
    if (!custom) return null;
    const {accessories, standard_doors, standard_panels, material, rta_closet, groove, drawer_inserts} = custom;
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
            if (!accessories || !accessories.led) return null;
            return <View><CartItemLEDExtra led={accessories.led}/></View>
        }
        case 'standard-doors':
        case 'standard-glass-doors':
            if (!standard_doors) return null;
            return <View><CartItemDoor standard_doors={standard_doors}/></View>
        case 'standard-panel':
            if (!standard_panels) return null;
            return <View><CartItemPanel standard_panels={standard_panels} prod_id={product_id}/></View>
        case 'rta-closets':
            if (!rta_closet) return null
            return <View><CartItemRTAClosetCustom rta_closet={rta_closet}/></View>
        case 'drawer-inserts':
            if (!drawer_inserts) return null;
            return <View><CartItemDrawerInserts drawer_inserts={drawer_inserts} width={width} /></View>
        default:
            return <View>
                <Dimensions dimensions={dimensions}/>
                {material &&
                <Text style={s.itemOption}>
                  <Text>Material: {material}</Text>
                </Text>
                }
                {
                    groove &&
                    <View>
                      <View style={s.itemOption}>
                        <Text>Groove Styles:</Text>
                        <Text>{groove.style}</Text>
                      </View>
                      <View style={s.itemOption}>
                        <Text>Clear Coat:</Text>
                        <Text>{groove.clear_coat ? 'Yes' : 'No'}</Text>
                      </View>
                    </View>
                }
            </View>
    }
}

export default CartItemCustom