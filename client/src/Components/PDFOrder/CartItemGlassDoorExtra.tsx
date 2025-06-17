import React, {FC} from "react";
import {Text} from '@react-pdf/renderer';
import {s} from './PDFOrder'
import {CartItemFrontType} from "../../helpers/cartTypes";
import Dimensions from "./Dimentions";

const CartItemGlassDoorExtra: FC<{ product: CartItemFrontType, dimensions: string }> = ({product, dimensions}) => {
    const {glass: glassObj, custom} = product;
    if (!glassObj || !custom) return null;
    const {door: glass_door} = glassObj;
    if (!glass_door) return null;
    const {material} = custom
    return (
        <>
            <Dimensions dimensions={dimensions}/>
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