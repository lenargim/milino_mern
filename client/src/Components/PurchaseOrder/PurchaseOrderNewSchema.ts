import * as Yup from 'yup';
import {ObjectSchema} from "yup";
import {PONewFormType} from "./PurchaseOrderNew";

export const PONewSchema = (reservedNames: string[] = []):ObjectSchema<PONewFormType> => {
    return (
        Yup.object({
            name: Yup.string()
                .required('Enter Purchase order name')
                .test("Unique", "Name should be unique",(value) => {
                    if (!value) return false;
                    return !reservedNames.includes(value.trim())
                })
                .min(2, 'Min 2 symbols')
                .defined('Enter Purchase order name'),
        })
    )
}