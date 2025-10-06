import React, {FC} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {MaybeUndefined} from "../../helpers/productTypes";
import {textToLink, useAppSelector} from "../../helpers/helpers";
import {RoomsState} from "../../store/reducers/roomSlice";
import RoomProduct from "./RoomProduct";

const RoomEditCartProduct: FC = () => {
    const navigate = useNavigate();
    let {
        cartId,
        purchase_order_name,
        room_name
    } = useParams<{ cartId: MaybeUndefined<string>, purchase_order_name: MaybeUndefined<string>, room_name: MaybeUndefined<string> }>();
    const {cart_items} = useAppSelector<RoomsState>(state => state.room);
    if (!cart_items) return null;
    const cartItemValues = cart_items.find(el => el._id === cartId);
    if (!cartItemValues) {
        navigate(`/profile/purchase/${textToLink(purchase_order_name)}/rooms/${textToLink(room_name)}`);
        return null;
    }

    return (
        <RoomProduct cartItemValues={cartItemValues}/>
    );
};

export default RoomEditCartProduct;