import React, {FC, useEffect, useState} from 'react';
import {useOutletContext} from "react-router-dom";
import {RoomTypeAPI} from "../../store/reducers/roomSlice";
import CheckoutForm from "../Checkout/CheckoutForm";
import {getCartArrFront, getCartTotal, useAppSelector} from "../../helpers/helpers";
import {UserType, UserTypeCheckout} from "../../api/apiTypes";

const RoomCheckout: FC = () => {
    const [roomData] = useOutletContext<[RoomTypeAPI]>();
    const {_id, cart, ...materials} = roomData
    const cartFront = getCartArrFront(cart, roomData)
    const total = getCartTotal(cartFront);

    const user: UserType = useAppSelector(state => state.user.user);
    const [initialValues, setInitialValues] = useState<UserTypeCheckout>({
        name: user.name,
        company: user.company,
        email: user.email,
        phone: user.phone,
        project: roomData.room_name,
        delivery: ''
    })
    useEffect(() => {
        setInitialValues({
            ...initialValues,
            name: user.name,
            company: user.company,
            email: user.email,
            phone: user.phone
        })
    }, [user])

    return (
        <div>
            <CheckoutForm cart={cartFront} total={total} materials={materials} initialValues={initialValues} room_id={_id}/>
        </div>
    );
};

export default RoomCheckout;