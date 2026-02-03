import * as Yup from 'yup';

export const CheckoutSchema = Yup.object({
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
})

export type CheckoutSchemaType = Yup.InferType<typeof CheckoutSchema>;