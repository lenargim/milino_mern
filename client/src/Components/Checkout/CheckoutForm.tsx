import React, {Dispatch, FC, useEffect, useRef, useState} from 'react';
import {useNavigate, useOutletContext} from "react-router-dom";
import {RoomTypeAPI} from "../../store/reducers/roomSlice";
import {
    checkoutCartItemWithImg,
    getCartArrFront,
    getCartTotal,
    getMaterialStrings,
    useAppSelector
} from "../../helpers/helpers";
import {UserType, UserTypeCheckout} from "../../api/apiTypes";
import {CheckoutSchema} from "./CheckoutSchema";
import {pdf} from "@react-pdf/renderer";
import PDFOrder from "../PDFOrder/PDFOrder";
import {OrderAPIType} from "../../api/apiFunctions";
import {checkoutAPI} from "../../api/api";
import {saveAs} from "file-saver";
import {Form, Formik, FormikProps} from "formik";
import s from "./checkout.module.sass";
import {PhoneInput, TextInput} from "../../common/Form";
import CheckoutCart from "./CheckoutCart";
import {CheckoutType} from "../../helpers/types";
import {MaybeNull} from "../../helpers/productTypes";

export type buttonType = 'download' | 'send';
type modalType = {
    open: boolean,
    status: string
}

const CheckoutForm: FC = () => {
    const formRef = useRef<FormikProps<CheckoutType>>(null);
    const handleSubmit = async (type: buttonType) => {
        if (formRef.current) {
            setButtonType(type)
            formRef.current.handleSubmit();
        }
    }
    const [buttonType, setButtonType] = useState<MaybeNull<buttonType>>(null);
    const [roomData] = useOutletContext<[RoomTypeAPI]>();
    const {_id, cart, ...materials} = roomData;
    const navigate = useNavigate();
    const cartFront = getCartArrFront(cart, roomData)
    const total = getCartTotal(cartFront);
    const user: UserType = useAppSelector(state => state.user.user);
    const [initialValues, setInitialValues] = useState<UserTypeCheckout>({
        name: user.name,
        company: user.company,
        email: user.email,
        phone: user.phone,
        project: roomData.room_name,
        delivery: ''
    })
    useEffect(() => {
        setInitialValues({
            ...initialValues,
            name: user.name,
            company: user.company,
            email: user.email,
            phone: user.phone
        })
    }, [user])
    if (!cart.length) navigate(-1);
    const [modal, setModal] = useState<modalType>({open: false, status: ''});
    const materialStrings = getMaterialStrings(materials);
    if (!initialValues.email) return null;
    const cartWithJPG = checkoutCartItemWithImg(cartFront);
    return (
        <Formik initialValues={initialValues}
                validationSchema={CheckoutSchema}
                innerRef={formRef}
                onSubmit={async (values, {resetForm}) => {
                    const date = new Date().toLocaleString('ru-RU', {dateStyle: "short"});
                    const fileName = `Milino Order ${date}(${values.company} ${values.project})`;
                    const blob = await pdf(<PDFOrder values={values} materialStrings={materialStrings}
                                                     cart={cartWithJPG}/>).toBlob();
                    const order: OrderAPIType[] = cart;
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
                            {modal.open ? <EmailWasSent status={modal.status} setModal={setModal}/> : null}
                            <TextInput type="text" name="name" label="Name"/>
                            <TextInput type="text" name="company" label="Company"/>
                            <TextInput type="text" name="project" label="Project name"/>
                            <TextInput type="email" name="email" label="E-mail"/>
                            <PhoneInput type="text" name="phone" label="Phone number"/>
                            <TextInput type="text" name="delivery" label="Delivery address"/>
                        </div>
                        <CheckoutCart cart={cartFront} total={total}/>
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

type EmailWasSentType = {
    status: string,
    setModal: Dispatch<modalType>
}

const EmailWasSent: FC<EmailWasSentType> = ({status, setModal}) => {
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