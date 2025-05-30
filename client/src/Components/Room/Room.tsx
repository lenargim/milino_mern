import React, {FC, useEffect, useRef} from 'react';
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {textToLink, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {fetchCart, RoomsState, setActiveRoom} from "../../store/reducers/roomSlice";
import Loading from "../../common/Loading";

const Room: FC = () => {
    const {room_name} = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {rooms, loading_cart_items} = useAppSelector<RoomsState>(state => state.room);
    const room = rooms.find(room => textToLink(room.name) === room_name);

    useEffect(() => {
        room_name && dispatch(setActiveRoom(room_name))
    }, [dispatch, room_name]);

    useEffect(() => {
        room?._id && dispatch(fetchCart({ _id: room._id }));
    }, [room?._id, dispatch]);

    if (!room_name) navigate('/profile');
    if (!room) return null;
    if (loading_cart_items) return <Loading />
    return (
        <div>
            <Outlet context={[room]}/>
        </div>
    );
};

export default Room;