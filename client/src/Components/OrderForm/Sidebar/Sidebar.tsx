import React, {FC} from 'react';
import {OrderFormType} from "../../../helpers/types";
import s from './sidebar.module.sass'
import Materials from "../../../common/Materials";
import SidebarCart from "./SidebarCart";
import {CartItemType} from "../../../store/reducers/generalSlice";

type SideBarType = {
    values: OrderFormType,
    cart: CartItemType[],
    total: number,
    cartLength: number
}
const Sidebar: FC<SideBarType> = ({values, cart, total, cartLength}) => {
    return (
        <aside className={s.sidebar}>
            <div className={s.sidebarContent}>
                <Materials data={values}/>
                {cartLength ? <SidebarCart cart={cart} total={total} />:null}
            </div>
        </aside>
    );
};

export default Sidebar;


