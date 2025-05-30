import React, {Dispatch, FC, useRef, useState} from 'react';
import {
    getCartItemImg,
    getCustomPartById,
    getMaterialStrings,
    getProductById,
} from "../../helpers/helpers";
import {Form, Formik, FormikProps} from 'formik';
import {PhoneInput, TextInput} from "../../common/Form";
import s from './checkout.module.sass'
import {CheckoutSchema} from "./CheckoutSchema";
import {CheckoutType} from "../../helpers/types";
import CheckoutCart from "./CheckoutCart";
import {pdf} from '@react-pdf/renderer';
import PDF from "./PDF";
import {saveAs} from "file-saver";
import {checkoutAPI} from "../../api/api";
import {MaterialsFormType} from "../../common/MaterialsForm";
import {MaybeNull, OrderType} from "../../helpers/productTypes";
import {CartItemType} from "../../api/apiFunctions";
import {useNavigate} from "react-router-dom";

export type buttonType = 'download' | 'send';
type modalType = {
    open: boolean,
    status: string
}
type CheckoutFormType = {
    cart: CartItemType[],
    total: number,
    materials: MaterialsFormType,
    initialValues: CheckoutType,
    room_id?: string
}

const CheckoutForm: FC<CheckoutFormType> = ({
                                                cart,
                                                total,
                                                materials,
                                                room_id,
                                                initialValues
                                            }) => {

    const [buttonType, setButtonType] = useState<MaybeNull<buttonType>>(null);
    const jpgCart = cart.map(el => {
        const {product_id, product_type, image_active_number} = el
        const product = product_type !== 'custom'
            ? getProductById(product_id, product_type === 'standard')
            : getCustomPartById(product_id);

        if (product) {
            const img = getCartItemImg(product, image_active_number)
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
    const materialStrings = getMaterialStrings(materials);
    if (!initialValues.email) return null;
    return (
        <Formik initialValues={initialValues}
                validationSchema={CheckoutSchema}
                innerRef={formRef}
                onSubmit={async (values, {resetForm}) => {
                    const date = new Date().toLocaleString('ru-RU', {dateStyle: "short"});
                    const fileName = `Milino Order ${date}(${values.company} ${values.project})`;
                    const blob = await pdf(<PDF values={values} materialStrings={materialStrings}
                                                cart={jpgCart}/>).toBlob();
                    const order: OrderType[] = cart.map(el => ({
                        product_id: el.product_id,
                        price: el.price,
                        amount: el.amount,
                        width: el.width,
                        height: el.height,
                        depth: el.depth,
                        blind_width: el.blind_width,
                        middle_section: el.middle_section,
                        corner: el.corner,
                        hinge: el.hinge,
                        options: el.options,
                        shelf_option: el.shelf_option,
                        led_border: el.led_border,
                        led_alignment: el.led_alignment,
                        led_indent: el.led_indent,
                        material: el.material,
                        glass_door: el.glass_door,
                        glass_shelf: el.glass_shelf,
                        led_accessories: el.led_accessories,
                        door_accessories: el.door_accessories,
                        standard_door: el.standard_door,
                        note: el.note,
                    }))
                    const dataToJSON = {
                        date: date,
                        contact: values,
                        materials,
                        order
                    };
                    const formData = new FormData();
                    const pdfFile = new File([blob], `${fileName}.pdf`, {type: "application/pdf"});
                    formData.append("pdf", pdfFile);
                    const blob2 = await new Blob([JSON.stringify(dataToJSON)], {type: 'application/json'});
                    const JsonFile = new File([blob2], `${fileName}.txt`);
                    formData.append("json", JsonFile);
                    formData.append("client_email", values.email);
                    formData.append("client_name", values.name);
                    formData.append("client_room_name", values.project);

                    if (buttonType) {
                        formData.append("buttonType", buttonType)
                    }

                    try {
                        const serverResponse = await checkoutAPI.postEmail(formData);
                        if (serverResponse.data.type === 'send') {
                            if (serverResponse.status === 201) {
                                setModal({open: true, status: 'Email was sent. Thank you!'})
                            } else {
                                alert('Email was not sent')
                            }
                        }
                    } catch (e) {
                        alert(e);
                    }
                    if (buttonType === 'download') saveAs(blob, `${fileName}.pdf`);
                }}
        >
            {({isSubmitting}) => {
                return (
                    <Form className={[s.form].join(' ')}>
                        <h1>Checkout</h1>
                        <div className={s.block}>
                            {modal.open ? <EmailWasSended status={modal.status} setModal={setModal}/> : null}
                            <TextInput type="text" name="name" label="Name"/>
                            <TextInput type="text" name="company" label="Company"/>
                            <TextInput type="text" name="project" label="Project name"/>
                            <TextInput type="email" name="email" label="E-mail"/>
                            <PhoneInput type="text" name="phone" label="Phone number"/>
                            <TextInput type="text" name="delivery" label="Delivery address"/>
                        </div>
                        <CheckoutCart cart={cart} total={total} room_id={room_id}/>
                        <div className={s.buttonRow}>
                            <button type="button"
                                    onClick={() => handleSubmit('download')}
                                    className={['button yellow', s.submit].join(' ')}
                                    disabled={isSubmitting}>Download PDF
                            </button>
                            <button type="button"
                                    onClick={() => handleSubmit('send')}
                                    className={['button yellow', s.submit].join(' ')}
                                    disabled={isSubmitting}>Submit Order
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
    const navigate = useNavigate();
    setTimeout(() => {
        setModal({open: false, status: ''})
        navigate(`/profile/rooms`)
    }, 4000)

    return (
        <div className={s.notificationWrap}>
            <div className={s.notification}>
                {status}
            </div>
        </div>
    )
}
