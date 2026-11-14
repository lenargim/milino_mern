import React, {FC, useMemo} from 'react';
import {Page, Text, View, Document, Image} from '@react-pdf/renderer';
import {
    convertCartAPIToFront, getMaterialStrings,
} from "../../helpers/helpers";
import logo from '../../assets/img/black-logo.jpg'
import {RoomOrderType} from "../../helpers/roomTypes";
import {s} from "./PDFOrder"
import {MaterialStringsType} from "../../common/Materials";
import {CartItemFrontType} from "../../helpers/cartTypes";
import PdfRoomMaterials from "./PDFRoomMaterials";
import PDFRoomUserData from "./PDFRoomUserData";
import {CheckoutFormType} from "../Checkout/CheckoutForm";
import PdfTableNoPrice from "./PDFTableNoPrice";


const PDFPurchaseOrderNoPrice: FC<{ values: CheckoutFormType, po_rooms_api: RoomOrderType[] }> = ({
                                                                                                 values,
                                                                                                 po_rooms_api
                                                                                             }) => {
    type ProcessedRoom = {
        name: string;
        materialStrings: MaterialStringsType;
        cartsFront: CartItemFrontType[];
    };
    const {processedRooms} = useMemo(() => {
        return po_rooms_api.reduce<{
            processedRooms: ProcessedRoom[];

        }>(
            (acc, room) => {
                const {carts, ...materials} = room;

                const materialStrings = getMaterialStrings(materials);
                const cartsFront = convertCartAPIToFront(carts, materials);

                acc.processedRooms.push({
                    name: room.name,
                    materialStrings,
                    cartsFront,
                });
                return acc;
            },
            {
                processedRooms: []
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
                </View>
            </Page>
            {processedRooms.map((room, index) => {
                const {
                    materialStrings,
                    cartsFront,
                    name
                } = room;
                return (
                    <Page orientation="landscape" style={s.page} key={index}>
                        <View>
                            <Text style={s.h1}>Room Name: {name}</Text>
                            <PdfRoomMaterials materialStrings={materialStrings}/>
                            <PdfTableNoPrice cart={cartsFront}/>
                        </View>
                    </Page>
                )
            })}
        </Document>
    )
};

export default PDFPurchaseOrderNoPrice;
