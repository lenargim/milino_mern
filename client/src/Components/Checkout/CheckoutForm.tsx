import React, {Dispatch, FC, useRef, useState} from 'react';
import {useNavigate, useOutletContext} from "react-router-dom";
import {
    checkoutCartItemWithImg, createOrderFormData,
    getCartTotal,
    getMaterialStrings, textToLink,
    useAppSelector
} from "../../helpers/helpers";
import {CheckoutSchema} from "./CheckoutSchema";
import {pdf} from "@react-pdf/renderer";
import PDFOrder from "../PDFOrder/PDFOrder";
import {saveAs} from "file-saver";
import {Form, Formik} from "formik";
import s from "./checkout.module.sass";
import {PhoneInput, TextInput} from "../../common/Form";
import CheckoutCart from "./CheckoutCart";
import {MaybeNull} from "../../helpers/productTypes";
import {RoomFront} from "../../helpers/roomTypes";
import {RoomsState} from "../../store/reducers/roomSlice";
import {UserState} from "../../store/reducers/userSlice";
import {sendOrder} from "../../api/apiFunctions";
import {PurchaseOrdersState} from "../../store/reducers/purchaseOrderSlice";
import {CartOrder} from "../../helpers/cartTypes";

type ButtonType = 'purchase' | 'room' | 'send';
export type CheckoutFormValues = {
    name: string,
    company: string,
    email: string,
    phone: string,
    purchase_order: string,
    room_name: string,
    delivery: string
}
const CheckoutForm: FC = () => {
    const navigate = useNavigate();
    const clickedButtonRef = useRef<MaybeNull<ButtonType>>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const handleButtonClick = (type: ButtonType) => {
        clickedButtonRef.current = type;
    }
    const handleSubmit = async (values: CheckoutFormValues) => {
        const button_type = clickedButtonRef.current;
        if (!button_type || !cart_items) return;
        const date = new Date().toLocaleString('ru-RU', {dateStyle: "short"});
        const fileName = `${textToLink(values.purchase_order)}.${date}`;
        const cartWithJPG = checkoutCartItemWithImg(cart_items);
        const blob = await pdf(<PDFOrder values={values} materialStrings={materialStrings}
                                         cart={cartWithJPG}/>).toBlob();
        const cart_orders:CartOrder[] = cart_items.map((el) => {
            const {subcategory, isStandard, image_active_number, _id, room_id, ...cart_order_item} = el;
            return cart_order_item;
        })
        const formData = await createOrderFormData(blob, values, cart_orders, materials, fileName, date);
        switch (button_type) {
            case "purchase": {

                break;
            }
            case "room": {
                saveAs(blob, `${fileName}.pdf`);
                break;
            }
            case "send": {
                const res = await sendOrder(formData, textToLink(company));
                if (res && res.status === 201) setIsModalOpen(true);
                break;
            }
        }
    }
    const [room] = useOutletContext<[RoomFront]>();
    const {user} = useAppSelector<UserState>(state => state.user)!
    const {active_po} = useAppSelector<PurchaseOrdersState>(state => state.purchase_order)
    const {cart_items} = useAppSelector<RoomsState>(state => state.room)!
    const {_id, purchase_order_id, activeProductCategory, ...materials} = room;
    const total = getCartTotal(cart_items);
    const materialStrings = getMaterialStrings(materials);
    if (!user || !active_po || !cart_items) return null;
    const {name, company, email, phone} = user;
    if (!cart_items.length) navigate(-1);
    const initialValues: CheckoutFormValues = {
        name,
        company,
        email,
        phone,
        purchase_order: active_po,
        room_name: room.name,
        delivery: ''
    };
    return (
        <Formik initialValues={initialValues}
                validationSchema={CheckoutSchema}
                onSubmit={handleSubmit}
        >
            {({isSubmitting}) => {
                return (
                    <Form className={[s.form].join(' ')}>
                        <h1>Checkout</h1>
                        <div className={s.block}>
                            {isModalOpen ? <EmailWasSent setIsModalOpen={setIsModalOpen}/> : null}
                            <TextInput type="text" name="name" label="Name"/>
                            <TextInput type="text" name="company" label="Company"/>
                            <TextInput type="text" name="purchase_order" label="PO name"/>
                            <TextInput type="text" name="room_name" label="Room name"/>
                            <TextInput type="email" name="email" label="E-mail"/>
                            <PhoneInput type="text" name="phone" label="Phone number"/>
                            <TextInput type="text" name="delivery" label="Delivery address"/>
                        </div>
                        <CheckoutCart cart={cart_items} total={total}/>
                        <div className={s.buttonRow}>
                            <button type="submit"
                                    onClick={() => handleButtonClick('purchase')}
                                    className={['button yellow'].join(' ')}
                                    disabled={isSubmitting}>Purchase PDF
                            </button>
                            <button type="submit"
                                    onClick={() => handleButtonClick('room')}
                                    className={['button yellow'].join(' ')}
                                    disabled={isSubmitting}>Room PDF
                            </button>
                            <button type="submit"
                                    onClick={() => handleButtonClick('send')}
                                    className={['button yellow'].join(' ')}
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

const EmailWasSent: FC<{ setIsModalOpen: Dispatch<boolean> }> = ({setIsModalOpen}) => {
    const navigate = useNavigate();
    setTimeout(() => {
        setIsModalOpen(false)
        navigate(`/profile/purchase`)
    }, 4000)
    return (
        <div className={s.notificationWrap}>
            <div className={s.notification}>Email was sent. Thank you!</div>
        </div>
    )
}