import React from 'react';
import {Formik, Form} from "formik";
import {OrderFormSchema} from "./OrderFormSchems";
import Main from "./Main";
import Sidebar from "./Sidebar/Sidebar";
import {useNavigate} from "react-router-dom";
import {setMaterials} from "../../store/reducers/generalSlice";
import {getCartData, getInitialMaterials, useAppDispatch, useAppSelector} from "../../helpers/helpers";

const OrderForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const initialValues = getInitialMaterials()
    const cartState = useAppSelector(state => state.general.cart)
    const {cart, total, cartLength} = getCartData(cartState,dispatch);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={OrderFormSchema}
            onSubmit={((values, actions) => {
                localStorage.setItem('materials', JSON.stringify(values));
                dispatch(setMaterials(values))
                navigate('/cabinets');
            })}
        >
            {({values, isValid, isSubmitting, setFieldValue}) => {
                return (
                    <Form className="page">
                        <Main values={values} isSubmitting={isSubmitting} isValid={isValid}
                              setFieldValue={setFieldValue} cartLength={cartLength} cart={cart}/>
                        <Sidebar values={values} cart={cart} total={total} cartLength={cartLength} />
                    </Form>
                )
            }}
        </Formik>
    );
};

export default OrderForm;
