import React, {FC} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import s from './header.module.sass'
import {getCartData, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import CartSVG from "../../assets/img/cart";
import logo from '../../assets/img/SiteLogo.jpg'
import {removeCart, setMaterials} from "../../store/reducers/generalSlice";
import {FormikState} from 'formik';
import {materialsFormInitial, MaterialsFormType} from "../MaterialsForm";

const Header: FC<{ resetForm?: (nextState?: Partial<FormikState<MaterialsFormType>>) => void }> = ({resetForm}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const materials = localStorage.getItem('materials');
    const location = useLocation();
    const isAuth = useAppSelector(state => state.user.isAuth)
    const path = location.pathname.slice(1);
    const cartState = useAppSelector(state => state.general.cart)
    const {cartLength} = getCartData(cartState, dispatch);
    const isBackToCabinetsShown = !isAuth && path !== 'cabinets' && path !== '';

    const isChangeMaterialsPageShown = materials && path !== '';
    const isResetMaterialsShown = materials && path !== 'checkout';
    const isCartShown = cartLength && path !== 'checkout';
    const resetMaterials = () => {
        localStorage.removeItem('materials');
        resetForm ?
            resetForm({
                values: materialsFormInitial,
                submitCount: 0
            }) : navigate('/')
        dispatch(setMaterials(null))
        dispatch(removeCart())
    }
    return (
        <header className={s.header}>
            <div className={s.left}>
                <NavLink to={'/'} className={s.logo}><img src={logo} alt="Milino"/></NavLink>
                {isAuth ? <NavLink to={'/profile'}>Profile</NavLink> : <NavLink to={'/'}>Log In</NavLink>}
                {isBackToCabinetsShown ?
                    <NavLink to={"/cabinets"}>Back to cabinets</NavLink> : null}
            </div>
            <div className={s.right}>
                {isResetMaterialsShown ? <button type="button" onClick={() => resetMaterials()}>Reset</button> : null}
                {isChangeMaterialsPageShown ? <NavLink to={"/"}>Change materials</NavLink> : null}
                {isCartShown ? <MiniCart length={cartLength} link="/checkout"/> : null}
            </div>
        </header>
    );
};

export default Header;

export const MiniCart: FC<{ length: number, link:string }> = ({length, link}) => {
    return (
        <NavLink to={link} className={s.cart}>
            <CartSVG classes={s.cart}/>
            <span>{length}</span>
        </NavLink>
    )
}