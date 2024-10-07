import React, {FC} from 'react';
import Header from "../../common/Header/Header";
import s from './product.module.sass'
import ProductMain from "./ProductMain";
import Cart from "./Cart";
import {Navigate, useParams} from "react-router-dom";
import {OrderFormType} from "../../helpers/types";
import {getProductsByCategory, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {
    productCategory,
    productDataType
} from "../../helpers/productTypes";
import {setProduct} from "../../store/reducers/generalSlice";

const Product: FC = () => {
    const dispatch = useAppDispatch()
    let {productId, category} = useParams();
    const storeProduct = useAppSelector(state => state.general.product);
    const materialsString = localStorage.getItem('materials');
    const materials: OrderFormType = materialsString ? JSON.parse(materialsString) : <Navigate to={{pathname: '/'}}/>;
    let products = getProductsByCategory(category as productCategory);
    const productById: productDataType | undefined = products.find(product => (product.id).toString() === productId);
    if (!productById || !category) return <Navigate to={{pathname: '/cabinets'}}/>;
    localStorage.setItem('category', category);

    if (!storeProduct || storeProduct.id !== productById.id) {
        dispatch(setProduct(productById));
    }
    return (
        <div className={s.wrap}>
            <div className={s.main}>
                <Header/>
                <ProductMain product={storeProduct} materials={materials}/>
            </div>
            <Cart/>
        </div>
    );
};

export default Product;