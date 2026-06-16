import React, {FC} from 'react';
import {Text, View} from "@react-pdf/renderer";
import {CheckoutSchemaType} from "../Checkout/CheckoutSchema";

const PdfRoomUserData:FC<{values: CheckoutSchemaType, is_po?:boolean}> = ({values, is_po = false}) => {
    const {company, name, room_name, additional_emails, email, delivery_date, delivery, purchase_order, phone} = values
    return (
        <View>
            <Text>Name: {name}</Text>
            <Text>Company: {company}</Text>
            <Text>Purchase order: {purchase_order}</Text>
            {!is_po ? <Text>Room name: {room_name}</Text> : null}
            <Text>Email: {email}</Text>
            {additional_emails ? additional_emails.map((el, index) => <Text>Additional Email(#{index+1}): {el}</Text>):null}
            <Text>Phone: {phone}</Text>
            <Text>Delivery address: {delivery}</Text>
            <Text>Delivery date: {delivery_date?.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
            })}</Text>
        </View>
    );
};

export default PdfRoomUserData;