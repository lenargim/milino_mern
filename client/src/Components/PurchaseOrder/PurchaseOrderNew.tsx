import React, {FC} from 'react';
import {Formik} from "formik";
import {useNavigate, useOutletContext} from "react-router-dom";
import {addPO, PurchaseOrderType} from "../../store/reducers/purchaseOrderSlice";
import {PONewSchema} from "./PurchaseOrderNewSchema";
import {createPO} from "../../api/apiFunctions";
import {getUniqueNames, textToLink, useAppDispatch} from "../../helpers/helpers";
import PurchaseOrderForm from "./PurchaseOrderForm";

export type POFormType = {
    name: string
}

export interface PONewType extends POFormType {
    user_id: string
}

const PurchaseOrderNew: FC = () => {
    const {user_id, purchase_orders} = useOutletContext<{ user_id: string, purchase_orders: PurchaseOrderType[] }>();
    const initialValues: POFormType = {
        name: ""
    };
    const uniqueNames = getUniqueNames(purchase_orders);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <Formik
            validationSchema={PONewSchema(uniqueNames)}
            validateOnMount={true}
            initialValues={initialValues}
            onSubmit={(values) => {
                createPO({
                    name: values.name,
                    user_id
                }).then(async purchase_order => {
                    if (purchase_order) {
                        await dispatch(addPO(purchase_order));
                        navigate(`/profile/purchase/${textToLink(purchase_order.name)}/rooms`)
                    }
                })
            }}
        >
            <PurchaseOrderForm isNew={true}/>
        </Formik>
    );
};

export default PurchaseOrderNew;