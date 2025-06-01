import React from 'react';
import { Field, getIn, FieldProps } from 'formik';

interface NestedErrorMessageProps {
    name: string;
}

const NestedErrorMessage: React.FC<NestedErrorMessageProps> = ({ name }) => (
    <Field name={name}>
        {({ form }: FieldProps) => {
            const error = getIn(form.errors, name);
            const touch = getIn(form.touched, name);
            return touch && error ? <span>{error}</span> : null;
        }}
    </Field>
);

export default NestedErrorMessage;