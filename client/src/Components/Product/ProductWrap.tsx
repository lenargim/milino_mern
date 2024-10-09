import React, {FC} from 'react';
import Header from "../../common/Header/Header";
import s from './product.module.sass'
import Cart from "./Cart";
import {useParams} from "react-router-dom";
import {OrderFormType} from "../../helpers/types";
import {getProductById} from "../../helpers/helpers";
import {
    productCategory, sizeLimitsType
} from "../../helpers/productTypes";
import {
    getMaterialData,
    getPriceData,
    getProductRange,
} from "../../helpers/calculatePrice";
import sizes from "../../api/sizes.json";
import {MaybeNull, MaybeUndefined} from "../Profile/RoomForm";
import Product from "./Product";

const ProductWrap: FC<{ materials: MaybeNull<OrderFormType> }> = ({materials}) => {
    let {productId, category} = useParams();
    if (!productId || !category || !materials) return <div>Product error</div>;
    let product = getProductById(+productId);
    if (!product) return <div>Product error</div>;


    localStorage.setItem('category', category);

    const {id, customHeight, customDepth} = product;

    const materialData = getMaterialData(materials)
    const {basePriceType} = materialData
    const tablePriceData = getPriceData(id, category as productCategory, basePriceType);
    const productRange = getProductRange(tablePriceData, category as productCategory, customHeight, customDepth);

    const sizeLimit: MaybeUndefined<sizeLimitsType> = sizes.find(size => size.productIds.includes(id))?.limits;
    const {widthRange, heightRange, depthRange} = productRange
    if (!widthRange.length) return <div>Cannot find initial width</div>;
    if (!sizeLimit) return <div>Cannot find size limit</div>;
    if (!tablePriceData) return <div>No price table data</div>

    return (
        <div className={s.wrap}>
            <div className={s.main}>
                <Header/>
                <div className={s.productWrap}>
                    <Product materials={materials} />
                </div>
            </div>
            <Cart/>
        </div>
    );
};

export default ProductWrap;