import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {RoomSchema} from "./RoomSchems";
import {createRoom} from "../../api/apiFunctions";
import {addRoom} from "../../store/reducers/roomSlice";
import {Formik} from "formik";
import {useDispatch} from "react-redux";
import RoomForm, {initialValuesRoom} from "./RoomForm";
import {useAppSelector} from "../../helpers/helpers";


const RoomsNew: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {rooms} = useAppSelector(state => state.room);
    const uniqueNames = rooms.map(el => el.room_name);
    return (
        <Formik initialValues={initialValuesRoom}
                validationSchema={RoomSchema(uniqueNames)}
                validateOnMount
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(true)
                    createRoom(values).then(room => {
                        setSubmitting(false)
                        if (room) {
                            dispatch(addRoom(room))
                            navigate(`/profile/rooms/${room._id}`);
                        }
                    })
                }}>
            <RoomForm />
        </Formik>
    );
};

export default RoomsNew;