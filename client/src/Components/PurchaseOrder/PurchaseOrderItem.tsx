import React, {FC, useEffect} from 'react';
import {useParams, Outlet} from "react-router-dom";
import {textToLink, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {PurchaseOrdersState, setActivePO} from "../../store/reducers/purchaseOrderSlice";

const PurchaseOrderItem: FC = () => {
    const {purchase_order_name} = useParams();
    const {purchase_orders} = useAppSelector<PurchaseOrdersState>(state => state.purchase_order)
    const dispatch = useAppDispatch();
    const purchase_order = purchase_orders.find(el => textToLink(el.name) === purchase_order_name);
    useEffect(() => {
        purchase_order && purchase_order_name && dispatch(setActivePO(purchase_order.name))
    }, [dispatch, purchase_order_name, purchase_order]);
    if (!purchase_order) return null;
    return (
        <Outlet context={purchase_order} />
    );
};

export default PurchaseOrderItem;