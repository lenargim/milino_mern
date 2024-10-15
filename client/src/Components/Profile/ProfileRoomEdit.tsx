import {Formik} from 'formik';
import React, {FC, useEffect} from 'react';
import {RoomSchema} from "./RoomSchems";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {editRoomAPI} from "../../api/apiFunctions";
import {editRoom, RoomFront} from "../../store/reducers/roomSlice";
import {useAppSelector} from "../../helpers/helpers";
import MaterialsForm from "../../common/MaterialsForm";

const ProfileRoomEdit: FC = () => {
    const {roomId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const rooms:RoomFront[] = useAppSelector(state => state.room.rooms);
    const room = rooms.find(room => room._id === roomId);
    useEffect(() => {
        !room && navigate('/profile/rooms');
    }, []);
    if (!room) return null;
    const uniqueNames = rooms.map(el => el.room_name).filter(el => el && el !== room.room_name );
    return (
        <Formik initialValues={room}
                validationSchema={RoomSchema(uniqueNames)}
                onSubmit={(values) => {
                    editRoomAPI(values, room._id).then(room => {
                        if (room) {
                            dispatch(editRoom(room))
                            navigate(`/profile/rooms/${room._id}`);
                        }
                    })
                }}>
            <MaterialsForm button="Edit Room" has_room_field={true} />
        </Formik>
    );
};

export default ProfileRoomEdit;