import React, {FC, useEffect} from 'react';
import s from '../Profile/profile.module.sass'
import {NavLink, Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {getAllRooms} from "../../api/apiFunctions";
import {getRooms} from "../../store/reducers/roomSlice";
import RoomNew from '../Room/RoomNew';
import {PurchaseOrderType} from "../../store/reducers/purchaseOrderSlice";

const PurchaseOrderRooms: FC<{purchase_order:PurchaseOrderType}> = ({purchase_order}) => {
    const {rooms} = useAppSelector(state => state.room);
    const dispatch = useAppDispatch();
    const {_id} = purchase_order

    useEffect(() => {
        _id && getAllRooms(_id).then(data => {
            if (data) {
                dispatch(getRooms(data));
            }
        })
    }, [_id]);

    return (
        <div className={s.roomsMain}>
            <h2>Rooms</h2>
            {rooms.length ?
                <div>
                    <nav className={s.nav}>
                        {rooms.map(room => <NavLink key={room._id}
                                                    className={({isActive}) => [isActive ? s.linkActive : '', s.navItem].join(' ')}
                                                    to={`${room._id}`}>{room.room_name}</NavLink>)}
                        <NavLink className={({isActive}) => [isActive ? s.linkActive : '', s.navItem].join(' ')}
                                 to="new">Add Room +</NavLink>
                    </nav>
                    <Outlet context={[rooms]}/>
                </div>
                : <RoomNew/>}
        </div>
    );
};

export default PurchaseOrderRooms;