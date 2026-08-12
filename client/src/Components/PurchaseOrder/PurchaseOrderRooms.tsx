import React, {FC, useEffect, useState} from 'react';
import s from '../Profile/profile.module.sass'
import {NavLink, useParams, Outlet} from "react-router-dom";
import {textToLink, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import RoomNew from '../Room/RoomNew';
import {PurchaseOrdersState} from "../../store/reducers/purchaseOrderSlice";
import {fetchRooms, RoomsState} from "../../store/reducers/roomSlice";
import {MaybeNull} from "../../helpers/productTypes";
import {RoomFront} from "../../helpers/roomTypes";
import Loading from "../../common/Loading";
import {useAdmin} from "../../helpers/AdminContext";
import PurchaseOrderRoomNavLink from "./PurchaseOrderRoomNavLink";
import PurchaseOrderApproveRemoveRoom from "./PurchaseOrderApproveRemoveRoom";

const PurchaseOrderRooms: FC = () => {
    const {purchase_order_name} = useParams();
    const dispatch = useAppDispatch();
    const {purchase_orders} = useAppSelector<PurchaseOrdersState>(state => state.purchase_order)
    const {rooms, loading_rooms} = useAppSelector<RoomsState>(state => state.room);
    const [warningModal, setWarningModal] = useState<MaybeNull<RoomFront>>(null);
    const purchase_order = purchase_orders.find(el => textToLink(el.name) === purchase_order_name);
    const is_admin = useAdmin();
    useEffect(() => {
        purchase_order && dispatch(fetchRooms({_id: purchase_order._id}))
    }, [purchase_order, dispatch]);

    if (!purchase_order) return null;
    if (loading_rooms) return <Loading/>
    return (
        <>
            <h2>Rooms</h2>
            {rooms.length ?
                <div>
                    <nav className={s.nav}>
                        {rooms.map(room => <PurchaseOrderRoomNavLink room={room} setWarningModal={setWarningModal}
                                                                     is_admin={is_admin}
                                                                     key={room._id}/>)}
                        {!is_admin &&
                            <NavLink className={({isActive}) => [isActive ? s.linkActive : '', s.navItem].join(' ')}
                                     to="new">Add Room +</NavLink>}
                    </nav>
                    {warningModal ?
                        <PurchaseOrderApproveRemoveRoom room={warningModal} setWarningModal={setWarningModal}
                                                        purchase_name={purchase_order.name}/> : null}
                </div>
                : <RoomNew/>}
            <Outlet/>
        </>
    );
};

export default PurchaseOrderRooms;

