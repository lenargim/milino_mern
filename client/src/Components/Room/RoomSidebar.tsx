import React, {FC, useEffect} from 'react';
import s from "../Sidebar/sidebar.module.sass";
import {getCartTotal, textToLink, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import RoomCartItem from "./RoomCartItem";
import {clearCart, fetchCart, removeAllFromCart, RoomsState} from "../../store/reducers/roomSlice";
import {MiniCart} from "../../common/MiniCart";
import {NavLink, useParams} from "react-router-dom";
import {PurchaseOrdersState} from "../../store/reducers/purchaseOrderSlice";
import {useEditor} from "../../helpers/EditorContext";
import {UserAllTypesType} from "../../api/apiTypes";
import {MaybeUndefined} from "../../helpers/productTypes";

const getCheckoutLink = (user_type: UserAllTypesType, purchase_order_name: MaybeUndefined<string>, room_name: MaybeUndefined<string>, user_id: MaybeUndefined<string>): string => {
    switch (user_type) {
        case "designer":
            return `/profile/purchase/${textToLink(purchase_order_name)}/rooms/${textToLink(room_name)}/checkout`;
        case "manager":
            if (!user_id || !purchase_order_name || !room_name) return "/";
            return `/profile/manager/edit/${user_id}/purchase/${purchase_order_name}/rooms/${room_name}/checkout`;
        case "admin":
            return '/'
    }
}

const RoomSidebar: FC = () => {
    const {room_name, purchase_order_name, user_id} = useParams();
    const dispatch = useAppDispatch()
    const {cart_items, rooms} = useAppSelector<RoomsState>(state => state.room)
    const {purchase_orders} = useAppSelector<PurchaseOrdersState>(state => state.purchase_order)
    const user_type = useEditor();
    const is_my_or_designer_project = ['designer', 'manager'].includes(user_type)
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
    const checkoutLink = getCheckoutLink(user_type, purchase_order_name, room_name, user_id)
    const is_checkout_access = is_my_or_designer_project && !po.is_archived
    return (
        <aside className={s.sidebar}>
            <div className={s.sidebarContent}>
                <div className={s.sidebarList}>
                    <div className={s.sidebarTitle}>
                        <h3>Cart<span>{cart_items.length}</span></h3>
                        {is_checkout_access &&
                            <button onClick={() => dispatch(removeAllFromCart({room_id: room._id}))}>Remove
                                all</button>}
                    </div>
                    {cart_items.map((item, key) => {
                        return (
                            <RoomCartItem item={item} key={key}/>
                        )
                    })}
                </div>
                {is_checkout_access ?
                    <NavLink
                        to={checkoutLink}
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
