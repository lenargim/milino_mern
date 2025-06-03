import React, {FC} from 'react';
import s from "../Sidebar/sidebar.module.sass";
import {getCartTotal, textToLink, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import RoomCartItem from "./RoomCartItem";
import {removeAllFromCart, RoomsState} from "../../store/reducers/roomSlice";
import {MiniCart} from "../../common/MiniCart";
import {NavLink} from "react-router-dom";
import {PurchaseOrdersState} from "../../store/reducers/purchaseOrderSlice";

const RoomSidebar: FC = () => {
    const dispatch = useAppDispatch()
    const {active_po} = useAppSelector<PurchaseOrdersState>(state => state.purchase_order)
    const {cart_items, rooms, active_room} = useAppSelector<RoomsState>(state => state.room)
    if (!cart_items || !cart_items.length) return null;
    const total = getCartTotal(cart_items);
    const room = rooms.find(el => el._id === cart_items[0].room_id);
    if (!room || !active_po || !active_room) return null;

    return (
        <aside className={s.sidebar}>
            <div className={s.sidebarContent}>
                <div className={s.sidebarList}>
                    <div className={s.sidebarTitle}>
                        <h3>Cart<span>{cart_items.length}</span></h3>
                        <button onClick={() => dispatch(removeAllFromCart({room_id: room._id}))}>Remove all</button>
                    </div>
                    {cart_items.map((item, key) => {
                        return (
                            <RoomCartItem item={item} key={key}/>
                        )
                    })}
                </div>
                <NavLink to={`/profile/purchase/${textToLink(active_po)}/rooms/${textToLink(room.name)}/checkout`}
                         className={s.total}>
                    <MiniCart length={cart_items.length}/>
                    <div>Total: {total}$</div>
                </NavLink>
            </div>
        </aside>
    );
};

export default RoomSidebar;
