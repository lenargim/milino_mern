import React, {FC} from 'react';
import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import {RoomSchema} from "./RoomSchems";
import {createRoomAPI} from "../../api/apiFunctions";
import {addRoom, RoomsState} from "../../store/reducers/roomSlice";
import {Formik} from "formik";
import {useDispatch} from "react-redux";
import {getUniqueNames, textToLink, useAppSelector} from "../../helpers/helpers";
import RoomMaterialsForm, {materialsFormInitial} from "./RoomMaterialsForm";
import {RoomMaterialsFormType, RoomNewType} from "../../helpers/roomTypes";
import {PurchaseOrderType} from "../../store/reducers/purchaseOrderSlice";



const RoomNew: FC = () => {
    const {purchase_order_name} = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {rooms} = useAppSelector<RoomsState>(state => state.room);
    const {_id} = useOutletContext<PurchaseOrderType>()
    const uniqueNames = getUniqueNames(rooms);
    return (
        <Formik initialValues={materialsFormInitial}
                validationSchema={RoomSchema(uniqueNames)}
                validateOnMount
                onSubmit={(values:RoomMaterialsFormType, {setSubmitting}) => {
                    setSubmitting(true);
                    if (!values.category) return;
                    const preparedToAPIRoom:RoomNewType = {
                        ...values,
                        purchase_order_id: _id,
                        category: values.category
                    }
                    createRoomAPI(preparedToAPIRoom).then(room => {
                        setSubmitting(false)
                        if (room) {
                            dispatch(addRoom(room))
                            navigate(`/profile/purchase/${purchase_order_name}/rooms/${textToLink(room.name)}`);
                        }
                    })
                }}>
            <RoomMaterialsForm isRoomNew={true}/>
        </Formik>
    );
};

export default RoomNew;