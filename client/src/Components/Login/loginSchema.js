import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('You should type your email')
    .required('You should type your email'),
  password: Yup.string().required('You should type your password').min(5, 'Minimum 5 symbols')
})