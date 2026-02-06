import * as Yup from "yup";
import {urlRegex} from "../../helpers/helpers";


export interface ProfileEditFormValues {
    name: string;
    company: string;
    phone: string;
    password: string;
    compare: string;
    website?: string|null;
    additional_emails: string[];
}

export const ProfileEditSchema: Yup.ObjectSchema<ProfileEditFormValues> =
    Yup.object({
        name: Yup.string()
            .required('You should type your name'),

        company: Yup.string()
            .required('You should type your company'),

        phone: Yup.string()
            .required('Please write down your phone number'),

        password: Yup.string()
            .min(5, 'Minimum 5 symbols')
            .required('You should type your password'),

        compare: Yup.string()
            .min(5, 'Minimum 5 symbols')
            .oneOf([Yup.ref('password')], 'Does not match password')
            .required('You should type your password'),

        website: Yup.string()
            .transform(v => (v === null ? undefined : v))
            .matches(urlRegex, 'Please provide correct link')
            .notRequired(),

        additional_emails: Yup.array()
            .of(
                Yup.string()
                    .transform(v => (v ? v.trim() : undefined))
                    .email('You should type additional email')
                    .required()
            )
            .compact()
            .max(5, 'Maximum 5 emails')
            .test(
                'unique',
                'Emails must be unique',
                (value?: string[]) => {
                    if (!value) return true;

                    const normalized = value.map(v => v.toLowerCase());
                    return new Set(normalized).size === normalized.length;
                }
            )
            .defined()
            .default([]),
    });