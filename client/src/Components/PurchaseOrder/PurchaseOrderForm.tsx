import React, {FC} from 'react';
import s from "../Product/product.module.sass";
import {TextInput} from "../../common/Form";
import {Form, useFormikContext} from "formik";
import {POFormType} from "./PurchaseOrderNew";

const PurchaseOrderForm:FC<{isNew:boolean}> = ({isNew}) => {
    const {isValid, isSubmitting} = useFormikContext<POFormType>();
    const submitText = isNew ? 'Create Purchase Order' : 'Edit Purchase Order';
    const nameLabelText = isNew ? 'New Purchase Order Name' : 'Purchase Order Name';
    return (
        <Form>
            <div className={s.block}>
                <TextInput type={"text"} label={nameLabelText} name="name" autoFocus={true}/>
            </div>
            {isValid && <button disabled={isSubmitting} className="button yellow" type="submit">{submitText}</button>}
        </Form>
    );
};

export default PurchaseOrderForm;