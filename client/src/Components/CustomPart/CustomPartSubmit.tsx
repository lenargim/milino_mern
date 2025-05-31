import React from 'react';
import {FormikErrors, useFormikContext} from "formik";
import {CustomPartFormValuesType} from "./CustomPart";

const CustomPartSubmit = () => {
    const {values, setFieldTouched, handleSubmit, isSubmitting} = useFormikContext<CustomPartFormValuesType>();
    const handleSubmitFunc = async (values:CustomPartFormValuesType, setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => Promise<void | FormikErrors<CustomPartFormValuesType>>,handleSubmit:(e?: React.FormEvent<HTMLFormElement>) => void) => {

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