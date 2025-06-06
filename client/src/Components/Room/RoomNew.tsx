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
import {PurchaseOrdersState} from "../../store/reducers/purchaseOrderSlice";



const RoomNew: FC = () => {
    const {purchase_order_name} = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {rooms} = useAppSelector<RoomsState>(state => state.room);
    const {purchase_orders} = useAppSelector<PurchaseOrdersState>(state => state.purchase_order);
    const purchase_order_id = purchase_orders.find(el => textToLink(el.name) === purchase_order_name)?._id
    if (!purchase_order_id) return null;
    const uniqueNames = getUniqueNames(rooms);
    return (
        <Formik initialValues={materialsFormInitial}
                validationSchema={RoomSchema(uniqueNames)}
                validateOnMount
                onSubmit={(values:RoomMaterialsFormType, {setSubmitting}) => {
                    if (!purchase_order_id || !values.category) return;
                    setSubmitting(true);
                    const preparedToAPIRoom:RoomNewType = {
                        ...values,
                        purchase_order_id,
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