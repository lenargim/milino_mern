import React, {FC, useEffect} from 'react';
import s from './profile.module.sass'
import {NavLink, Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {getAllRooms} from "../../api/apiFunctions";
import {getRooms} from "../../store/reducers/roomSlice";
import RoomsEmpty from './RoomsNew';
import RoomSidebar from "./RoomSidebar";

const ProfileRooms: FC = () => {
    const {rooms} = useAppSelector(state => state.room);
    const dispatch = useAppDispatch()

    useEffect(() => {
        getAllRooms().then(data => {
            if (data) {
                // const rooms = getRoomsFront(data)
                dispatch(getRooms(data))
            }
        })
    }, []);
    return (
        <div className={s.rooms}>
            <div className={s.roomsMain}>
                <h1>Rooms</h1>
                {rooms.length ?
                    <>
                        <nav className={s.nav}>
                            {rooms.map(room => <NavLink key={room._id}
                                                        className={({isActive}) => isActive ? s.linkActive : ''}
                                                        to={`${room._id}`}>{room.room_name}</NavLink>)}
                            <NavLink className={({isActive}) => isActive ? s.linkActive : ''} to="new">Add Room
                                +</NavLink>
                        </nav>
                        <Outlet context={[rooms]}/>
                    </>
                    : <RoomsEmpty/>}
            </div>
            <RoomSidebar />
        </div>
    );
};

export default ProfileRooms;