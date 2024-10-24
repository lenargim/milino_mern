import React, {useEffect} from 'react';
import {NavLink, Outlet, useLocation, useNavigate, useOutletContext, useParams} from "react-router-dom";
import {useAppDispatch} from "../../helpers/helpers";
import s from './profile.module.sass'
import {deleteRoomAPI} from "../../api/apiFunctions";
import {deleteRoom, RoomTypeAPI} from "../../store/reducers/roomSlice";
import {Cart} from "../../common/Header/Header";

const ProfileRoom = () => {
    const {roomId} = useParams();
    const [rooms] = useOutletContext<[RoomTypeAPI[]]>();
    const navigate = useNavigate();
    const roomData = rooms?.find(room => room._id === roomId);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const path = location.pathname.slice(1);
    useEffect(() => {
        !roomData && navigate('/profile');
    }, [roomData])

    if (!roomData) return null;
    const {_id, room_name, category} = roomData;
    if (!category) return null;
    const isBackToCabinetsShown = path !== `profile/rooms/${roomId}`;
    const {cart} = roomData
    const cartLength = cart.length
    const isCartShown = cartLength && !path.includes('/checkout');
    return (
        <div>
            <div className={s.roomRow}>
                <span className={s.name}>Room: {room_name}</span>
                {isBackToCabinetsShown ?
                    <NavLink to={""}>Back to cabinets</NavLink> : null}
                {isCartShown ? <Cart length={cartLength} link="checkout"/> : null}
                <NavLink to={'edit'} className="button small yellow">Edit Room</NavLink>
                <button className="button red small" type="button" onClick={() => {
                    deleteRoomAPI(_id).then(room => {
                        if (room) {
                            dispatch(deleteRoom(room))
                            navigate(`/profile/rooms/`);
                        }
                    })
                }}>Delete Room</button>
            </div>
            <Outlet context={[roomData]}  />
        </div>
    );
};

export default ProfileRoom;