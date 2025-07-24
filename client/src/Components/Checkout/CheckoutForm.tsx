import React, {Dispatch, FC, useRef, useState} from 'react';
import {useNavigate, useOutletContext} from "react-router-dom";
import {
    checkoutCartItemWithImg, createOrderFormData, createOrderFormRoomData,
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
import {getPurchaseRoomsOrder, sendOrder} from "../../api/apiFunctions";
import {PurchaseOrdersState} from "../../store/reducers/purchaseOrderSlice";
import PDFPurchaseOrder from "../PDFOrder/PDFPurchaseOrder";
import CheckoutButtonRow from "./CheckoutButtonRow";

export type ButtonType = 'save-room' | 'send-room' | 'save-po' | 'send-po';
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
    const [room] = useOutletContext<[RoomFront]>();
    const {user} = useAppSelector<UserState>(state => state.user)!
    const {active_po} = useAppSelector<PurchaseOrdersState>(state => state.purchase_order)
    const {cart_items} = useAppSelector<RoomsState>(state => state.room)!
    const {_id, purchase_order_id, activeProductCategory, ...materials} = room;

    const handleSubmit = async (values: CheckoutFormValues) => {
        const button_type = clickedButtonRef.current;
        if (!button_type || !cart_items) return;
        const date = new Date().toLocaleString('ru-RU', {dateStyle: "short"});
        const fileName = `${textToLink(values.purchase_order)}.${date}`;

        switch (button_type) {
            case "save-room": {
                const cartWithJPG = checkoutCartItemWithImg(cart_items);
                const room_blob = await pdf(<PDFOrder values={values}
                                                      materialStrings={materialStrings}
                                                      cart={cartWithJPG}/>).toBlob();
                saveAs(room_blob, `${fileName}.pdf`);
                break;
            }
            case "save-po": {
                const po_rooms_api = await getPurchaseRoomsOrder(purchase_order_id);
                if (!po_rooms_api) return;
                const po_blob = await pdf(<PDFPurchaseOrder values={values} po_rooms_api={po_rooms_api}/>).toBlob();
                saveAs(po_blob, `${fileName}.pdf`);
                break;
            }
            case "send-room": {
                const cartWithJPG = checkoutCartItemWithImg(cart_items);
                const room_blob = await pdf(<PDFOrder values={values}
                                                      materialStrings={materialStrings}
                                                      cart={cartWithJPG}/>).toBlob();
                const RoomFormData = await createOrderFormRoomData(room, cart_items, room_blob, values, fileName, date);
                const res = await sendOrder(RoomFormData, textToLink(company));
                if (res?.status === 201) setIsModalOpen(true);
                break;

            }
            case "send-po": {
                const po_rooms_api = await getPurchaseRoomsOrder(purchase_order_id);
                if (!po_rooms_api) return;
                const po_blob = await pdf(<PDFPurchaseOrder values={values} po_rooms_api={po_rooms_api}/>).toBlob();
                const POFormData = await createOrderFormData(po_rooms_api, po_blob, values, fileName, date);
                const res = await sendOrder(POFormData, textToLink(company));
                if (res?.status === 201) setIsModalOpen(true);
                break;
            }
        }
    }

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
                <CheckoutButtonRow clickedButtonRef={clickedButtonRef} handleSubmit={handleSubmit}
                                   purchase_order_id={purchase_order_id}/>
            </Form>
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