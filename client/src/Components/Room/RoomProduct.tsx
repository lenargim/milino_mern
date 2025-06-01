import React, {FC} from 'react';
import {useOutletContext, useParams} from "react-router-dom";
import Product from "../Product/Product";
import s from '../Profile/profile.module.sass'
import {RoomFront, RoomMaterialsFormType} from "../../helpers/roomTypes";
import {findIsProductStandard, getProductById} from "../../helpers/helpers";
import CustomPart from "../CustomPart/CustomPart";
import {CustomPartType, MaybeUndefined, ProductType} from "../../helpers/productTypes";

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

    const isProductStandard = findIsProductStandard(materials);
    const product_or_custom = getProductById(Number(productId), isProductStandard);
    if (!product_or_custom) return <div>Product error</div>;
    return (
        <div className={s.product}>{
            product_or_custom.product_type === 'custom'
                ? <CustomPart materials={materials} room_id={_id} custom_part={product_or_custom as CustomPartType}/>
                : <Product materials={materials} room_id={_id} product={product_or_custom as ProductType}/>
        }
        </div>

    );
};

export default RoomProduct;