import React, {FC, useEffect} from 'react';
import s from "../Sidebar/sidebar.module.sass";
import {getCartTotal, textToLink, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import RoomCartItem from "./RoomCartItem";
import {clearCart, fetchCart, removeAllFromCart, RoomsState} from "../../store/reducers/roomSlice";
import {MiniCart} from "../../common/MiniCart";
import {NavLink, useParams} from "react-router-dom";
import {PurchaseOrdersState} from "../../store/reducers/purchaseOrderSlice";
import {useAdmin} from "../../helpers/AdminContext";

const RoomSidebar: FC = () => {
    const {room_name, purchase_order_name} = useParams();
    const dispatch = useAppDispatch()
    const {cart_items, rooms} = useAppSelector<RoomsState>(state => state.room)
    const {purchase_orders} = useAppSelector<PurchaseOrdersState>(state => state.purchase_order)
    const is_admin = useAdmin();
    const total = getCartTotal(cart_items);
    const po = purchase_orders.find(po => textToLink(po.name) === purchase_order_name)
    const room = rooms.find(room => textToLink(room.name) === room_name);
    useEffect(() => {
        if (!room?._id) return;
        dispatch(fetchCart({_id: room?._id}));

        return () => {
            dispatch(clearCart())
        }
    }, [room?._id, dispatch]);

    if (!room || !po || !cart_items?.length) return null;
    const show_cart_link = !is_admin && !po.is_archived
    return (
        <aside className={s.sidebar}>
            <div className={s.sidebarContent}>
                <div className={s.sidebarList}>
                    <div className={s.sidebarTitle}>
                        <h3>Cart<span>{cart_items.length}</span></h3>
                        {!is_admin && <button onClick={() => dispatch(removeAllFromCart({room_id: room._id}))}>Remove
                            all</button>}
                    </div>
                    {cart_items.map((item, key) => {
                        return (
                            <RoomCartItem item={item} key={key}/>
                        )
                    })}
                </div>
                {show_cart_link ?
                    <NavLink
                        to={`/profile/purchase/${textToLink(purchase_order_name)}/rooms/${textToLink(room.name)}/checkout`}
                        className={s.total}>
                        <MiniCart length={cart_items.length}/>
                        <div>Total: {total}$</div>
                    </NavLink> :
                    <div className={s.total}>
                        <span></span>
                        <div>Total: {total}$</div>
                    </div>
                }
            </div>
        </aside>
    );
};

export default RoomSidebar;
