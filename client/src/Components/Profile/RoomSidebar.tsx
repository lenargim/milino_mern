import React, {FC} from 'react';
import s from "./../OrderForm/Sidebar/sidebar.module.sass";
import {useParams} from "react-router-dom";
import {getCartTotal, useAppSelector} from "../../helpers/helpers";
import RoomCartItem from "./RoomCartItem";

const RoomSidebar: FC = () => {
    const {roomId} = useParams();
    const {rooms} = useAppSelector(state => state.room);
    const room = rooms.find(room => room._id === roomId);
    if (!room) return null;
    const {cart} = room

    if (!cart) return null;
    const total = getCartTotal(cart);
    return (
        <aside className={s.sidebar}>
            <div className={s.sidebarContent}>
                {cart.length ?
                    <>
                        <h3>Cart {total}$</h3>
                        {cart.map((item, key) => {
                            return (
                                <RoomCartItem item={item} key={key}/>
                            )
                        })}
                    </>
                    : null
                }
            </div>
        </aside>
    );
};

export default RoomSidebar;