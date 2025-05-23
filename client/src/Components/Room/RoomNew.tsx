import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {RoomSchema} from "./RoomSchems";
import {createRoomAPI} from "../../api/apiFunctions";
import {addRoom} from "../../store/reducers/roomSlice";
import {Formik} from "formik";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../helpers/helpers";
import RoomMaterialsForm, {materialsFormInitial} from "./RoomMaterialsForm";
import {RoomMaterialsFormType, RoomType} from "../../helpers/roomTypes";

const RoomNew: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {rooms} = useAppSelector(state => state.room);
    const uniqueNames = rooms.map(el => el.room_name);
    return (
        <Formik initialValues={materialsFormInitial}
                validationSchema={RoomSchema(uniqueNames)}
                validateOnMount
                onSubmit={(values:RoomMaterialsFormType, {setSubmitting}) => {
                    setSubmitting(true);
                    if (!values.category) return;
                    const preparedToAPIRoom:RoomType = {
                        ...values,
                        _id: '',
                        purchase_order_id: rooms[0].purchase_order_id,
                        category: values.category
                    }
                    createRoomAPI(preparedToAPIRoom).then(room => {
                        setSubmitting(false)
                        if (room) {
                            dispatch(addRoom(room))
                            navigate(`/profile/rooms/${room._id}`);
                        }
                    })
                }}>
            <RoomMaterialsForm isRoomNew={true}/>
        </Formik>
    );
};

export default RoomNew;