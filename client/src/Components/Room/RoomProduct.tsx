import React, {FC} from 'react';
import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import Product from "../Product/Product";
import s from '../Profile/profile.module.sass'
import {RoomFront, RoomMaterialsFormType} from "../../helpers/roomTypes";
import {findIsProductCustomByCategory} from "../../helpers/helpers";
import CustomPart from "../CustomPart/CustomPart";
import {MaybeUndefined} from "../../helpers/productTypes";

const RoomProduct: FC = () => {
    let {productId} = useParams<{ productId: MaybeUndefined<string> }>();
    const [room] = useOutletContext<[RoomFront]>()
    const {
        _id,
        activeProductCategory,
        purchase_order_id,
        ...rest
    } = room;
    const materials: RoomMaterialsFormType = {...rest};

    if (!productId) return null;
    const isCustomPart = findIsProductCustomByCategory(activeProductCategory );

    return (
        <div className={s.product}>{
            !isCustomPart
                ? <Product materials={materials} room_id={_id} product_id={+productId}/>
                : <CustomPart materials={materials} room_id={_id} product_id={+productId}/>
        }
        </div>

    );
};

export default RoomProduct;