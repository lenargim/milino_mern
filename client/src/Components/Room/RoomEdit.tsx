import {Formik} from 'formik';
import React, {FC} from 'react';
import {RoomSchema} from "./RoomSchema";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {editRoom, RoomsState} from "../../store/reducers/roomSlice";
import {getUniqueNames, textToLink, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import RoomMaterialsForm from "./RoomMaterialsForm";
import {RoomFront, RoomType} from "../../helpers/roomTypes";
import {useEditor} from "../../helpers/EditorContext";
import {UserTypesType} from "../../api/apiTypes";
import {MaybeUndefined} from "../../helpers/productTypes";

const newRoomLink = (editor:UserTypesType, purchase_order_name:string, new_room_name:string, user_id:MaybeUndefined<string>):string => {
    switch (editor) {
        case "admin": return `/profile/admin/edit/${user_id}/purchase/${purchase_order_name}/rooms/${textToLink(new_room_name)}`;
        case "manager": return `/profile/manager/edit/${user_id}/purchase/${purchase_order_name}/rooms/${textToLink(new_room_name)}`;
        default: return `/profile/purchase/${purchase_order_name}/rooms/${textToLink(new_room_name)}`
    }
}

const RoomEdit: FC = () => {
    const {room_name, purchase_order_name, user_id} = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {rooms} = useAppSelector<RoomsState>(state => state.room);
    const uniqueNames = getUniqueNames(rooms, room_name);
    const room = rooms.find(el => textToLink(el.name) === room_name)
    const editor = useEditor();

    if (!purchase_order_name || !room_name || !room) return <Navigate to='/profile' />

    return (
        <Formik initialValues={room}
                enableReinitialize
                validationSchema={RoomSchema(uniqueNames)}
                onSubmit={async (values:RoomFront) => {
                    const {activeProductCategory, ...rest} = values;
                    const roomAPI:RoomType = {
                        ...rest,
                        _id: room._id,
                        purchase_order_id: room.purchase_order_id
                    }
                    try {
                        const res = await dispatch(editRoom(roomAPI));
                        const new_room_name:string = res.meta.arg.name;
                        navigate(newRoomLink(editor, purchase_order_name, new_room_name, user_id));
                    } catch (e) {
                        alert('Cannot update')
                    }
                }}>
            <RoomMaterialsForm isRoomNew={false}/>
        </Formik>
    );
};

export default RoomEdit;