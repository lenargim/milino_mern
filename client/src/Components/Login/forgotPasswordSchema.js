import * as Yup from "yup";

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('You should type your email')
    .required('You should type your email')
})