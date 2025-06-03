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
        .required('Please enter your delivery address or write “pick up”')
})