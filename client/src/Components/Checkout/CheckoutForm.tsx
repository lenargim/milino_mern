import {Form, Formik, FormikProps} from 'formik';
import React, {Dispatch, FC, useRef, useState} from 'react';
import {PhoneInput, TextInput} from "../../common/Form";
import {getProductById, useAppDispatch} from "../../helpers/helpers";
import s from './checkout.module.sass'
import {CheckoutSchema} from "./CheckoutSchema";
import {CheckoutType} from "../../helpers/types";
import {removeCart, setMaterials} from "../../store/reducers/generalSlice";
import CheckoutCart from "./CheckoutCart";
import {pdf} from '@react-pdf/renderer';
import PDF from "./PDF";
import {saveAs} from "file-saver";
import {checkoutAPI,} from "../../api/api";
import {MaterialsFormType} from "../../common/MaterialsForm";
import {MaybeNull} from "../../helpers/productTypes";
import {CartItemType} from "../../api/apiFunctions";

export type buttonType = 'download' | 'send';
type modalType = { open: boolean, status: string }
type CheckoutFormType = {
    cart: CartItemType[], total: number,
    materials: MaterialsFormType
}
const CheckoutForm: FC<CheckoutFormType> = ({
                                                cart,
                                                total,
                                                materials
                                            }) => {
    const initialValues: CheckoutType = {
        company: '',
        project: '',
        email: '',
        phone: ''
    };

    const [buttonType, setButtonType] = useState<MaybeNull<buttonType>>(null)
    const jpgCart = cart.map(el => {
        const product = getProductById(el.product_id);
        if (product) {
            const {images} = product
            const img = images[el.image_active_number - 1].value
            return ({...el, img: img.replace('webp', 'jpg')})
        }
        return el
    })
    const formRef = useRef<FormikProps<CheckoutType>>(null);
    const [modal, setModal] = useState<modalType>({open: false, status: ''});
    const handleSubmit = async (type: buttonType) => {
        if (formRef.current) {
            setButtonType(type)
            formRef.current.handleSubmit();
        }
    }

    return (
        <Formik initialValues={initialValues}
                validationSchema={CheckoutSchema}
                innerRef={formRef}
                onSubmit={async (values, {resetForm}) => {
                    const date = new Date().toLocaleString('ru-RU', {dateStyle: "short"});
                    const fileName = `Milino Order ${date}(${values.company} ${values.project}).pdf`;
                    const blob = await pdf(<PDF values={values} cart={jpgCart}/>).toBlob();
                    const formData = new FormData();
                    const pdfFile = new File([blob], fileName, {type: "application/pdf"})
                    formData.append("file", pdfFile);
                    if (buttonType) {
                        formData.append("buttonType", buttonType)
                    }
                    try {
                        const serverResponse = await checkoutAPI.postEmail(formData)
                        if (serverResponse.status === 201) {
                            resetForm();
                            setModal({open: true, status: 'Email was sended!\n\nThank you'})
                        }
                    } catch (e) {
                        alert(e);
                    }
                    if (buttonType === 'download') saveAs(blob, fileName);
                }}
        >
            {({isSubmitting}) => {
                return (
                    <Form className={[s.form].join(' ')}>
                        <h1>Checkout</h1>
                        <div className={s.block}>
                            {modal.open ? <EmailWasSended status={modal.status} setModal={setModal}/> : null}
                            <TextInput type="text" name="company" label="Company name"/>
                            <TextInput type="text" name="project" label="Project name"/>
                            <TextInput type="email" name="email" label="E-mail"/>
                            <PhoneInput type="text" name="phone" label="Phone number"/>
                        </div>
                        <CheckoutCart cart={cart} total={total}/>
                        <div className={s.buttonRow}>
                            <button type="button"
                                    onClick={() => handleSubmit('download')}
                                    className={['button yellow', s.submit].join(' ')}
                                    disabled={isSubmitting}>Download PDF
                            </button>
                            <button type="button"
                                    onClick={() => handleSubmit('send')}
                                    className={['button yellow', s.submit].join(' ')}
                                    disabled={isSubmitting}>Send PDF To Email
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    );
};

export default CheckoutForm;

type EmailWasSendedType = {
    status: string,
    setModal: Dispatch<modalType>
}

const EmailWasSended: FC<EmailWasSendedType> = ({status, setModal}) => {
    const dispatch = useAppDispatch();
    localStorage.removeItem('materials')
    localStorage.removeItem('category')
    setTimeout(() => {
        setModal({open: false, status: ''})
        dispatch(setMaterials(null));
        dispatch(removeCart())
    }, 4000)

    return (
        <div className={s.notificationWrap}>
            <div className={s.notification}>
                {status}
            </div>
        </div>
    )
}
