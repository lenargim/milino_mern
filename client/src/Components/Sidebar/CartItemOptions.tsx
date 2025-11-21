import React, {FC} from 'react';
import CartItemProduct from "./CartItemProduct";
import CartItemCustom from "./CartItemCustom";
import {CartItemFrontType} from "../../helpers/cartTypes";
import Dimensions from "../../common/Dimensions";


const CartItemOptions: FC<{ item: CartItemFrontType }> = ({item}) => {
    const {product_type} = item;

    return (
        <div>
            <Dimensions item={item}/>
            {product_type === 'custom'
                ? <CartItemCustom product={item}/>
                : <CartItemProduct product={item}/>
            }
        </div>
    )
};

export default CartItemOptions;