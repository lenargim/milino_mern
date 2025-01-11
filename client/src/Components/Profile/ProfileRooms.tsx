import React, {FC, MutableRefObject, useEffect, useRef} from 'react';
import s from './profile.module.sass'
import {NavLink, Outlet, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {getAllRooms} from "../../api/apiFunctions";
import {getRooms} from "../../store/reducers/roomSlice";
import RoomsNew from '../Room/RoomsNew';
import RoomSidebar from "../Room/RoomSidebar";
import {MaybeNull} from "../../helpers/productTypes";

const ProfileRooms: FC = () => {
    const {rooms} = useAppSelector(state => state.room);
    const dispatch = useAppDispatch();
    const location = useLocation();
    useEffect(() => {
        getAllRooms().then(data => {
            if (data ) {
                dispatch(getRooms(data));
            }
        })
    },[]);
    const scrollToRef = useRef<MaybeNull<HTMLDivElement>>(null);

    useEffect(() => {
        const scrollEl = scrollToRef.current;
        if (scrollEl) {
            scrollEl.scrollIntoView(true);
        }
    }, [location.pathname])

    return (
        <div className={s.rooms}>
            <div className={s.roomsMain}>
                <h1 ref={scrollToRef}>Process Orders</h1>
                {rooms.length ?
                    <div>
                        <nav className={s.nav}>
                            {rooms.map(room => <NavLink key={room._id}
                                                        className={({isActive}) => isActive ? s.linkActive : ''}
                                                        to={`${room._id}`}>{room.room_name}</NavLink>)}
                            <NavLink className={({isActive}) => isActive ? s.linkActive : ''} to="new">Add PO +</NavLink>
                        </nav>
                        <Outlet context={[rooms]}/>
                    </div>
                    : <RoomsNew/>}
            </div>
            <RoomSidebar />
        </div>
    );
};

export default ProfileRooms;