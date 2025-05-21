import React, {FC} from 'react';
import s from './checkout.module.sass'
import {updateProductAmount} from "../../store/reducers/generalSlice";
import {
    getCartItemImg,
    getCustomCabinetString,
    getCustomPartById,
    getProductById,
    useAppDispatch
} from "../../helpers/helpers";
import {changeAmountType} from "../OrderForm/Sidebar/Sidebar";
import {CartItemFrontType, updateProductAmountAPI} from "../../api/apiFunctions";
import CartItemOptions from "../Product/CartItemOptions";
import {updateCartInRoom} from "../../store/reducers/roomSlice";
import {MaybeUndefined} from "../../helpers/productTypes";

const CheckoutCartItem: FC<{ el: CartItemFrontType, room_id: MaybeUndefined<string> }> = ({el, room_id = undefined}) => {
    const dispatch = useAppDispatch()
    const {
        _id,
        price,
        amount,
        note,
        product_id,
        isStandard,
        image_active_number,
        product_type
    } = el;
    const product = product_type !== 'custom'
        ? getProductById(product_id, product_type === 'standard')
        : getCustomPartById(product_id);
    if (!product) return null;
    const {name} = product;
    const img = getCartItemImg(product, image_active_number)

    function changeAmount(type: changeAmountType) {
        if (room_id) {
            updateProductAmountAPI(room_id,_id, type === 'minus' ? amount - 1 : amount + 1).then((cart) => {
                if (cart) {
                    if (cart) dispatch(updateCartInRoom({cart}))
                }
            })
        } else {
            dispatch(updateProductAmount({_id, amount: type === 'minus' ? amount - 1 : amount + 1}))
        }
    }

    return (
        <div className={s.cartItem}>
            <img className={s.img} src={img} alt={name}/>
            <div>
                <div className={s.itemName}>
                    <span>{name}</span>
                    {getCustomCabinetString(isStandard) && <span className={s.non}>{getCustomCabinetString(isStandard)}</span>}
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