import React from 'react';
import {FormikErrors, useFormikContext} from "formik";
import {CustomPartFormType} from "./CustomPart";

const CustomPartSubmit = () => {
    const {values, setFieldTouched, handleSubmit, isSubmitting} = useFormikContext<CustomPartFormType>();
    const handleSubmitFunc = async (values:CustomPartFormType, setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => Promise<void | FormikErrors<CustomPartFormType>>,handleSubmit:(e?: React.FormEvent<HTMLFormElement>) => void) => {

        values.glass_door.forEach((_, index) => {
            setFieldTouched(`glass_door[${index}]`, true);
        });
        handleSubmit();
    };

    return (
        <button type="button" disabled={isSubmitting} className={['button yellow'].join(' ')} onClick={() => handleSubmitFunc(values, setFieldTouched, handleSubmit)}
        >Add to cart</button>
    );
};

export default CustomPartSubmit;