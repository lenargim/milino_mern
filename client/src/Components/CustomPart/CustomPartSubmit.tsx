import React, {FC} from 'react';
import {FormikErrors, useFormikContext} from "formik";
import {CustomPartFormType} from "./CustomPart";
import {useParams} from "react-router-dom";

const CustomPartSubmit:FC = () => {
    const {cartId} = useParams();
    const buttonText = !cartId ? 'Add to cart' : 'Update Custom Part'
    const {values, setFieldTouched, handleSubmit, isSubmitting} = useFormikContext<CustomPartFormType>();
    // const handleSubmitFunc = async (values:CustomPartFormType, setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => Promise<void | FormikErrors<CustomPartFormType>>,handleSubmit:(e?: React.FormEvent<HTMLFormElement>) => void) => {
    //     values.glass_door.forEach((_, index) => {
    //         setFieldTouched(`glass_door[${index}]`, true);
    //     });
    //     handleSubmit();
    // };

    return (
        <button type="submit"
                disabled={isSubmitting}
                className={'button yellow'}
                // onClick={() => handleSubmitFunc(values, setFieldTouched, handleSubmit)}
        >{buttonText}</button>
    );
};

export default CustomPartSubmit;