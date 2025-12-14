import React, {FC} from 'react';
import {Page, Text, View, Document, Image} from '@react-pdf/renderer';
import {
    convertCartAPIToFront,
    getCartTotal, getMaterialStrings,
} from "../../helpers/helpers";
import logo from '../../assets/img/black-logo.jpg'
import {RoomOrderType} from "../../helpers/roomTypes";
import {s} from "./PDFOrder"
import {CheckoutSchemaType} from "../Checkout/CheckoutSchema";
import PdfTable from "./PDFTable";


const PDFPurchaseOrder: FC<{ values: CheckoutSchemaType, po_rooms_api: RoomOrderType[] }> = ({
                                                                                                 values,
                                                                                                 po_rooms_api
                                                                                             }) => {
    return (
        <Document language="en">
            <Page orientation="landscape" style={s.page}>
                <Image style={s.logo} src={logo}/>
                <View>
                    <Text>Name: {values.name}</Text>
                    <Text>Company: {values.company}</Text>
                    <Text>Purchase order: {values.purchase_order}</Text>
                    <Text>Email: {values.email}</Text>
                    <Text>Phone: {values.phone}</Text>
                    <Text>Delivery address: {values.delivery}</Text>
                    <Text>Delivery date: {values.delivery_date?.toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    })}</Text>
                    <Text>Rooms in Purchase order: {po_rooms_api.length}</Text>
                </View>
            </Page>
            {po_rooms_api.map((room, index) => {
                const {carts, ...materials} = room
                const materialStrings = getMaterialStrings(materials);
                const cart = convertCartAPIToFront(carts, materials);
                return (
                    <Page orientation="landscape" style={s.page} key={index}>
                        <View key={index}>
                            <Text style={s.h1}>Room Name: {room.name}</Text>
                            <View style={s.categoryBlock}>
                                <Text>Category: {materialStrings.categoryString}</Text>
                                <Text>Door: {materialStrings.doorString}</Text>
                                <Text>Box Material: {materialStrings.boxString}</Text>
                                <Text>Drawer: {materialStrings.drawerString}</Text>
                                {materialStrings.leatherString ?
                                    <Text>Leather: {materialStrings.leatherString}</Text> : null}
                            </View>
                            <PdfTable cart={cart}/>
                            <View style={s.cartTotal}><Text>Total ${getCartTotal(cart)}</Text></View>
                        </View>
                    </Page>
                )
            })}
        </Document>
    )
};

export default PDFPurchaseOrder;
