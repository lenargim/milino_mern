import React, {FC} from 'react';
import s from './checkout.module.sass'
import {
    getProductById, getProductImage,
    useAppDispatch, useAppSelector
} from "../../helpers/helpers";
import {changeAmountType} from "../../helpers/cartTypes";
import CartItemOptions from "../Sidebar/CartItemOptions";
import {CartItemFrontType} from "../../helpers/cartTypes";
import {RoomsState, updateCartAmount} from "../../store/reducers/roomSlice";
import {CustomCabinetMarker} from "../../common/CustomCabinetMarker";

const CheckoutCartItem: FC<{ el: CartItemFrontType }> = ({el}) => {
    const dispatch = useAppDispatch()
    const {
        _id,
        room_id,
        price,
        amount,
        note,
        product_id,
        isStandard,
        image_active_number,
        product_type
    } = el;
    const {rooms} = useAppSelector<RoomsState>(state => state.room);
    const room = rooms.find(el => el._id === room_id );
    if (!room) return null;
    const product = getProductById(product_id, product_type === 'standard');
    if (!product) return null;
    const {name, images} = product;
    const img = getProductImage(images, image_active_number);


    function changeAmount(type: changeAmountType) {
        dispatch(updateCartAmount({room_id, _id, amount: type === 'minus' ? amount - 1 : amount + 1}))
    }

    return (
        <div className={s.cartItem}>
            <img className={s.img} src={img} alt={name}/>
            <div>
                <div className={s.itemName}>
                    <span>{name}</span>
                    <CustomCabinetMarker isStandard={isStandard} />
                </div>
                <div>
                    <CartItemOptions item={el}/>
                </div>
                {note && <div className={s.note}>*{note}</div>}
            </div>
            <div className={s.itemPrice}>{price}$</div>
            <div className={s.buttons}>
                <button value="minus" disabled={amount <= 1} onClick={() => changeAmount('minus')}
                        type={"button"}>-
                </button>
                <span>{amount}</span>
                <button value="plus" onClick={() => changeAmount('plus')} type={"button"}>+</button>
            </div>
            <div className={s.sum}>{(price * amount).toFixed(1)}$</div>
        </div>
    );
};

export default CheckoutCartItem;