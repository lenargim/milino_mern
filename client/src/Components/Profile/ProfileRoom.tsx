import React, {useEffect} from 'react';
import {NavLink, Outlet, useNavigate, useOutletContext, useParams} from "react-router-dom";
import {useAppDispatch} from "../../helpers/helpers";
import s from './profile.module.sass'
import {deleteRoomAPI} from "../../api/apiFunctions";
import {deleteRoom, RoomTypeAPI} from "../../store/reducers/roomSlice";

const ProfileRoom = () => {
    const {id} = useParams();
    const [rooms] = useOutletContext<[RoomTypeAPI[]]>();
    const navigate = useNavigate();
    const roomData = rooms?.find(room => room._id === id);
    const dispatch = useAppDispatch()

    useEffect(() => {
        !roomData && navigate('/profile');
    }, [roomData])

    if (!roomData) return null;

    const {_id, room_name, category} = roomData;
    if (!category) return null;

    return (
        <div>
            <div className={s.roomRow}>
                <span className={s.name}>Room: {room_name}</span>
                <NavLink to={'edit'} className="button small yellow">Edit Room</NavLink>
                <button className="button red small" type="button" onClick={() => {
                    deleteRoomAPI(_id).then(room => {
                        if (room) {
                            dispatch(deleteRoom(room))
                            navigate(`/profile/rooms/`);
                        }
                    })
                }}>Delete Room
                </button>
            </div>
            <Outlet context={[roomData]}  />
        </div>
    );
};

export default ProfileRoom;