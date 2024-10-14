import React from 'react';
import {Formik} from "formik";
import {OrderFormSchema} from "./OrderFormSchems";
import Sidebar from "./Sidebar/Sidebar";
import {useNavigate} from "react-router-dom";
import {setMaterials} from "../../store/reducers/generalSlice";
import {getInitialMaterials, useAppDispatch} from "../../helpers/helpers";
import Main from "./Main";
import {MaterialsFormType} from "../../common/MaterialsForm";

const OrderForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const initialValues = getInitialMaterials();
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={OrderFormSchema}
            onSubmit={((values:MaterialsFormType, actions) => {
                const {room_name, ...rest} = values
                localStorage.setItem('materials', JSON.stringify(rest));
                dispatch(setMaterials({...values, room_name: null}))
                navigate('/cabinets');
            })}
        >
            {props => (
                <div className="page">
                    <Main />
                    <Sidebar materials={props.values} />
                </div>
            )}
        </Formik>
    );
};

export default OrderForm;
