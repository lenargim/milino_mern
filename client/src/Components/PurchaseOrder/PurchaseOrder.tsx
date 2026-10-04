import React, {FC, useEffect, useRef, useState} from 'react';
import s from "../Profile/profile.module.sass";
import {NavLink, Outlet, useLocation} from "react-router-dom";
import RoomSidebar from "../Room/RoomSidebar";
import {MaybeNull} from "../../helpers/productTypes";
import {useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {PurchaseOrdersState, PurchaseOrderType, setPOs} from "../../store/reducers/purchaseOrderSlice";
import {getAllPOs} from "../../api/apiFunctions";
import ApproveRemovePO from "./ApproveRemovePO";
import PurchaseOrderNavLink from "./PurchaseOrderNavLink";
import {AdminStateType} from "../../store/reducers/adminSlice";
import {useAuthUser} from "../../utils/customHooks";
import {useEditor} from "../../helpers/EditorContext";

const PurchaseOrder: FC = () => {
    const location = useLocation();
    const {_id} = useAuthUser();
    const dispatch = useAppDispatch();
    const {purchase_orders} = useAppSelector<PurchaseOrdersState>(state => state.purchase_order);
    const {editable_user} = useAppSelector<AdminStateType>(state => state.admin);
    const is_my_project = useEditor() === 'designer';
    const user_id = is_my_project ? _id : editable_user?._id;
    const scrollToRef = useRef<MaybeNull<HTMLDivElement>>(null);
    const [warningModal, setWarningModal] = useState<MaybeNull<PurchaseOrderType>>(null);

    useEffect(() => {
        const scrollEl = scrollToRef.current;
        scrollEl && scrollEl.scrollIntoView(true);
    }, [location.pathname])

    // eslint-disable-next-line
    useEffect(() => {
        if (!user_id) return;
        getAllPOs(user_id).then(data => {
            data && dispatch(setPOs(data));
        })
    }, [user_id, dispatch]);

    if (!user_id) return null;
    const po_filtered = purchase_orders.filter(po => !po.is_archived);
    return (
        <div className={s.purchaseOrder}>
            {warningModal ? <ApproveRemovePO po={warningModal} setWarningModal={setWarningModal}/> : null}
            <div>
                <h1 ref={scrollToRef}>Purchase Orders</h1>
                <nav className={s.nav}>
                    {po_filtered.length
                        ? po_filtered.map(item => <PurchaseOrderNavLink key={item._id} item={item}
                                                                        setWarningModal={setWarningModal}
                                                                        is_my_project={is_my_project}/>)
                        : null}
                    {is_my_project &&
                        <NavLink className={({isActive}) => [isActive ? s.linkActive : '', s.navItem].join(' ')}
                                 to="new">Add PO +</NavLink>}
                </nav>
                <Outlet context={{purchase_orders: po_filtered, user_id}}/>
            </div>
            <RoomSidebar/>
        </div>
    );
};

export default PurchaseOrder;