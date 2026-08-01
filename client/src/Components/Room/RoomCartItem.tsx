import React, {FC} from 'react';
import {changeAmountType} from "../../helpers/cartTypes";
import {
    getCartImagePath,
    getProductById,
    textToLink,
    useAppDispatch,
    useAppSelector
} from "../../helpers/helpers";
import s from "../Sidebar/sidebar.module.sass";
import CartItemOptions from "../Sidebar/CartItemOptions";
import {CartItemFrontType} from "../../helpers/cartTypes";
import {removeFromCart, RoomsState, updateCartAmount} from "../../store/reducers/roomSlice";
import Loading from "../../common/Loading";
import {NavLink, useParams} from "react-router-dom";
import {useAdmin} from "../../helpers/AdminContext";

const RoomCartItem: FC<{ item: CartItemFrontType }> = ({item}) => {
    const dispatch = useAppDispatch();
    const {loading_cart_items, rooms} = useAppSelector<RoomsState>(state => state.room);
    const {amount, note, _id, price, product_id, product_type, room_id} = item;
    const productAPI = getProductById(product_id, product_type === 'standard');
    const {room_name, purchase_order_name, user_id} = useParams();
    const room = rooms.find(el => el._id === room_id );
    const is_admin = useAdmin();
    if (!room || !productAPI) return null;
    const {name} = productAPI;
    const img = getCartImagePath(room, productAPI, item);

    function changeAmount(type: changeAmountType) {
        dispatch(updateCartAmount({room_id, _id, amount: type === 'minus' ? amount - 1 : amount + 1}))
    }
    if (loading_cart_items) return <Loading/>
    const edit_link = !is_admin ?
        `/profile/purchase/${textToLink(purchase_order_name)}/rooms/${textToLink(room_name)}/product/${product_id}/edit/${_id}` :
        `/profile/admin/edit/${user_id}/purchase/${textToLink(purchase_order_name)}/rooms/${textToLink(room_name)}/product/${product_id}/edit/${_id}`
    return (
        <div className={s.cartItem} data-uuid={_id}>
            <div className={s.cartItemTop}>
                <button onClick={() => dispatch(removeFromCart({room_id, _id}))} className={s.itemClose}
                        type={"button"}>×
                </button>
                <NavLink
                    to={edit_link}
                    className={s.itemEdit}
                >✎</NavLink>
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
};

export default RoomCartItem;