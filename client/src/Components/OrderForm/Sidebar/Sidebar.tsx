import React, {FC} from 'react';
import s from './sidebar.module.sass'
import {getCartData, useAppDispatch, useAppSelector} from "../../../helpers/helpers";
import {MaterialsFormType} from "../../../common/MaterialsForm";
import CartItem from "../../Product/CartItem";


export type changeAmountType = 'plus' | 'minus';

const Sidebar: FC = () => {
    const dispatch = useAppDispatch();
    const cartState = useAppSelector(state => state.general.cart)
    const {cart, total, cartLength} = getCartData(cartState, dispatch);
    return (
        <aside className={s.sidebar}>
            <div className={s.sidebarContent}>
                {cartLength ?
                    <>
                        <div className={s.sidebarList}>
                            <h3>Cart</h3>
                            {cart.map((item, key) => {
                                return (
                                    <CartItem item={item} key={key}/>
                                )
                            })}
                        </div>
                        <div className={s.total}>Total: {total}$</div>
                    </>
                    : null}
            </div>
        </aside>
    );
};

export default Sidebar;


