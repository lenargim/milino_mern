import React, {FC, useEffect, useState} from 'react';
import s from "./../OrderForm/Sidebar/sidebar.module.sass";
import {useParams} from "react-router-dom";
import {getCartTotal, useAppSelector, usePrevious} from "../../helpers/helpers";
import RoomCartItem from "./RoomCartItem";

const RoomSidebar: FC = () => {
    const {roomId} = useParams();
    const {rooms} = useAppSelector(state => state.room);
    if (!roomId) return null;
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
                        <div className={s.sidebarList}>
                            <h3>Cart</h3>
                            {cart.map((item, key) => {
                                return (
                                    <RoomCartItem room={roomId} item={item} key={key}/>
                                )
                            })}
                        </div>
                        <div className={s.total}>Total: {total}$</div>
                    </>
                    : null
                }
            </div>
        </aside>
    );
};

export default RoomSidebar;