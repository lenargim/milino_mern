import React, {FC} from 'react';
import {changeAmountType} from "../../helpers/cartTypes";
import {getCartItemImg, getCustomPartById, getProductById, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import s from "../Sidebar/sidebar.module.sass";
import CartItemOptions from "../Sidebar/CartItemOptions";
import {CartItemFrontType} from "../../helpers/cartTypes";
import {removeFromCart, RoomsState, updateCartAmount} from "../../store/reducers/roomSlice";
import Loading from "../../common/Loading";

const RoomCartItem: FC<{ item: CartItemFrontType }> = ({item}) => {
    const dispatch = useAppDispatch();
    const {loading_cart_items} = useAppSelector<RoomsState>(state => state.room);
    const {amount, note, _id, price, image_active_number, product_id, product_type, room_id} = item
    const productAPI = product_type !== 'custom'
        ? getProductById(product_id, product_type === 'standard')
        : getCustomPartById(product_id);
    if (!productAPI) return null;
    const {name} = productAPI
    const img = getCartItemImg(productAPI, image_active_number);
    function changeAmount(type: changeAmountType) {
        // updateProductAmountAPI(room,_id, type === 'minus' ? amount - 1 : amount + 1).then((cart) => {
        //     cart && dispatch(setCart(cart))
        // })
        dispatch(updateCartAmount({room_id, _id, amount: type === 'minus' ? amount - 1 : amount + 1}))
    }

    if (loading_cart_items) return <Loading />
    return (
        <div className={s.cartItem} data-uuid={_id}>
            <div className={s.cartItemTop}>
                <button onClick={() => dispatch(removeFromCart({room_id, _id}))} className={s.itemClose} type={"button"}>×</button>
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
                    <button value="minus" disabled={amount <= 1} onClick={() => changeAmount('minus')} type={"button"}>-</button>
                    <button value="plus" onClick={() => changeAmount('plus')} type={"button"}>+</button>
                </div>
                <div className={s.itemTotalPrice}>{(price * amount).toFixed(1)}$</div>
            </div>
        </div>
    )
};

export default RoomCartItem;