import * as Yup from "yup";
import {LinkManagerFromType} from "./ProfileLinkForm";

export const getLinkManagerSchema = (email: string): Yup.ObjectSchema<LinkManagerFromType> => {
    return Yup.object({
        email: Yup.string()
            .email('You should type your email')
            .required('You should type your email')
            .notOneOf([email], 'This is your email')
    })
}