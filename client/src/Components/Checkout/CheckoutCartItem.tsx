import React, {FC} from 'react';
import s from './checkout.module.sass'
import {updateProductAmount} from "../../store/reducers/generalSlice";
import CartItemOptions from "../Product/CartItemOptions";
import {getImg, getProductById, useAppDispatch} from "../../helpers/helpers";
import {changeAmountType} from "../Product/Cart";
import {CartItemType} from "../../api/apiFunctions";

const CheckoutCartItem:FC<{el: CartItemType}> = ({el}) => {
    const dispatch = useAppDispatch()
    const {
        _id,
        price,
        amount,
        note,
        product_id,
        isStandardSize,
        image_active_number
    } = el;
    const product = getProductById(product_id);
    if (!product) return null;
    const {name, images,category} = product
    const img = images[image_active_number-1].value
    const image = getImg(category === 'Custom Parts' ? 'products/custom' : 'products', img);
    function changeAmount(type: changeAmountType) {
        dispatch(updateProductAmount({_id: _id, amount: type === 'minus' ? amount - 1 : amount + 1}))
    }
    return (
        <div className={s.cartItem}>
            <img className={s.img} src={image} alt={name}/>
            <div>
                <div className={s.itemName}>
                    <span>{name}</span>
                    <span className={s.category}>{category}</span>
                    {!isStandardSize && <span className={s.non}>Non-standard size</span>}
                </div>
                <div>
                    <CartItemOptions item={el} />
                </div>
                {note ? <div className={s.note}>*{note}</div> : null}
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