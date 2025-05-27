import React, {FC, useEffect} from 'react';
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {textToLink, useAppSelector} from "../../helpers/helpers";
import {getCartAPI} from "../../api/apiFunctions";
import {useDispatch} from "react-redux";
import {MiniCart} from "../../common/MiniCart";
import {CartState, setCart} from "../../store/reducers/cartSlice";
import {RoomsState} from "../../store/reducers/roomSlice";

const Room: FC = () => {
    const {room_name} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const path = location.pathname.slice(1);
    const {rooms} = useAppSelector<RoomsState>(state => state.room)
    const room = rooms.find(room => textToLink(room.name) === room_name);
    console.log(room)
    const {cart_items} = useAppSelector<CartState>(state => state.cart);
    useEffect(() => {
        if (!room_name) navigate('/profile');
        room && getCartAPI(room._id).then(cart_res => {
            cart_res && dispatch(setCart(cart_res))
        })
    }, [room_name]);

    if (!room) return null;
    const cartLength = cart_items?.length
    const isCartShown = cartLength && !path.includes('/checkout');
    return (
        <div>
            {isCartShown ? <MiniCart length={cartLength} link="checkout"/> : null}
            <Outlet context={[room]}/>
        </div>
    );
};

export default Room;