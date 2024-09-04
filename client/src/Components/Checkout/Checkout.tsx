import React from 'react';
import {getCartData, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import CartEmpty from "./CartEmpty";
import Header from "../../common/Header/Header";
import Sidebar from "../OrderForm/Sidebar/Sidebar";
import {Navigate} from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
    const dispatch = useAppDispatch()
    const cartState = useAppSelector(state => state.general.cart)
    const {cart, cartLength, total} = getCartData(cartState,dispatch)
    const materialsString = localStorage.getItem('materials');
    if (!materialsString) return <Navigate to={{pathname: '/'}}/>;
    const materials = JSON.parse(materialsString)
    return (
        <div className="page">
            <div className="main">
                <div className="container">
                    <Header/>
                    {cartLength ? <CheckoutForm cart={cart} total={total} materials={materials}/> : <CartEmpty/>}
                </div>
            </div>
            <Sidebar values={materials} total={total} cartLength={cartLength} cart={cart}/>
        </div>
    );
};

export default Checkout;