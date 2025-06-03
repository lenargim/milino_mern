import React, {FC, useEffect, useRef, useState} from 'react';
import s from "../Profile/profile.module.sass";
import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import RoomSidebar from "../Room/RoomSidebar";
import {MaybeNull} from "../../helpers/productTypes";
import {textToLink, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {PurchaseOrdersState, PurchaseOrderType, setPOs} from "../../store/reducers/purchaseOrderSlice";
import {deletePO, getAllPOs} from "../../api/apiFunctions";
import checkoutStyle from "../Checkout/checkout.module.sass";

const PurchaseOrder: FC = () => {
    const location = useLocation();
    const user = useAppSelector(state => state.user.user)!
    const {purchase_orders} = useAppSelector<PurchaseOrdersState>(state => state.purchase_order);
    const {_id} = user;
    const dispatch = useAppDispatch();
    const scrollToRef = useRef<MaybeNull<HTMLDivElement>>(null);
    const [warningModal, setWarningModal] = useState<MaybeNull<PurchaseOrderType>>(null);

    useEffect(() => {
        const scrollEl = scrollToRef.current;
        scrollEl && scrollEl.scrollIntoView(true);
    }, [location.pathname])

    // eslint-disable-next-line
    useEffect(() => {
        _id && getAllPOs(_id).then(data => {
            data && dispatch(setPOs(data));
        })
    }, [_id]);

    if (!_id) return null;
    return (
        <div className={s.purchaseOrder}>
            {warningModal ? <ApproveRemovePO po={warningModal} setWarningModal={setWarningModal}/> : null}
            <div>
                <h1 ref={scrollToRef}>Purchase orders</h1>
                <nav className={s.nav}>
                    {purchase_orders.length
                        ? purchase_orders.map(item => <PurchaseOrderNavLink key={item._id} item={item}
                                                                            setWarningModal={setWarningModal}/>)
                        : null}
                    <NavLink className={({isActive}) => [isActive ? s.linkActive : '', s.navItem].join(' ')}
                             to="new">Add PO +</NavLink>
                </nav>
                <Outlet context={{user_id: _id, purchase_orders}}/>
            </div>
            <RoomSidebar />
        </div>
    );
};

export default PurchaseOrder;

const PurchaseOrderNavLink: FC<{ item: PurchaseOrderType, setWarningModal: (val: MaybeNull<PurchaseOrderType>) => void }> = ({
                                                                                                                                 item,
                                                                                                                                 setWarningModal
                                                                                                                             }) => {
    const {name} = item
    return (
        <div className={s.linkWrap}>
            <button type="button" onClick={() => setWarningModal(item)} className={s.linkDelete}>×</button>
            <NavLink to={`${textToLink(name)}/edit`} className={s.linkEdit}>✎</NavLink>
            <NavLink className={({isActive}) => [isActive ? s.linkActive : '', s.navItem].join(' ')}
                     to={`${textToLink(name)}/rooms`}>{name}</NavLink>
        </div>
    )
}

const ApproveRemovePO: FC<{ po: PurchaseOrderType, setWarningModal: (val: MaybeNull<PurchaseOrderType>) => void }> = ({
                                                                                                                        po,
                                                                                                                        setWarningModal
                                                                                                                    }) => {
    const {_id, user_id, name} = po
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return (
        <div className={checkoutStyle.notificationWrap}>
            <div className={checkoutStyle.notification}>
                <div className={s.approvalRemove}>
                    <h3>Delete "{name}" purchase order?</h3>
                    <div className={s.approvalRemoveButonset}>
                        <button className="button red small" onClick={() => {
                            deletePO(user_id, _id).then(po_res => {
                                setWarningModal(null)
                                if (po_res) {
                                    dispatch(setPOs(po_res));
                                    navigate(`/profile/purchase/`);
                                }
                            })
                        }}>Yes
                        </button>
                        <button className="button green small" onClick={() => setWarningModal(null)}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}