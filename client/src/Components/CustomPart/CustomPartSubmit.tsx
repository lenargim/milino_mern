import React, {FC} from 'react';
import {FormikErrors, useFormikContext} from "formik";
import {CustomPartFormType} from "./CustomPart";
import {useParams} from "react-router-dom";

const CustomPartSubmit:FC = () => {
    const {cart_id} = useParams();
    const buttonText = !cart_id ? 'Add to cart' : 'Update Custom Part'
    const {values, setFieldTouched, handleSubmit, isSubmitting} = useFormikContext<CustomPartFormType>();
    return (
        <button type="submit" disabled={isSubmitting} className={'button yellow'}>{buttonText}</button>
    );
};

export default CustomPartSubmit;