import React, {FC, useEffect} from 'react';
import {Outlet, useLocation, useNavigate, useOutletContext, useParams} from "react-router-dom";
import {textToLink, useAppSelector} from "../../helpers/helpers";
import {RoomsState} from "../../store/reducers/roomSlice";
import s from './room.module.sass'
import {RoomMaterialsFormType} from "../../helpers/roomTypes";
import {useAdmin} from "../../helpers/AdminContext";

const Room: FC = () => {
    const {room_name, purchase_order_name, user_id} = useParams();
    const navigate = useNavigate();
    const location = useLocation()
    const {rooms} = useAppSelector<RoomsState>(state => state.room);
    const room = rooms.find(room => textToLink(room.name) === room_name);
    const is_admin = useAdmin();

    useEffect(() => {
        if (!purchase_order_name) navigate('/profile');
        if (!room_name && purchase_order_name) navigate(`/profile/${textToLink(purchase_order_name)}/rooms`);
    }, [room_name, purchase_order_name])

    if (!room_name || !purchase_order_name || !room) return null;
    const cabinetLink = !is_admin
        ? `/profile/purchase/${textToLink(purchase_order_name)}/rooms/${textToLink(room_name)}`
        : `/profile/admin/edit/${user_id}/purchase/${textToLink(purchase_order_name)}/rooms/${textToLink(room_name)}`;
    const showBackButton = location.pathname !== cabinetLink;
    const {
        _id: room_id,
        activeProductCategory,
        purchase_order_id,
        ...rest
    } = room;
    const materials: RoomMaterialsFormType = {...rest};
    return (
        <div className={s.roomMain}>
            {showBackButton
                ? <button className={s.back} type="button" tabIndex={-1} onClick={() => navigate(cabinetLink)}>Back to Cabinets</button>
                : null
            }
            <Outlet context={[room, materials]}/>
        </div>
    );
};

export default Room;