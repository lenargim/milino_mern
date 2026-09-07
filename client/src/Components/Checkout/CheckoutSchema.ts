import * as Yup from 'yup';
import {mb_to_byte} from "../../helpers/helpers";
import {CheckoutFormType} from "./CheckoutForm";
import {ObjectSchema} from "yup";

const ALLOWED_TYPES = [
    'application/pdf',

    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',

    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

    'image/jpeg',
    'image/png',
];


export const CheckoutSchema = (MAX_FILES: number = 5, MAX_FILE_SIZE_MB: number = 5): ObjectSchema<CheckoutFormType> => {
    return Yup.object({
        name: Yup.string()
            .default("")
            .required('Please write down your name'),
        company: Yup.string()
            .default("")
            .required('Please write down your company name'),
        purchase_order: Yup.string()
            .default("")
            .required('Please write down your PO name'),
        room_name: Yup.string()
            .default("")
            .required('Please write down your room name'),
        email: Yup.string()
            .default("")
            .email('E-mail is not valid')
            .required('Please write down your e-mail'),
        phone: Yup.string()
            .default("")
            .required('Please write down your phone number'),
        delivery: Yup.string()
            .default("")
            .required('Please enter your delivery address or write “pick up”'),
        delivery_date: Yup.date()
            .required('Please write down delivery date'),
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

        files: Yup.array()
            .of(Yup.mixed<File>().required())
            .max(MAX_FILES, `You can upload up to ${MAX_FILES} files.`)
            .test(
                'filesSize',
                `Total files size must be no larger than ${MAX_FILE_SIZE_MB} MB.`,
                (files) => {
                    if (!files || !files.length) return true;
                    const files_size = files.reduce((acc, currentFile) => {
                        return acc + currentFile.size
                    }, 0);
                    return files_size <= mb_to_byte(MAX_FILE_SIZE_MB);
                }
            )
            .test(
                'fileType',
                'Only PDF, DOC, DOCX, XLS, XLSX, JPG and PNG files are allowed.',
                (files) =>
                    !files ||
                    files.every(file => ALLOWED_TYPES.includes(file.type))
            ),
    })
}
