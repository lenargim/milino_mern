import React, {FC} from 'react';
import CheckoutCartItem from "./CheckoutCartItem";
import s from './checkout.module.sass'
import {CartItemType} from "../../api/apiFunctions";
import {MaybeUndefined} from "../../helpers/productTypes";

const CheckoutCart: FC<{ cart: CartItemType[], total:number, room_id: MaybeUndefined<string> }> = ({cart, total, room_id}) => {
    return (
        <div className={s.cart}>
            <h2 className={s.cartTitle}>Cart</h2>
            <div className={s.table}>
                <div className={s.header}>
                    <span>Image</span><span>Description</span><span>Price</span><span>Qty</span><span>Product total</span>
                </div>
                {cart.map(el => <CheckoutCartItem key={el._id} el={el} room_id={room_id}/>)}
            </div>
            <div className={s.total}>Total price:{total}$</div>
        </div>
    );
};

export default CheckoutCart;
