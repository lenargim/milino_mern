import React, {FC} from "react";
import {Text, View} from '@react-pdf/renderer';
import {s} from '../PDF'
import {CartItemType} from "../../../api/apiFunctions";
import Dimentions from "./Dimentions";

const CartItemGlassDoorExtra: FC<{ product: CartItemType, dimentions: string }> = ({product, dimentions}) => {
    const {glass_door, material} = product
    if (!glass_door) return null;
    return (
        <>
            <Dimentions dimentions={dimentions}/>
            {material &&
            <Text style={s.itemOption}>
              <Text>Material:</Text><Text>{material}</Text>
            </Text>}
            {glass_door[0] &&
            <Text style={s.itemOption}>
              <Text>Door Profile: </Text><Text>{glass_door[0]}</Text>
            </Text>
            }
            {glass_door[1] &&
            <Text style={s.itemOption}>
              <Text>Door Type: </Text><Text>{glass_door[1]}</Text>
            </Text>
            }
            {glass_door[2] &&
            <Text style={s.itemOption}>
              <Text>Door Color: </Text><Text>{glass_door[2]}</Text>
            </Text>
            }
        </>
    )
}

export default CartItemGlassDoorExtra;