import React, {FC} from "react";
import {Text, View} from '@react-pdf/renderer';
import {s} from '../PDF'
import {CartItemType} from "../../../api/apiFunctions";

const CartItemGlassDoorExtra: FC<{ product: CartItemType }> = ({product}) => {
    const {glass_door} = product
    if (!glass_door) return null;

    return (
        <>
            {glass_door[0] &&
              <View style={s.itemOption}>
                <Text>Door Profile: </Text>
                <Text>{glass_door[0]}</Text>
              </View>
            }
            {glass_door[1] &&
              <View style={s.itemOption}>
                <Text>Door Type: </Text>
                <Text>{glass_door[1]}</Text>
              </View>
            }
            {glass_door[2] &&
              <View style={s.itemOption}>
                <Text>Door Color: </Text>
                <Text>{glass_door[2]}</Text>
              </View>

            }
        </>
    )
}

export default CartItemGlassDoorExtra;