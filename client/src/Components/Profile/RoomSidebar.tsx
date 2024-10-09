import React, {FC} from 'react';
import s from "./profile.module.sass";
import {useNavigate, useParams} from "react-router-dom";
import {getCartTotal, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {OrderFormType} from "../../helpers/types";
import Sidebar from "../OrderForm/Sidebar/Sidebar";

const RoomSidebar:FC = () => {
    const {roomId} = useParams();
    const {rooms} = useAppSelector(state => state.room);
    const room = rooms.find(room => room._id === roomId);

    const dispatch = useAppDispatch()
    if (!room) return null;
    const {
        _id,
        room_name,
        category,
        door_type,
        door_color,
        drawer,
        drawer_type,
        drawer_color,
        box_material,
        door_finish_material,
        door_frame_width,
        door_grain,
        leather,
        cart
    } = room

    const materials: OrderFormType = {
        'Category': category,
        'Door Type': door_type,
        'Door Finish Material': door_finish_material,
        'Door Frame Width': door_frame_width,
        'Door Color': door_color,
        'Door Grain': door_grain,
        'Box Material': box_material,
        'Drawer': drawer,
        'Drawer Type': drawer_type,
        'Drawer Color': drawer_color,
        'Leather Type': leather
    };
    if (!cart) return null;

    return (
        <Sidebar values={materials} cart={cart} total={getCartTotal(cart)} cartLength={cart.length} />
        // <div className={s.roomSidebar}>
        //     <div className={s.categories}>
        //         <div>Category: {category}</div>
        //         {door_type && <div>Door Type: {door_type}</div>}
        //         <div>Door Finish Material: {door_finish_material}</div>
        //         {door_frame_width && <div>Door Frame Width: {door_frame_width}</div>}
        //         {door_color && <div>Door Color: {door_color}</div>}
        //         {door_grain && <div>Door Grain: {door_grain}</div>}
        //         <div>Box Material: {box_material}</div>
        //         <div>Drawer: {drawer}</div>
        //         <div>Drawer Type: {drawer_type}</div>
        //         <div>Drawer Color: {drawer_color}</div>
        //         {leather && <div>Leather: {leather}</div>}
        //     </div>
        // </div>
    );
};

export default RoomSidebar;