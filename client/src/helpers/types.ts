import * as Yup from 'yup'
import {CheckoutSchema} from "../Components/Checkout/CheckoutSchema";
import {SignUpSchema} from "../Components/SignUp/signUpSchema";

export type BaseCabinetsType = Yup.InferType<any>
export type CheckoutType = Yup.InferType<typeof CheckoutSchema>
export type SignUpType = Yup.InferType<typeof SignUpSchema>
