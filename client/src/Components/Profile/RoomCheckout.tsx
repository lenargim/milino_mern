import React, {FC} from 'react';
import {CheckoutType} from "../../helpers/types";
import {useOutletContext} from "react-router-dom";
import {RoomTypeAPI} from "../../store/reducers/roomSlice";
import CheckoutForm from "../Checkout/CheckoutForm";
import {getCartArrFront, getCartTotal, useAppSelector} from "../../helpers/helpers";
import {UserType} from "../../api/apiTypes";

const RoomCheckout: FC = () => {
    const [roomData] = useOutletContext<[RoomTypeAPI]>();
    const {_id, cart, ...materials} = roomData
    const cartFront = getCartArrFront(cart, roomData)
    const total = getCartTotal(cartFront);
    const user: UserType = useAppSelector(state => state.user.user)

    const initialValues: CheckoutType = {
        company: user.name,
        email: user.email,
        project: roomData.room_name,
        phone: ''
    }
    return (
        <div>
            <CheckoutForm cart={cartFront} total={total} materials={materials} initialValues={initialValues} room_id={_id}/>
        </div>
    );
};

export default RoomCheckout;