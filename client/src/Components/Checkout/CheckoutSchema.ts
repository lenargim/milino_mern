import * as Yup from 'yup';

export const CheckoutSchema = Yup.object({
    name: Yup.string()
        .default("")
        .required('Please write down your name'),
    company: Yup.string()
        .default("")
        .required('Please write down your company name'),
    project: Yup.string()
        .default("")
        .required('Please write down your project name'),
    email: Yup.string()
        .default("")
        .email('E-mail is not valid')
        .required('Please write down your e-mail'),
    phone: Yup.string()
        .default("")
        .required('Please write down your phone number'),
    delivery: Yup.string()
        .default("")
        .required('Please write down your phone number')
})