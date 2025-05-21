import React from 'react';
import ProfileRooms from "../Room/ProfileRooms";
import {useParams} from "react-router-dom";
import {textToLink, useAppSelector} from "../../helpers/helpers";
import {PurchaseOrderType} from "../../store/reducers/purchaseOrderSlice";
import {MaybeUndefined} from "../../helpers/productTypes";

const PurchaseOrderItem = () => {
    let { name } = useParams();
    const {purchase_orders} = useAppSelector(state => state.purchase_order);
    const item:MaybeUndefined<PurchaseOrderType> = purchase_orders.find(el => textToLink(el.name) === name);
    if (!item) return null;
    return (
        <ProfileRooms purchase_order={item}/>
    );
};

export default PurchaseOrderItem;