import {Formik} from 'formik';
import React, {FC, useEffect} from 'react';
import {RoomSchema} from "./RoomSchems";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {editRoomAPI} from "../../api/apiFunctions";
import {editRoom} from "../../store/reducers/roomSlice";
import {useAppSelector} from "../../helpers/helpers";
import RoomMaterialsForm from "./RoomMaterialsForm";
import {RoomFront} from "../../helpers/roomTypes";

const RoomEdit: FC = () => {
    const {roomId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const rooms:RoomFront[] = useAppSelector(state => state.room.rooms);
    const room = rooms.find(room => room._id === roomId);
    useEffect(() => {
        !room && navigate(`..`);
    }, []);
    if (!room) return null;
    const uniqueNames = rooms.map(el => el.room_name).filter(el => el && el !== room.room_name );
    return (
        <Formik initialValues={room}
                validationSchema={RoomSchema(uniqueNames)}
                onSubmit={(values:RoomFront) => {
                    const {activeProductCategory, ...rest} = values;
                    editRoomAPI(rest).then(data => {
                        if (data) {
                            dispatch(editRoom(data))
                            navigate(`/profile/rooms/${room._id}`);
                        }
                    })
                }}>
            <RoomMaterialsForm isRoomNew={false}/>
        </Formik>
    );
};

export default RoomEdit;