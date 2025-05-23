import React, {FC, useEffect, useState} from 'react';
import {NavLink, Outlet, useLocation, useNavigate, useOutletContext, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../helpers/helpers";
import s from '../Profile/profile.module.sass'
import {deleteRoomAPI, getCartAPI} from "../../api/apiFunctions";
import {deleteRoom} from "../../store/reducers/roomSlice";
import checkoutStyle from '../Checkout/checkout.module.sass'
import {useDispatch} from "react-redux";
import {RoomType} from "../../helpers/roomTypes";
import {MiniCart} from "../../common/MiniCart";
import {CartState, setCart} from "../../store/reducers/cartSlice";

const Room: FC = () => {
    const {room_id} = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const path = location.pathname.slice(1);
    const [rooms] = useOutletContext<[RoomType[]]>();
    const room = rooms.find(room => room._id === room_id);
    const {cart_items} = useAppSelector<CartState>(state => state.cart);

    useEffect(() => {
        room_id && getCartAPI(room_id).then(cart_res => {
            room && cart_res && dispatch(setCart(cart_res))
        })
        if (!room_id) navigate('/profile');
    }, [room_id]);

    if (!room) return null;
    const {_id, room_name, category} = room;
    if (!category) return null;
    const isBackToCabinetsShown = path !== `profile/rooms/${room_id}`;

    const cartLength = cart_items?.length
    const isCartShown = cartLength && !path.includes('/checkout');
    return (
        <div>
            <div className={s.roomRow}>
                <span className={s.name}>Purchase order: {room_name}</span>
                {isBackToCabinetsShown ?
                    <NavLink to={""}>Back to cabinets</NavLink> : null}
                {isCartShown ? <MiniCart length={cartLength} link="checkout"/> : null}
                <NavLink to={'edit'} className="button small yellow">Edit PO</NavLink>
                <button className="button red small" type="button" onClick={() => setOpen(true)}>Delete PO
                </button>
                {open && <ApproveRemove _id={_id} setOpen={setOpen} room_name={room_name}/>}
            </div>
            <Outlet context={[room]}/>
        </div>
    );
};

export default Room;

const ApproveRemove: FC<{ _id: string, setOpen: (status: boolean) => void, room_name: string }> = ({
                                                                                                       _id,
                                                                                                       setOpen,
                                                                                                       room_name
                                                                                                   }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return (
        <div className={checkoutStyle.notificationWrap}>
            <div className={checkoutStyle.notification}>
                <div className={s.approvalRemove}>
                    <h3>Delete "{room_name}" order?</h3>
                    <div className={s.approvalRemoveButonset}>
                        <button className="button red small" onClick={() => {
                            deleteRoomAPI(_id).then(room => {
                                if (room) {
                                    dispatch(deleteRoom(room))
                                    navigate(`/profile/rooms/`);
                                }
                            })
                        }}>Yes
                        </button>
                        <button className="button green small" onClick={() => setOpen(false)}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}