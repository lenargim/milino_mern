import React, {FC} from 'react';
import {Page, Text, View, Document, StyleSheet, Image} from '@react-pdf/renderer';
import logo from '../../assets/img/black-logo.jpg'
import {MaterialStringsType} from "../../common/Materials";
import {CartItemFrontType} from "../../helpers/cartTypes";
import PdfRoomMaterials from "./PDFRoomMaterials";
import PDFRoomUserData from "./PDFRoomUserData";
import {CheckoutFormType} from "../Checkout/CheckoutForm";
import {s} from './PDFOrder'
import PdfTableNoPrice from "./PDFTableNoPrice";

const PDFOrderNoPrice: FC<{ values: CheckoutFormType, cart: CartItemFrontType[], materialStrings: MaterialStringsType }> = ({
                                                                                                                     values,
                                                                                                                     cart,
                                                                                                                     materialStrings
                                                                                                                 }) => (
    <Document language="en">
        <Page orientation="landscape" style={s.page}>
            <Image style={s.logo} src={logo}/>
            <PDFRoomUserData values={values} />
            <PdfRoomMaterials materialStrings={materialStrings} />
        </Page>
        <Page orientation="landscape" style={s.page}>
            <PdfTableNoPrice cart={cart} />
        </Page>
    </Document>
);

export default PDFOrderNoPrice;
