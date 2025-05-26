import React, {FC} from 'react';
import {useParams, Outlet} from "react-router-dom";
import {textToLink, useAppSelector} from "../../helpers/helpers";
import {PurchaseOrdersState} from "../../store/reducers/purchaseOrderSlice";

const PurchaseOrderItem: FC = () => {
    const {purchase_order_name} = useParams();
    const {purchase_orders} = useAppSelector<PurchaseOrdersState>(state => state.purchase_order)
    const purchase_order = purchase_orders.find(el => textToLink(el.name) === purchase_order_name);

    if (!purchase_order) return null;
    return (
        <Outlet context={purchase_order} />
    );
};

export default PurchaseOrderItem;