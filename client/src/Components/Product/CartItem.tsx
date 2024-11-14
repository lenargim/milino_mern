import React, {FC} from 'react';
import {deleteItemFromCart, updateProductAmount} from "../../store/reducers/generalSlice";
import {
    getCartItemImg,
    getCustomPartById,
    getProductById,
    useAppDispatch
} from "../../helpers/helpers";
import s from "../OrderForm/Sidebar/sidebar.module.sass";
import {changeAmountType} from "../OrderForm/Sidebar/Sidebar";
import CartItemOptions from "./CartItemOptions";
import {CartItemType} from "../../api/apiFunctions";

export const CartItem: FC<{ item: CartItemType, isCheckout?: boolean }> = ({item, isCheckout = false}) => {
    const {
        price,
        amount,
        note,
        product_id,
        image_active_number,
        _id,
        product_type,
    } = item;
    const dispatch = useAppDispatch();
    const product = product_type !== 'custom'
        ? getProductById(product_id, product_type === 'standard')
        : getCustomPartById(product_id);
    if (!product) return null;
    const {name} = product;
    const img = getCartItemImg(product, image_active_number)
    function changeAmount(type: changeAmountType) {
        dispatch(updateProductAmount({_id: _id, amount: type === 'minus' ? amount - 1 : amount + 1}))
    }

    return (
        <div className={s.cartItem} data-uuid={_id}>
            <div className={s.cartItemTop}>
                {isCheckout ? null : <button onClick={() => dispatch(deleteItemFromCart(_id))} className={s.itemClose}
                                             type={"button"}>×</button>}
                <img className={s.itemimg} src={img} alt={name}/>
                <div className={s.itemName}>{name}</div>
            </div>

            <div>
                <CartItemOptions item={item}/>
                {note &&
                  <div className={s.itemOption}>
                    <span>Note:</span>
                    <span>{note}</span>
                  </div>
                }
            </div>

            <div className={s.itemPriceBlock}>
                <div className={s.itemSubPrice}>
                    {`${price}$ x `}<span className={s.amount}>{amount}</span>
                </div>
                <div className={s.buttons}>
                    <button value="minus" disabled={amount <= 1} onClick={() => changeAmount('minus')}
                            type={"button"}>-
                    </button>
                    <button value="plus" onClick={() => changeAmount('plus')} type={"button"}>+</button>
                </div>
                <div className={s.itemTotalPrice}>{(price * amount).toFixed(1)}$</div>
            </div>
        </div>
    )
}

export default CartItem;
