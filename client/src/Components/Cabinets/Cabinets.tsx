import React, {FC, useEffect} from 'react';
import CabinetsMain from "./CabinetsMain";
import {getCartData, getStorageMaterials, useAppDispatch, useAppSelector} from "../../helpers/helpers";
// import {setProduct} from "../../store/reducers/generalSlice";
import {Navigate} from "react-router-dom";
import Sidebar from "../OrderForm/Sidebar/Sidebar";

const Cabinets: FC = () => {
    // const dispatch = useAppDispatch()
    // const cartState = useAppSelector(state => state.general.cart)
    // const {cart, total, cartLength} = getCartData(cartState,dispatch);
    // useEffect(() => {
    //     dispatch(setProduct(null));
    // }, [])

    const materials = getStorageMaterials();
    if (!materials) return <Navigate to={{pathname: '/'}}/>;
    return (
        <div className="page">
            <CabinetsMain materials={materials}/>
            <Sidebar materials={materials} />
        </div>
    );
};

export default Cabinets;