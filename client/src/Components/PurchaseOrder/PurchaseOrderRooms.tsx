import React, {FC, useEffect, useState} from 'react';
import s from '../Profile/profile.module.sass'
import {NavLink, Outlet, useOutletContext} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../helpers/helpers";
import RoomNew from '../Room/RoomNew';
import {PurchaseOrderType} from "../../store/reducers/purchaseOrderSlice";
import {fetchRooms, RoomsState} from "../../store/reducers/roomSlice";
import {MaybeNull} from "../../helpers/productTypes";
import {RoomFront} from "../../helpers/roomTypes";
import Loading from "../../common/Loading";
import PurchaseOrderRoomNavLink from "./PurchaseOrderRoomNavLink";
import PurchaseOrderApproveRemoveRoom from "./PurchaseOrderApproveRemoveRoom";
import {useEditor} from "../../helpers/EditorContext";

const PurchaseOrderRooms: FC = () => {
    const dispatch = useAppDispatch();
    const {rooms, loading_rooms} = useAppSelector<RoomsState>(state => state.room);
    const [warningModal, setWarningModal] = useState<MaybeNull<RoomFront>>(null);
    const {purchase_order} = useOutletContext<{ purchase_order: PurchaseOrderType}>();
    const is_my_project = useEditor() === 'designer';
    useEffect(() => {
        if (!purchase_order) return;
        dispatch(fetchRooms({_id: purchase_order._id}))
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
                                                                     is_my_project={is_my_project}
                                                                     key={room._id}/>)}
                        {is_my_project &&
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

