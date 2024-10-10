import React, {FC} from 'react';
import {changeAmountType} from "../Product/Cart";
import {getImg, getProductById, useAppDispatch} from "../../helpers/helpers";
import s from "../OrderForm/Sidebar/sidebar.module.sass";
import {CartFront, removeFromCartInRoomAPI} from "../../api/apiFunctions";
import {removeFromCartInRoom} from "../../store/reducers/roomSlice";
import RoomCartItemOptions from "./RoomCartItemOptions";

const RoomCartItem: FC<{ item: CartFront }> = ({item}) => {
    const dispatch = useAppDispatch()
    const {amount, note, _id, room, price, image_active_number} = item
    const productAPI = getProductById(item.product_id);
    if (!productAPI) return null;
    const {category, images, name} = productAPI
    const img = images[image_active_number-1].value
    function changeAmount(type: changeAmountType) {
        // dispatch(updateProductAmount({uuid: uuid, amount: type === 'minus' ? amount - 1 : amount + 1}))
    }
    const image = getImg(category === 'Custom Parts' ? 'products/custom' : 'products', img);

    return (
        <div className={s.cartItem} data-uuid={_id}>
            <div className={s.cartItemTop}>
                <button onClick={() => removeFromCartInRoomAPI(_id).then(status => {
                    if (status === 200) dispatch(removeFromCartInRoom({room,_id}))
                })} className={s.itemClose}
                        type={"button"}>×
                </button>
                <img className={s.itemimg} src={image} alt={name}/>
                <div className={s.itemName}>{name}</div>
            </div>

            <div>
                <RoomCartItemOptions item={item}/>
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