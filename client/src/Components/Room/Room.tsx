import React, {FC, useEffect, useState} from 'react';
import {NavLink, Outlet, useLocation, useNavigate, useOutletContext, useParams} from "react-router-dom";
import {useAppDispatch} from "../../helpers/helpers";
import s from '../Profile/profile.module.sass'
import {deleteRoomAPI, getOneRoom} from "../../api/apiFunctions";
import {deleteRoom, RoomTypeAPI, setRoom} from "../../store/reducers/roomSlice";
import {MiniCart} from "../../common/Header/Header";
import checkoutStyle from '../Checkout/checkout.module.sass'
import {useDispatch} from "react-redux";

const Room: FC = () => {
    const {room_id} = useParams();
    const [rooms] = useOutletContext<[RoomTypeAPI[]]>();
    const navigate = useNavigate();
    const roomData = rooms?.find(room => room._id === room_id);
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!roomData || !roomData.cart.length) {
            getOneRoom(room_id || '').then(data => {
                data ? dispatch(setRoom(data)) : navigate('/profile');
            })
        }
    }, [room_id]);

    const path = location.pathname.slice(1);
    const [open, setOpen] = useState<boolean>(false);

    if (!roomData) return null;
    const {_id, room_name, category} = roomData;
    if (!category) return null;
    const isBackToCabinetsShown = path !== `profile/rooms/${room_id}`;
    const {cart} = roomData
    const cartLength = cart.length
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
            <Outlet context={[roomData]}/>
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