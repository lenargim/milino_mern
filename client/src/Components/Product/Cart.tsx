import React, {FC} from 'react';
import {getCartData, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import s from './../OrderForm/Sidebar/sidebar.module.sass'
import SidebarCart from "../OrderForm/Sidebar/SidebarCart";

export type changeAmountType = 'plus' | 'minus'

const Cart:FC = () => {
    const dispatch = useAppDispatch()
    const cartState = useAppSelector(state => state.general.cart)
    const {cart, total} = getCartData(cartState,dispatch);
    return (
        <div className={[s.sidebar, s.product].join(' ')}>
            <div className={s.sidebarContent}>
                {total
                    ? <SidebarCart cart={cart} total={total}/>
                    : <div className={s.cartEmpty}>
                        <span>Your cart is empty</span>
                    </div>
                }
            </div>
        </div>
    );
};

export default Cart;


