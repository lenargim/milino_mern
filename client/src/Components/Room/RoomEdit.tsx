import {Formik} from 'formik';
import React, {FC, useEffect, useState} from 'react';
import {RoomSchema} from "./RoomSchems";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {editRoomAPI} from "../../api/apiFunctions";
import {editRoom} from "../../store/reducers/roomSlice";
import {getUniqueNames, textToLink, useAppSelector} from "../../helpers/helpers";
import RoomMaterialsForm from "./RoomMaterialsForm";
import {RoomFront} from "../../helpers/roomTypes";
import {MaybeUndefined} from "../../helpers/productTypes";

const RoomEdit: FC = () => {
    const {room_name, purchase_order_name} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const rooms = useAppSelector<RoomFront[]>(state => state.room.rooms);
    const uniqueNames = getUniqueNames(rooms, room_name);
    const [room, setRoom] = useState<MaybeUndefined<RoomFront>>(undefined)

    useEffect(() => {
        setRoom(rooms.find(el => textToLink(el.name) === room_name))
    }, [room_name]);

    if (!room_name) {
        navigate(`/profile/purchase/${purchase_order_name}`)
        return null;
    }
    if (!room) return null;
    return (
        <Formik initialValues={room}
                enableReinitialize
                validationSchema={RoomSchema(uniqueNames)}
                onSubmit={(values:RoomFront) => {
                    const {activeProductCategory, ...rest} = values;
                    editRoomAPI(rest).then(data => {
                        if (data) {
                            dispatch(editRoom(data))
                            navigate(`/profile/purchase/${purchase_order_name}/${data.name}`);
                        }
                    })
                }}>
            <RoomMaterialsForm isRoomNew={false}/>
        </Formik>
    );
};

export default RoomEdit;