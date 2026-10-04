import React, {useEffect} from 'react';
import {useOutletContext, useParams} from "react-router-dom";
import {textToLink, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import Loading from "../../common/Loading";
import {fetchRooms, RoomsState} from "../../store/reducers/roomSlice";
import {PurchaseOrderType} from "../../store/reducers/purchaseOrderSlice";
import s from "../Profile/profile.module.sass";
import ArchiveRoomNavLink from "./ArchiveRoomNavLink";

const ArchiveItem = () => {
    const {purchase_order_name} = useParams();
    const {po_archived} = useOutletContext<{ po_archived: PurchaseOrderType[] }>();
    const dispatch = useAppDispatch();
    const {rooms, loading_rooms} = useAppSelector<RoomsState>(state => state.room);
    const purchase_order = po_archived.find(el => textToLink(el.name) === purchase_order_name);
    useEffect(() => {
        purchase_order && dispatch(fetchRooms({_id: purchase_order._id}))
    }, [purchase_order, dispatch]);

    if (!po_archived.length || !purchase_order_name) return null;

    if (loading_rooms) return <Loading/>
    return (
        <>
            {rooms.length ?
                <div>
                    <h2>Rooms</h2>
                    <nav className={s.nav}>
                        {rooms.map(room => <ArchiveRoomNavLink room={room} key={room._id}/>)}
                    </nav>
                </div> : null
            }
        </>
    );
};

export default ArchiveItem;