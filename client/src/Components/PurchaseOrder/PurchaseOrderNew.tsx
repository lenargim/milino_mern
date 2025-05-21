import React, {FC} from 'react';
import {Form, Formik} from "formik";
import {TextInput} from "../../common/Form";
import s from "../Product/product.module.sass";
import {useNavigate, useOutletContext} from "react-router-dom";
import {addPO, PurchaseOrderType} from "../../store/reducers/purchaseOrderSlice";
import {PONewSchema} from "./PurchaseOrderNewSchema";
import {createPO} from "../../api/apiFunctions";
import {useAppDispatch} from "../../helpers/helpers";

export type PONewFormType = {
    name: string
}

export interface PONewType extends PONewFormType {
    user_id: string
}

const PurchaseOrderNew:FC = () => {
    const {user_id, purchase_orders} = useOutletContext<{user_id:string, purchase_orders: PurchaseOrderType[]}>();
    const initialValues:PONewFormType = {
        name: ""
    };
    const uniqueNames = purchase_orders.map(el => el.name);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <Formik
            validateOnMount={true}
            initialValues={initialValues}
            onSubmit={(values) => {
                createPO({
                    name: values.name,
                    user_id
                }).then(purchase_order => {
                    purchase_order && dispatch(addPO(purchase_order));
                    navigate('/profile/purchase')
                })
            }}
            validationSchema={PONewSchema(uniqueNames)}
        >
            {({isSubmitting, isValid}) => {
                return (
                    <Form>
                        <div className={s.block}>
                            <TextInput type={"text"} label={"New Purchase Order Name"} name="name" autoFocus={true}/>
                        </div>
                        {isValid && <button disabled={isSubmitting} className="button yellow" type="submit">Create PO Name</button>}
                    </Form>
                )
            }}
        </Formik>
    );
};

export default PurchaseOrderNew;