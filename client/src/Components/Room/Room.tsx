import React, {FC} from 'react';
import {Navigate, Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {textToLink, useAppSelector} from "../../helpers/helpers";
import {RoomsState} from "../../store/reducers/roomSlice";
import s from './room.module.sass'
import {useEditor} from "../../helpers/EditorContext";
import {UserTypesType} from "../../api/apiTypes";
import {MaybeUndefined} from "../../helpers/productTypes";


const getCabinetLink = (user_id: MaybeUndefined<string>, purchase_order_name: string, room_name: string, editor: UserTypesType): string => {
    switch (editor) {
        case "admin":
            return `/profile/admin/edit/${user_id}/purchase/${textToLink(purchase_order_name)}/rooms/${textToLink(room_name)}`;
        case "manager":
            return `/profile/manager/edit/${user_id}/purchase/${textToLink(purchase_order_name)}/rooms/${textToLink(room_name)}`;
        default:
            return `/profile/purchase/${textToLink(purchase_order_name)}/rooms/${textToLink(room_name)}`;
    }
}

const Room: FC = () => {
    const {room_name, purchase_order_name, user_id} = useParams();
    const navigate = useNavigate();
    const location = useLocation()
    const {rooms} = useAppSelector<RoomsState>(state => state.room);
    const room = rooms.find(room => textToLink(room.name) === room_name);
    const editor = useEditor();
    if (!room) return null;
    if (!room_name || !purchase_order_name) return <Navigate to="/profile"/>;
    const cabinetLink = getCabinetLink(user_id, purchase_order_name, room_name, editor);
    const showBackButton = location.pathname !== cabinetLink;

    return (
        <div className={s.roomMain}>
            {showBackButton
                ? <button className={s.back} type="button" tabIndex={-1} onClick={() => navigate(cabinetLink)}>Back to
                    Cabinets</button>
                : null
            }
            <Outlet context={{room}}/>
        </div>
    );
};

export default Room;