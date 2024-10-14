import React from 'react';
import {getCartData, getStorageMaterials, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import CartEmpty from "./CartEmpty";
import Header from "../../common/Header/Header";
import Sidebar from "../OrderForm/Sidebar/Sidebar";
import {Navigate} from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
    const dispatch = useAppDispatch()
    const cartState = useAppSelector(state => state.general.cart)
    const {cart, cartLength, total} = getCartData(cartState,dispatch)
    const materials = getStorageMaterials();
    if (!materials) return <Navigate to={{pathname: '/'}}/>;
    return (
        <div className="page">
            <div className="main">
                <div className="container">
                    <Header/>
                    {cartLength ? <CheckoutForm cart={cart} total={total} materials={materials}/> : <CartEmpty/>}
                </div>
            </div>
            <Sidebar materials={materials}/>
        </div>
    );
};

export default Checkout;