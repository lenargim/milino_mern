import React, {FC, useEffect, useState} from 'react';
import s from '../Profile/profile.module.sass'
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {textToLink, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import RoomNew from '../Room/RoomNew';
import {PurchaseOrdersState, PurchaseOrderType} from "../../store/reducers/purchaseOrderSlice";
import {deleteRoomAPI, getRooms} from "../../api/apiFunctions";
import {RoomsState, setRooms} from "../../store/reducers/roomSlice";
import {MaybeNull} from "../../helpers/productTypes";
import {RoomFront} from "../../helpers/roomTypes";
import checkoutStyle from "../Checkout/checkout.module.sass";

const PurchaseOrderRooms: FC = () => {
    const {purchase_order_name} = useParams();
    const {rooms} = useAppSelector<RoomsState>(state => state.room);
    const dispatch = useAppDispatch();
    const [warningModal, setWarningModal] = useState<MaybeNull<RoomFront>>(null);

    const {purchase_orders} = useAppSelector<PurchaseOrdersState>(state => state.purchase_order)
    const purchase_order = purchase_orders.find(el => textToLink(el.name) === purchase_order_name);

    useEffect(() => {
        purchase_order && getRooms(purchase_order._id).then(data => {
            data && dispatch(setRooms(data));
        })
    }, [purchase_order]);
    if (!purchase_order) return null;
    return (
        <>
            <h2>Rooms</h2>
            {rooms.length ?
                <div>
                    <nav className={s.nav}>
                        {rooms.map(room => <RoomNavLink room={room} setWarningModal={setWarningModal}
                                                        key={room._id}/>)}
                        <NavLink className={({isActive}) => [isActive ? s.linkActive : '', s.navItem].join(' ')}
                                 to="new">Add Room +</NavLink>
                    </nav>
                    {warningModal ? <ApproveRemoveRoom room={warningModal} setWarningModal={setWarningModal}
                                                       purchase_name={purchase_order.name}/> : null}
                </div>
                : <RoomNew/>}
        </>
    );
};

export default PurchaseOrderRooms;

const RoomNavLink: FC<{ room: RoomFront, setWarningModal: (val: MaybeNull<RoomFront>) => void }> = ({
                                                                                                        room,
                                                                                                        setWarningModal
                                                                                                    }) => {
    const {name} = room
    return (
        <div className={s.linkWrap}>
            <button type="button" onClick={() => setWarningModal(room)} className={s.linkDelete}>×</button>
            <NavLink to={`${textToLink(name)}/edit`} className={s.linkEdit}>✎</NavLink>
            <NavLink className={({isActive}) => [isActive ? s.linkActive : '', s.navItem].join(' ')}
                     to={textToLink(name)}>{name}</NavLink>
        </div>
    )
}

const ApproveRemoveRoom: FC<{ room: RoomFront, purchase_name: string, setWarningModal: (val: MaybeNull<RoomFront>) => void }> = ({
                                                                                                                                     room,
                                                                                                                                     purchase_name,
                                                                                                                                     setWarningModal
                                                                                                                                 }) => {
    const {_id, purchase_order_id, name} = room
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return (
        <div className={checkoutStyle.notificationWrap}>
            <div className={checkoutStyle.notification}>
                <div className={s.approvalRemove}>
                    <h3>Delete "{name}" room?</h3>
                    <div className={s.approvalRemoveButonset}>
                        <button className="button red small" onClick={() => {
                            deleteRoomAPI(purchase_order_id, _id).then(room_res => {
                                setWarningModal(null)
                                if (room_res) {
                                    dispatch(setRooms(room_res));
                                    navigate(`/profile/purchase/${purchase_name}`);
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