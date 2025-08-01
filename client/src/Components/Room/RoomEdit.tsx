import {Formik} from 'formik';
import React, {FC} from 'react';
import {RoomSchema} from "./RoomSchems";
import {useNavigate, useParams} from "react-router-dom";
import {editRoom, RoomsState} from "../../store/reducers/roomSlice";
import {getUniqueNames, textToLink, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import RoomMaterialsForm from "./RoomMaterialsForm";
import {RoomFront, RoomType} from "../../helpers/roomTypes";

const RoomEdit: FC<{isEdit?: boolean}> = ({isEdit = false}) => {
    const {room_name, purchase_order_name} = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {rooms} = useAppSelector<RoomsState>(state => state.room);
    const uniqueNames = getUniqueNames(rooms, room_name);
    const room = rooms.find(el => textToLink(el.name) === room_name)

    if (!room_name) {
        navigate(`/profile/purchase/${purchase_order_name}`);
        return null;
    }
    if (!room || !purchase_order_name) return null;
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
                        navigate(`/profile/purchase/${purchase_order_name}/rooms/${textToLink(new_room_name)}`);
                    } catch (e) {
                        alert('Cannot update')
                    }
                }}>
            <RoomMaterialsForm isRoomNew={false}/>
        </Formik>
    );
};

export default RoomEdit;