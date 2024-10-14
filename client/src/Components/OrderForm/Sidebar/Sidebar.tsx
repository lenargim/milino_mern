import React, {FC} from 'react';
import s from './sidebar.module.sass'
import Materials from "../../../common/Materials";
import SidebarCart from "./SidebarCart";
import {getCartData, useAppDispatch, useAppSelector} from "../../../helpers/helpers";
import {MaterialsFormType} from "../../../common/MaterialsForm";


const Sidebar: FC<{materials: MaterialsFormType}> = ({materials}) => {
    const dispatch = useAppDispatch();
    const cartState = useAppSelector(state => state.general.cart)
    const {cart, total, cartLength} = getCartData(cartState, dispatch);
    return (
        <aside className={s.sidebar}>
            <div className={s.sidebarContent}>
                <Materials materials={materials}/>
                {cartLength ? <SidebarCart cart={cart} total={total}/> : null}
            </div>
        </aside>
    );
};

export default Sidebar;


