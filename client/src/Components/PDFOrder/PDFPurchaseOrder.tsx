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
import PdfRoomMaterials from "./PDFRoomMaterials";
import PDFRoomUserData from "./PDFRoomUserData";


const PDFPurchaseOrder: FC<{ values: CheckoutSchemaType, po_rooms_api: RoomOrderType[] }> = ({
                                                                                                 values,
                                                                                                 po_rooms_api
                                                                                             }) => {
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
                    <PDFRoomUserData values={values} />
                    <Text>Rooms in Purchase order: {po_rooms_api.length}</Text>
                    <Text>Total price (All rooms): ${totalPOPrice.toFixed(1)}</Text>
                </View>
            </Page>
            {processedRooms.map((room, index) => {
                const {
                    materialStrings,
                    cartsFront,
                    totalRoomPrice,
                    name
                } = room;
                return (
                    <Page orientation="landscape" style={s.page} key={index}>
                        <View>
                            <Text style={s.h1}>Room Name: {name}</Text>
                            <PdfRoomMaterials materialStrings={materialStrings}/>
                            <PdfTable cart={cartsFront}/>
                            <View style={s.cartTotal}><Text>Total ${totalRoomPrice}</Text></View>
                        </View>
                    </Page>
                )
            })}
        </Document>
    )
};

export default PDFPurchaseOrder;
