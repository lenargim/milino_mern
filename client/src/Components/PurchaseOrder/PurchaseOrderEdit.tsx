import React, {FC} from 'react';
import {Formik} from "formik";
import {useNavigate, useParams} from "react-router-dom";
import {PONewSchema} from "./PurchaseOrderNewSchema";
import {getUniqueNames, textToLink, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import PurchaseOrderForm from "./PurchaseOrderForm";
import {editPOAPI} from "../../api/apiFunctions";
import {editPO, PurchaseOrdersState, PurchaseOrderType} from "../../store/reducers/purchaseOrderSlice";
import {useDispatch} from "react-redux";

const PurchaseOrderEdit: FC = () => {
    const {purchase_order_name} = useParams();
    const {purchase_orders} = useAppSelector<PurchaseOrdersState>(state => state.purchase_order)
    const purchase_order = purchase_orders.find(el => textToLink(el.name) === purchase_order_name);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const uniqueNames = getUniqueNames(purchase_orders);
    if (!purchase_order_name) {
        navigate(`/profile/purchase`)
        return null;
    }
    if (!purchase_order) return null;
    const {_id, user_id, ...initialValues} = purchase_order;
    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={PONewSchema(uniqueNames)}
            validateOnMount={true}
            onSubmit={(values, {setSubmitting}) => {
                if (!purchase_order) return;
                setSubmitting(true)
                const poAPI: PurchaseOrderType = {
                    ...purchase_order,
                    name: values.name
                }
                editPOAPI(poAPI).then(po_res => {
                    if (po_res) {
                        dispatch(editPO(po_res))
                        navigate(`/profile/purchase/${textToLink(po_res.name)}/rooms`);
                    }
                })
                setSubmitting(false)
            }}
        >
            <PurchaseOrderForm isNew={false}/>
        </Formik>
    );
};

export default PurchaseOrderEdit;