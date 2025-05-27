import React, {FC, useEffect, useState} from 'react';
import s from '../Profile/profile.module.sass'
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {textToLink, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import RoomNew from '../Room/RoomNew';
import {PurchaseOrdersState} from "../../store/reducers/purchaseOrderSlice";
import {fetchRooms, removeRoom, RoomsState} from "../../store/reducers/roomSlice";
import {MaybeNull} from "../../helpers/productTypes";
import {RoomFront} from "../../helpers/roomTypes";
import checkoutStyle from "../Checkout/checkout.module.sass";
import Loading from "../../common/Loading";

const PurchaseOrderRooms: FC = () => {
    const {purchase_order_name} = useParams();
    const {rooms, loading} = useAppSelector<RoomsState>(state => state.room);
    const dispatch = useAppDispatch();
    const [warningModal, setWarningModal] = useState<MaybeNull<RoomFront>>(null);

    const {purchase_orders} = useAppSelector<PurchaseOrdersState>(state => state.purchase_order)
    const purchase_order = purchase_orders.find(el => textToLink(el.name) === purchase_order_name);
    console.log(purchase_order)

    useEffect(() => {
        purchase_order && dispatch(fetchRooms({_id: purchase_order._id}))
    }, [purchase_order]);
    if (!purchase_order) return null;
    if (loading) return <Loading />
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


    const handleDelete = async () => {
        try {
            setWarningModal(null);
            await dispatch(removeRoom({ purchase_order_id, _id })).unwrap();
            navigate(`/profile/purchase/${textToLink(purchase_name)}/rooms`);
        } catch (error) {
            console.error('Failed to delete room:', error);
        }
    };
    return (
        <div className={checkoutStyle.notificationWrap}>
            <div className={checkoutStyle.notification}>
                <div className={s.approvalRemove}>
                    <h3>Delete "{name}" room?</h3>
                    <div className={s.approvalRemoveButonset}>
                        <button className="button red small" onClick={handleDelete}>Yes
                        </button>
                        <button className="button green small" onClick={() => setWarningModal(null)}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}