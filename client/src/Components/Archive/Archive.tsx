import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {PurchaseOrdersState, setPOs} from "../../store/reducers/purchaseOrderSlice";
import s from "../Profile/profile.module.sass";
import {Outlet, useNavigate} from "react-router-dom";
import ArchiveNavLink from "./ArchiveNavLink";
import RoomSidebar from "../Room/RoomSidebar";
import {getAllPOs} from "../../api/apiFunctions";

const Archive: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {purchase_orders} = useAppSelector<PurchaseOrdersState>(state => state.purchase_order);
    const po_archived = purchase_orders.filter(po => po.is_archived);
    const user = useAppSelector(state => state.user.user);

    useEffect(() => {
        if (!user?._id) return;
        getAllPOs(user._id).then(data => {
            if (!data) return;
            dispatch(setPOs(data));

            const archived = data.filter(po => po.is_archived);

            if (!archived.length) navigate('/profile');
        })
    }, [user?._id, dispatch, navigate]);

    return (
        <div className={s.purchaseOrder}>
            <div>
                <h1>Purchase Orders Archive</h1>
                <nav className={s.nav}>
                    {po_archived.map(item => <ArchiveNavLink key={item._id} item={item}/>)}
                </nav>
                <Outlet context={{po_archived}}/>
            </div>
            <RoomSidebar/>
        </div>
    );
};

export default Archive;