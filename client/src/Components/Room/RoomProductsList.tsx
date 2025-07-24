import React, {FC} from 'react';
import s from './room.module.sass'
import {NavLink} from "react-router-dom";
import {
    getCustomParts,
    getImgSize,
    getProductImage, getProductsByCategory
} from "../../helpers/helpers";
import {
    CustomPartDataType,
    productCategory, ProductType,
    productTypings
} from "../../helpers/productTypes";
import {ProductAttributes} from "../Product/ProductAttributes";
import {RoomType} from "../../helpers/roomTypes";

const RoomProductsList: FC<{ category_active: productCategory, room: RoomType, isStandardCabinet: boolean }> = ({
                                                                                                                    category_active,
                                                                                                                    room,
                                                                                                                    isStandardCabinet
                                                                                                                }) => {
    switch (category_active) {
        case "Custom Parts":
        case "Standard Parts":
            const customParts = getCustomParts(room.category, isStandardCabinet,category_active);
            if (!customParts.length) return <div>Sorry, there are no custom parts yet</div>;
            return (
                <div className={s.list}>
                    {customParts.map((el, index) => <Part key={index} product={el}/>)}
                </div>
            )
        default:
            const products = getProductsByCategory(category_active, isStandardCabinet);
            if (!products.length) return <div>Sorry, there are no products yet</div>;
            return (
                <div className={s.list}>
                    {products.map((el, index) => <Item key={index} product={el}/>)}
                </div>
            )

    }
};

export default RoomProductsList;


const Item: FC<{ product: ProductType }> = ({product}) => {
    const {name, attributes, id, category, images} = product;
    const initialType: productTypings = 1;
    const img = getProductImage(images, initialType);
    const imgSize = getImgSize(category);


    return (
        <NavLink to={`product/${id}`} className={s.item}>
            <div className={[s.itemImg, s[imgSize]].join(' ')}><img src={img} alt={name}/></div>
            <div>
                <div className={s.name}>{name}</div>
                <ProductAttributes attributes={attributes} type={initialType}/>
            </div>
        </NavLink>
    )
}

const Part: FC<{ product: CustomPartDataType }> = ({product}) => {
    const {name, images, id} = product;
    const img = getProductImage(images);
    return (
        <NavLink to={`product/${id}`} className={s.item}>
            <div className={s.itemImg}><img src={img} alt={name}/></div>
            <div>
                <div className={s.name}>{name}</div>
            </div>
        </NavLink>
    )
}


