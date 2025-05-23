import React, {FC} from 'react';
import s from "../Sidebar/sidebar.module.sass";
import {useParams} from "react-router-dom";
import {getCartTotal, useAppSelector} from "../../helpers/helpers";
import RoomCartItem from "./RoomCartItem";
import {CartState} from "../../store/reducers/cartSlice";

const RoomSidebar: FC = () => {
    const {roomId} = useParams();
    const {cart_items} = useAppSelector<CartState>(state => state.cart)
    if (!roomId || !cart_items || cart_items.length) return null;
    const total = getCartTotal(cart_items);
    return (
        <aside className={s.sidebar}>
            <div className={s.sidebarContent}>
                <div className={s.sidebarList}>
                    <h3>Cart</h3>
                    {cart_items.map((item, key) => {
                        return (
                            <RoomCartItem room={roomId} item={item} key={key}/>
                        )
                    })}
                </div>
                <div className={s.total}>Total: {total}$</div>
            </div>
        </aside>
    );
};

export default RoomSidebar;