import React, {FC, useEffect} from 'react';
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {findIsRoomStandard, textToLink, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {fetchCart, RoomsState, setActiveRoom} from "../../store/reducers/roomSlice";
import s from './room.module.sass'
import {RoomMaterialsFormType} from "../../helpers/roomTypes";

const Room: FC = () => {
    const {room_name, purchase_order_name} = useParams();
    const navigate = useNavigate();
    const location = useLocation()
    const dispatch = useAppDispatch();
    const {rooms} = useAppSelector<RoomsState>(state => state.room);
    const room = rooms.find(room => textToLink(room.name) === room_name);

    useEffect(() => {
        if (!purchase_order_name) navigate('/profile');
        if (!room_name && purchase_order_name) navigate(`/profile/${textToLink(purchase_order_name)}/rooms`);
    }, [room_name, purchase_order_name])

    useEffect(() => {
        room && room_name && dispatch(setActiveRoom(room.name))
    }, [dispatch, room_name]);

    useEffect(() => {
        room?._id && dispatch(fetchCart({_id: room._id}));
    }, [room?._id, dispatch]);

    if (!room_name || !purchase_order_name || !room) return null;
    const cabinetLink = `/profile/purchase/${textToLink(purchase_order_name)}/rooms/${textToLink(room_name)}`;
    const showBackButton = location.pathname !== cabinetLink;
    const {
        _id: room_id,
        activeProductCategory,
        purchase_order_id,
        ...rest
    } = room;
    const materials: RoomMaterialsFormType = {...rest};
    const isRoomStandard = findIsRoomStandard(materials.door_type);
    return (
        <div className={s.roomMain}>
            {showBackButton
                ? <button className={s.back} type="button" tabIndex={-1} onClick={() => navigate(cabinetLink)}>Back to
                    Cabinets</button>
                : null
            }
            <Outlet context={[room, materials, isRoomStandard]}/>
        </div>
    );
};

export default Room;