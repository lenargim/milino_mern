import React, {FC, useEffect} from 'react';
import Header from "../../common/Header/Header";
import s from './product.module.sass'
import {useNavigate, useParams} from "react-router-dom";
import {MaybeNull} from "../../helpers/productTypes";
import Product from "./Product";
import {MaterialsFormType} from "../../common/MaterialsForm";
import Sidebar from "../OrderForm/Sidebar/Sidebar";

const ProductWrap: FC<{ materials: MaybeNull<MaterialsFormType> }> = ({materials}) => {
    const navigate = useNavigate()
    let {productId, category} = useParams();

    useEffect(() => {
        if (!materials) {
            navigate(`/`)
        }
        if (!category || !productId) {
            navigate('/cabinets')
        }
    },[])

    if (category) localStorage.setItem('category', category);
    return (
        <div className={s.wrap}>
            <div className={s.main}>
                <Header/>
                <div className={s.productWrap}>
                    <Product materials={materials}/>
                </div>
            </div>
            <Sidebar/>
        </div>
    );
};

export default ProductWrap;