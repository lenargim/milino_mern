import React, {FC, useEffect} from 'react';
import CustomPart from "../CustomPart/CustomPart";
import {MaterialsFormType} from "../../common/MaterialsForm";
import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import {RoomFront} from "../../store/reducers/roomSlice";
import s from './profile.module.sass'

const RoomCustomPart:FC = () => {
    const navigate = useNavigate()
    let {productId} = useParams();
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
        if (!productId) {
            navigate(`/profile/rooms/${_id}`)
        }
    }, [])
    return (
        <div className={s.product}>
            <CustomPart materials={materials} />
        </div>
    );
};

export default RoomCustomPart;