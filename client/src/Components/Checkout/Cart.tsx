import React, {FC} from 'react';
import s from './../OrderForm/Sidebar/sidebar.module.sass'
import CartItem from "../Product/CartItem";
import {CartItemFrontType} from "../../api/apiFunctions";

const Cart: FC<{ cart: CartItemFrontType[], cartTotal: number }> = ({cart, cartTotal}) => {
    return (
        <div className={[s.sidebar].join(' ')}>
            <div className={s.sidebarContent}>
                <div>
                    <h3>Cart</h3>
                    {cart.map((el, index) => <CartItem isCheckout={true} key={index} item={el}/>)}
                </div>
            </div>
        </div>

    );
};

export default Cart;
