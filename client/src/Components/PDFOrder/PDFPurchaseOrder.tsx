import React, {FC} from 'react';
import {Page, Text, View, Document, Image} from '@react-pdf/renderer';
import {CheckoutType} from "../../helpers/types";
import {
    convertCartAPIToFront,
    getCartItemImgPDF,
    getCartTotal, getCustomCabinetString, getMaterialStrings,
    getProductById
} from "../../helpers/helpers";
import logo from '../../assets/img/black-logo.jpg'
import CartItemOptions from "./CartItemOptions";
import {RoomOrderType} from "../../helpers/roomTypes";
import {s} from "./PDFOrder"


const PDFPurchaseOrder: FC<{ values: CheckoutType, po_rooms_api: RoomOrderType[] }> = ({
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
                                {materialStrings.leatherString ? <Text>Leather: {materialStrings.leatherString}</Text> : null}
                            </View>
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
                                    const product = getProductById(product_id, product_type === 'standard');
                                    if (!product) return;
                                    const {name, images} = product;
                                    const img = getCartItemImgPDF(images, image_active_number);
                                    return (
                                        <View wrap={false} style={s.cartItem} key={index}>
                                            <View style={s.th0}><Text>{++index}</Text></View>
                                            <View style={s.img}>
                                                <Image src={img}/>
                                            </View>
                                            <View style={s.data}>
                                                <Text style={s.itemName}>
                                                    <Text>{name}</Text> {getCustomCabinetString(isStandard) &&
                                                <Text style={s.non}>{getCustomCabinetString(isStandard)}</Text>}
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
                        </View>
                    </Page>
                )
            })}
        </Document>
    )
};

export default PDFPurchaseOrder;
