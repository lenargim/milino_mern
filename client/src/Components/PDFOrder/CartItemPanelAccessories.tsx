import React, {FC} from 'react';
import {s} from './PDFOrder'
import {PanelAccessoriesTypeAPI} from "../../helpers/cartTypes";
import {MaybeUndefined} from "../../helpers/productTypes";
import {Text, View} from "@react-pdf/renderer";

const CartItemPanelAccessories: FC<{ panel_accessories: MaybeUndefined<PanelAccessoriesTypeAPI> }> = ({panel_accessories}) => {
    if (!panel_accessories) return null;
    const {hinges_or_holes, cutout} = panel_accessories;
    return (
        <View>
            {hinges_or_holes && <>
              <View><Text style={s.bold}>Add {hinges_or_holes.type}:</Text></View>
              <View style={s.offset}>
                <View style={s.itemOption}>
                  <Text>From Top:</Text>
                  <Text>{hinges_or_holes.top}"</Text>
                </View>
                <View style={s.itemOption}>
                  <Text>From Bottom:</Text>
                  <Text>{hinges_or_holes.bottom}"</Text>
                </View>
              </View>
            </>
            }
            {cutout && <>
              <View><Text style={s.bold}>Add Cutout:</Text></View>
              <View style={s.offset}>
                <View style={s.itemOption}>
                  <Text>Width:</Text>
                  <Text>{cutout.width}"</Text>
                </View>
                <View style={s.itemOption}>
                  <Text>Height:</Text>
                  <Text>{cutout.height}"</Text>
                </View>
              </View>
            </>
            }
        </View>
    )
}
export default CartItemPanelAccessories;