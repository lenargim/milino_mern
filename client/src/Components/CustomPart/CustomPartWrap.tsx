import React, {FC, useEffect} from 'react';
import Header from "../../common/Header/Header";
import s from '../Product/product.module.sass'
import {useNavigate, useParams} from "react-router-dom";
import {MaterialsFormType} from "../../common/MaterialsForm";
import {MaybeNull} from "../../helpers/productTypes";
import CustomPart from "./CustomPart";
import Sidebar from "../OrderForm/Sidebar/Sidebar";

const CustomPartWrap: FC<{ materials: MaybeNull<MaterialsFormType> }> = ({materials}) => {
    const navigate = useNavigate();
    let {productId} = useParams();
    useEffect(() => {
        if (!materials) {
            navigate(`/`)
        }
        if (!materials?.category || !productId) {
            navigate('/cabinets')
        }
        if (materials?.category) localStorage.setItem('category', 'Custom Parts');
    },[])


    return (
        <div className={s.wrap}>
            <div className={s.main}>
                <Header/>
                <div className={s.productWrap}>
                    <CustomPart materials={materials}/>
                </div>
            </div>
            <Sidebar/>
        </div>
    );
};

export default CustomPartWrap;