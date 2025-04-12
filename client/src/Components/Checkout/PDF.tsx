import React, {FC} from 'react';
import {Page, Text, View, Document, StyleSheet, Image} from '@react-pdf/renderer';
import {CheckoutType} from "../../helpers/types";
import {
    getCartItemImgPDF,
    getCartTotal, getCustomCabinetString,
    getCustomPartById,
    getProductById
} from "../../helpers/helpers";
import logo from './../../assets/img/black-logo.jpg'
import {CartItemType} from "../../api/apiFunctions";
import {MaterialStringsType} from "../../common/Materials";
import CartItemOptions from "./PDF/CartItemOptions";


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
    itemOptionBold: {
        flexDirection: "row",
        textAlign: 'left',
        fontSize: 14,
        fontWeight: 700,
        paddingBottom: 3
    },
    itemOptionCustom: {
        fontSize: 12,
        color: '#CB4141'
    },
    blocks: {
        display: "flex",
        flexDirection: "column",
        gap: '5px',
    },
    h2: {
        fontSize: '14px',
        marginBottom: '5px'
    },
    non: {
        fontSize: '14px',
        color: '#CB4141'
    }
})

const PDF: FC<{ values: CheckoutType, cart: CartItemType[], materialStrings: MaterialStringsType }> = ({
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
                <Text>Project: {values.project}</Text>
                <Text>Email: {values.email}</Text>
                <Text>Phone: {values.phone}</Text>
                <Text>Delivery address: {values.delivery}</Text>
            </View>
            <View>
                <Text>Category: {materialStrings.categoryString}</Text>
                <Text>Door: {materialStrings.doorString}</Text>
                <Text>Box Material: {materialStrings.boxString}</Text>
                <Text>Drawer: {materialStrings.drawerString}</Text>
                {materialStrings.leather ? <Text>Leather: {materialStrings.leather}</Text> : null}
            </View>
        </Page>
        <Page orientation="landscape" style={s.page}>
            <View style={s.table}>
                <View style={s.cartItem}>
                    <View style={s.th0}><Text>#</Text></View>
                    <View style={s.th1}><Text>Img</Text></View>
                    <View style={s.th2}><Text>Description</Text></View>
                    <View style={s.th3}><Text>Price</Text></View>
                    <View style={s.th4}><Text>Product total</Text></View>
                </View>
                {cart.map((el, index) => {
                    const {product_id, product_type, image_active_number, isStandard} = el;
                    const product = product_type !== 'custom'
                        ? getProductById(product_id, product_type === 'standard')
                        : getCustomPartById(product_id);
                    if (!product) return;
                    const {name} = product;
                    const img = getCartItemImgPDF(product, image_active_number);
                    return (
                        <View wrap={false} style={s.cartItem} key={index}>
                            <View style={s.th0}><Text>{++index}</Text></View>
                            <View style={s.img}>
                                <Image src={img}/>
                            </View>
                            <View style={s.data}>
                                <Text style={s.itemName}>
                                    <Text>{name}</Text> {getCustomCabinetString(isStandard) && <Text style={s.non}>{getCustomCabinetString(isStandard)}</Text>}
                                </Text>
                                <CartItemOptions item={el}/>
                                {el.note ? <Text style={s.note}>*{el.note}</Text> : null}
                            </View>
                            <View style={s.itemPrice}>
                                <Text>{el.price}$ x {el.amount}</Text>
                            </View>
                            <View style={s.sum}>
                                <Text>{(el.price * el.amount).toFixed(1)}$</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
            <View style={s.cartTotal}><Text>Total ${getCartTotal(cart)}</Text></View>
        </Page>
    </Document>
);

export default PDF;
