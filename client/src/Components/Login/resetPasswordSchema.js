import * as Yup from "yup";

export const resetPasswordSchema = Yup.object().shape({
  new_password: Yup.string().required('You should type your password').min(5, 'Minimum 5 symbols')
})