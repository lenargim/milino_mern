import React, {FC} from 'react';
import {changeAmountType} from "../OrderForm/Sidebar/Sidebar";
import {getCartItemImg, getCustomPartById, getProductById, useAppDispatch} from "../../helpers/helpers";
import s from "../OrderForm/Sidebar/sidebar.module.sass";
import {CartItemType, removeFromCartInRoomAPI, updateProductAmountAPI} from "../../api/apiFunctions";
import {removeFromCartInRoom, updateCartAmountInRoom} from "../../store/reducers/roomSlice";
import CartItemOptions from "../Product/CartItemOptions";

const RoomCartItem: FC<{ item: CartItemType }> = ({item}) => {
    const dispatch = useAppDispatch()
    const {amount, note, _id, room, price, image_active_number, product_id, product_type} = item
    const productAPI = product_type !== 'custom'
        ? getProductById(product_id, product_type === 'standard')
        : getCustomPartById(product_id);
    if (!productAPI || !room) return null;
    const {name} = productAPI
    const img = getCartItemImg(productAPI, image_active_number)
    function changeAmount(type: changeAmountType) {
        updateProductAmountAPI(_id, type === 'minus' ? amount - 1 : amount + 1).then((cart) => {
            if (cart) {
                dispatch(updateCartAmountInRoom(cart))
            }
        })
    }

    return (
        <div className={s.cartItem} data-uuid={_id}>
            <div className={s.cartItemTop}>
                <button onClick={() => removeFromCartInRoomAPI(_id).then(status => {
                    if (status === 200) dispatch(removeFromCartInRoom({room,_id}))
                })} className={s.itemClose}
                        type={"button"}>×
                </button>
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