import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .required('You should type your name'),
  email: Yup.string()
    .email('You should type your email')
    .required('You should type your email'),
  phone: Yup.string()
    .required('Please write down your phone number'),
  password: Yup.string().required('You should type your password').min(5, 'Minimum 5 symbols')
})