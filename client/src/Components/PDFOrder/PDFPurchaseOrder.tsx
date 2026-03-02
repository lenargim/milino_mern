import React, {FC, useMemo} from 'react';
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
import {MaterialStringsType} from "../../common/Materials";
import {CartItemFrontType} from "../../helpers/cartTypes";


const PDFPurchaseOrder: FC<{ values: CheckoutSchemaType, po_rooms_api: RoomOrderType[] }> = ({
                                                                                                 values,
                                                                                                 po_rooms_api
                                                                                             }) => {
    const {additional_emails, name, purchase_order, email, company, delivery_date, phone, delivery} = values
    type ProcessedRoom = {
        name: string;
        materialStrings: MaterialStringsType;
        cartsFront: CartItemFrontType[];
        totalRoomPrice: number;
    };
    const {processedRooms, totalPOPrice} = useMemo(() => {
        return po_rooms_api.reduce<{
            processedRooms: ProcessedRoom[];
            totalPOPrice: number;
        }>(
            (acc, room) => {
                const {carts, ...materials} = room;

                const materialStrings = getMaterialStrings(materials);
                const cartsFront = convertCartAPIToFront(carts, materials);
                const totalRoomPrice = getCartTotal(cartsFront);

                    acc.processedRooms.push({
                        name: room.name,
                        materialStrings,
                        cartsFront,
                        totalRoomPrice,
                    });
                acc.totalPOPrice += totalRoomPrice;
                return acc;
            },
            {
                processedRooms: [],
                totalPOPrice: 0,
            }
        );
    }, [po_rooms_api]);
    return (
        <Document language="en">
            <Page orientation="landscape" style={s.page}>
                <Image style={s.logo} src={logo}/>
                <View>
                    <Text>Name: {name}</Text>
                    <Text>Company: {company}</Text>
                    <Text>Purchase order: {purchase_order}</Text>
                    <Text>Email: {email}</Text>
                    {additional_emails ? additional_emails.map((el, index) => <Text>Additional
                        Email(#{index + 1}): {el}</Text>) : null}
                    <Text>Phone: {phone}</Text>
                    <Text>Delivery address: {delivery}</Text>
                    <Text>Delivery date: {delivery_date?.toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    })}</Text>
                    <Text>Rooms in Purchase order: {po_rooms_api.length}</Text>
                    <Text>Total price (All rooms): ${totalPOPrice.toFixed(1)}</Text>
                </View>
            </Page>
            {processedRooms.map((room, index) => {
                const {
                    materialStrings: {categoryString, doorString, boxString, drawerString, leatherString},
                    cartsFront,
                    totalRoomPrice,
                    name
                } = room;
                return (
                    <Page orientation="landscape" style={s.page} key={index}>
                        <View>
                            <Text style={s.h1}>Room Name: {name}</Text>
                            <View style={s.categoryBlock}>
                                <Text>Category: {categoryString}</Text>
                                <Text>Door: {doorString}</Text>
                                <Text>Box Material: {boxString}</Text>
                                <Text>Drawer: {drawerString}</Text>
                                {leatherString && (
                                    <Text>Leather: {leatherString}</Text>
                                )}
                            </View>
                            <PdfTable cart={cartsFront}/>
                            <View style={s.cartTotal}>
                                <Text>Total ${totalRoomPrice}</Text>
                            </View>
                        </View>
                    </Page>
                )
            })}
        </Document>
    )
};

export default PDFPurchaseOrder;
