import React, {FC} from 'react';
import CartItemProduct from "./CartItemProduct";
import CartItemCustom from "./CartItemCustom";
import {CartItemFrontType} from "../../helpers/cartTypes";
import Dimensions from "../../common/Dimensions";


const CartItemOptions: FC<{ item: CartItemFrontType }> = ({item}) => {
    const {
        product_type,
        width, height, depth,
        isStandard
    } = item;

    return (
        <div>
            <Dimensions width={width} height={height} depth={depth} isStandard={isStandard.dimensions}/>
            {product_type === 'custom'
                ? <CartItemCustom product={item}/>
                : <CartItemProduct product={item}/>
            }
        </div>
    )
};

export default CartItemOptions;