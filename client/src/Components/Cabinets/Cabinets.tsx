import React, {FC, useEffect} from 'react';
import CabinetsMain from "./CabinetsMain";
import {getCartData, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {setProduct} from "../../store/reducers/generalSlice";
import {Navigate} from "react-router-dom";
import Sidebar from "../OrderForm/Sidebar/Sidebar";

const Cabinets: FC = () => {
    const dispatch = useAppDispatch()
    const cartState = useAppSelector(state => state.general.cart)
    const {cart, total, cartLength} = getCartData(cartState,dispatch);
    useEffect(() => {
        dispatch(setProduct(null));
    }, [])
    const materialsString = localStorage.getItem('materials');
    if (!materialsString) return <Navigate to={{pathname: '/'}}/>;
    const materials = JSON.parse(materialsString)
    return (
        <div className="page">
            <CabinetsMain values={materials}/>
            <Sidebar values={materials} cart={cart} cartLength={cartLength} total={total} />
        </div>
    );
};

export default Cabinets;