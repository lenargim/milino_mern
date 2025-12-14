import React, {FC} from 'react';
import {Page, Text, View, Document, StyleSheet, Image} from '@react-pdf/renderer';
import {
    getCartTotal,
} from "../../helpers/helpers";
import logo from '../../assets/img/black-logo.jpg'
import {MaterialStringsType} from "../../common/Materials";
import {CartItemFrontType} from "../../helpers/cartTypes";
import {CheckoutSchemaType} from "../Checkout/CheckoutSchema";
import PdfTable from "./PDFTable";


export const s = StyleSheet.create({
    page: {
        padding: '2vh 2vw',
        display: "flex",
        flexDirection: "column",
        gap: "3vh"
    },
    logo: {
        width: '200px',
        margin: '30px auto'
    },
    table: {
        display: 'flex',
        flexDirection: "column",
        borderTop: '1px solid #000',
        borderLeft: '1px solid #000',
        borderRight: '1px solid #000',
        borderRadius: '3px',
    },
    cartItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        gap: '15px',
        padding: '0.5vw',
        borderBottom: "1px solid #000"
    },
    itemPrice: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: "center",
        width: '15vw'
    },
    img: {
        display: "flex",
        maxWidth: "20vw"
    },
    data: {
        width: '50vw'
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'semibold',
        paddingBottom: 10
    },
    categoryBlock: {
        marginBottom: '25px'
    },
    category: {
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "italic",
        color: "gray",
        marginBottom: '3px'
    },
    note: {
        paddingTop: '6pt',
        fontSize: '13px',
        fontStyle: 'italic'
    },
    sum: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        fontSize: '18px',
        fontWeight: 'semibold',
        lineHeight: 1.2,
        width: '10vw'
    },
    th0: {
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        fontSize: 12,
        width: "2vw",
        borderRight: '1px solid #000'
    },
    th1: {
        fontSize: 12,
        width: '20vw'
    },
    th2: {
        fontSize: 12,
        width: '50vw'
    },
    th3: {
        fontSize: 12,
        width: '15vw'

    },
    th4: {
        fontSize: 12,
        width: '10vw'
    },
    cartTotal: {
        fontSize: '20px',
        flexDirection: "row",
        justifyContent: "flex-end",
        height: '30px',
        width: '100%',
        textAlign: 'right',
        paddingRight: '5px'
    },
    itemOption: {
        display: "flex",
        flexDirection: "row",
        gap: '5px',
        fontSize: 12
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 8, // работает в v9
        fontSize: 12
    },
    label: {
        flexShrink: 0, // чтобы не сжимался
    },
    list: {
        textAlign: 'right', // выравнивание строк
        lineHeight: 1.2,
        flexGrow: 1, // занимает всё оставшееся место
    },
    itemOptionBold: {
        flexDirection: "row",
        textAlign: 'left',
        fontSize: 14,
        fontWeight: 700,
        paddingBottom: 3
    },
    itemOptionCustom: {
        fontSize: 12,
        fontWeight: 700,
        color: '#CB4141'
    },
    blocks: {
        display: "flex",
        flexDirection: "column",
        gap: '10px',
    },
    h1: {
        fontSize: '20px',
        fontWeight: 700,
        marginBottom: '25px',
    },
    h2: {
        fontSize: '14px',
        marginBottom: '5px'
    },
    red: {
        fontSize: 12,
        color: '#CB4141'
    },
    non: {
        fontSize: '14px',
        color: '#CB4141'
    }
})

const PDFOrder: FC<{ values: CheckoutSchemaType, cart: CartItemFrontType[], materialStrings: MaterialStringsType }> = ({
                                                                                                                     values,
                                                                                                                     cart,
                                                                                                                     materialStrings
                                                                                                                 }) => (
    <Document language="en">
        <Page orientation="landscape" style={s.page}>
            <Image style={s.logo} src={logo}/>
            <View>
                <Text>Name: {values.name}</Text>
                <Text>Company: {values.company}</Text>
                <Text>Purchase order: {values.purchase_order}</Text>
                <Text>Room name: {values.room_name}</Text>
                <Text>Email: {values.email}</Text>
                <Text>Phone: {values.phone}</Text>
                <Text>Delivery address: {values.delivery}</Text>
                <Text>Delivery date: {values.delivery_date?.toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                })}</Text>
            </View>
            <View>
                <Text>Category: {materialStrings.categoryString}</Text>
                {materialStrings.doorString ? <Text>Door: {materialStrings.doorString}</Text> : null}
                {materialStrings.boxString ? <Text>Box Material: {materialStrings.boxString}</Text> : null}
                {materialStrings.drawerString ? <Text>Drawer: {materialStrings.drawerString}</Text> : null}
                {materialStrings.leatherString ? <Text>Leather: {materialStrings.leatherString}</Text> : null}
                {materialStrings.rod ? <Text>Hanging Rod: {materialStrings.rod}</Text> : null}
            </View>
        </Page>
        <Page orientation="landscape" style={s.page}>
            <PdfTable cart={cart} />
            <View style={s.cartTotal}><Text>Total ${getCartTotal(cart)}</Text></View>
        </Page>
    </Document>
);

export default PDFOrder;
