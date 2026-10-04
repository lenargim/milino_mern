import React, {FC} from 'react';
import {useParams, Outlet, useOutletContext} from "react-router-dom";
import {textToLink} from "../../helpers/helpers";
import {PurchaseOrderType} from "../../store/reducers/purchaseOrderSlice";

const PurchaseOrderItem: FC = () => {
    const {purchase_order_name} = useParams();
    const {purchase_orders} = useOutletContext<{purchase_orders: PurchaseOrderType[]}>()
    const purchase_order = purchase_orders.find(el => textToLink(el.name) === purchase_order_name);
    if (!purchase_order) return null;
    return (
        <Outlet context={{purchase_order}} />
    );
};

export default PurchaseOrderItem;