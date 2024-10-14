import React, {FC} from "react";
import CartItem from "../../Product/CartItem";
import {CartItemType} from "../../../api/apiFunctions";

const SidebarCart: FC<{ cart: CartItemType[], total:number }> = ({cart, total}) => {
    return (
        <>
            <h3>Cart {total}$</h3>
            {cart.map((item, key) => {
                return (
                    <CartItem item={item} key={key}/>
                )
            })}
        </>
    )
}

export default SidebarCart