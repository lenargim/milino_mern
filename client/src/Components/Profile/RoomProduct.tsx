import React, {useEffect} from 'react';
import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import {RoomFront} from "../../store/reducers/roomSlice";
import Product from "../Product/Product";
import s from './profile.module.sass'
import {MaterialsFormType} from "../../common/MaterialsForm";

const RoomProduct = () => {
    const navigate = useNavigate()
    let {category, productId} = useParams();
    const [roomData] = useOutletContext<[RoomFront]>()
    const {
        _id,
        activeProductCategory,
        productPage,
        cart,
        ...rest
    } = roomData;

    const materials: MaterialsFormType = {...rest}

    useEffect(() => {
        if (!category || !productId) {
            navigate(`/profile/rooms/${_id}`)
        }
    }, [])

    return (
        <div className={s.product}>
            <Product materials={materials}/>
        </div>

    );
};

export default RoomProduct;