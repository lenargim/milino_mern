import * as Yup from "yup";

export const ProfileEditSchema = Yup.object().shape({
    name: Yup.string()
        .required('You should type your name'),
    company: Yup.string()
        .required('You should type your company'),
    phone: Yup.string()
        .required('Please write down your phone number'),
    password: Yup.string().required('You should type your password').min(5, 'Minimum 5 symbols'),
    compare: Yup.string().required('You should type your password').min(5, 'Minimum 5 symbols')
        .oneOf([Yup.ref('password')], "Does not match password")
})