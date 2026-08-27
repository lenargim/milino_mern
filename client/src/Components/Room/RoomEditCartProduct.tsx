import React, {FC} from 'react';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {MaybeUndefined} from "../../helpers/productTypes";
import {textToLink, useAppSelector} from "../../helpers/helpers";
import {RoomsState} from "../../store/reducers/roomSlice";
import RoomProduct from "./RoomProduct";
import {UserTypesType} from "../../api/apiTypes";
import {useEditor} from "../../helpers/EditorContext";

const getRoomLink = (editor:UserTypesType, purchase_order_name:string, room_name:string, user_id:MaybeUndefined<string>):string => {
    switch (editor) {
        case "admin": return `/profile/admin/edit/${user_id}/purchase/${purchase_order_name}/rooms/${textToLink(room_name)}`;
        case "manager": return `/profile/manager/edit/${user_id}/purchase/${purchase_order_name}/rooms/${textToLink(room_name)}`;
        default: return `/profile/purchase/${purchase_order_name}/rooms/${textToLink(room_name)}`
    }
}

const RoomEditCartProduct: FC = () => {

    const {cart_id, purchase_order_name, room_name, user_id} = useParams();
    const editor = useEditor()
    const {cart_items} = useAppSelector<RoomsState>(state => state.room);
    if (!cart_items) return null;
    const cartItemValues = cart_items.find(el => el._id === cart_id);
    if (!purchase_order_name || !room_name) return <NavLink to="/profile" />
    if (!cartItemValues) return <NavLink to={getRoomLink(editor, purchase_order_name, room_name, user_id)} />
    return (
        <RoomProduct cartItemValues={cartItemValues}/>
    );
};

export default RoomEditCartProduct;