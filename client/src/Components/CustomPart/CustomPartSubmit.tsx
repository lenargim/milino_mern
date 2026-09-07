import React, {FC} from 'react';
import {useFormikContext} from "formik";
import {CustomPartFormType} from "./CustomPart";
import {useParams} from "react-router-dom";

const CustomPartSubmit:FC = () => {
    const {cart_id} = useParams();
    const buttonText = !cart_id ? 'Add to cart' : 'Update Custom Part'
    const {isSubmitting} = useFormikContext<CustomPartFormType>();
    return (
        <button type="submit" disabled={isSubmitting} className={'button yellow'}>{buttonText}</button>
    );
};

export default CustomPartSubmit;