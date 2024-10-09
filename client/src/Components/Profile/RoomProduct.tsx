import React, {useEffect} from 'react';
import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import {RoomTypeAPI} from "../../store/reducers/roomSlice";
import {OrderFormType} from "../../helpers/types";
import Product from "../Product/Product";
import s from './profile.module.sass'

const RoomProduct = () => {
    const navigate = useNavigate()
    let {category, productId} = useParams();
    const [roomData] = useOutletContext<[RoomTypeAPI]>()
    const {
        _id,
        category: roomCat,
        door_finish_material,
        door_type,
        box_material,
        door_color,
        door_grain,
        door_frame_width,
        drawer, drawer_type, drawer_color, leather
    } = roomData;

    useEffect(() => {
        if (!category || !productId) {
            navigate(`/profile/rooms/${_id}`)
        }
    }, [])

    const materials: OrderFormType = {
        'Category': roomCat,
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

    return (
        <div className={s.product}>
            <Product materials={materials} />
        </div>

    );
};

export default RoomProduct;