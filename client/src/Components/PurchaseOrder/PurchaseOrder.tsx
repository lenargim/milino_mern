import React, {useEffect, useRef} from 'react';
import s from "../Profile/profile.module.sass";
import {NavLink, Outlet, useLocation} from "react-router-dom";
import RoomSidebar from "../Room/RoomSidebar";
import {MaybeNull} from "../../helpers/productTypes";
import {textToLink, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {setPOs} from "../../store/reducers/purchaseOrderSlice";
import {getAllPOs} from "../../api/apiFunctions";

const PurchaseOrder = () => {
    const location = useLocation();
    const {purchase_orders} = useAppSelector(state => state.purchase_order);
    const {_id} = useAppSelector(state => state.user.user);
    const dispatch = useAppDispatch();
    const scrollToRef = useRef<MaybeNull<HTMLDivElement>>(null);

    useEffect(() => {
        const scrollEl = scrollToRef.current;
        if (scrollEl) {
            scrollEl.scrollIntoView(true);
        }
    }, [location.pathname])

    // eslint-disable-next-line
    useEffect(() => {
        console.log('d')
        _id && getAllPOs(_id).then(data => {
            data && dispatch(setPOs(data));
        })
        // eslint-disable-next-line
    }, [_id]);

    if (!_id) return null;

    return (
        <div className={s.rooms}>
            <div className={s.roomsMain}>
                <h1 ref={scrollToRef}>Purchase orders</h1>
                <nav className={s.nav}>
                    {purchase_orders.length
                            ? purchase_orders.map(item => <NavLink key={item._id} className={
                                ({isActive}) => [isActive ? s.linkActive : '', s.navItem].join(' ')}
                                                                 to={textToLink(item.name)}>{item.name}</NavLink>)
                            : null}
                    <NavLink className={({isActive}) => [isActive ? s.linkActive : '', s.navItem].join(' ')}
                             to="new">Add PO +</NavLink>
                </nav>
                <Outlet context={{user_id: _id,purchase_orders}}/>
            </div>
            <RoomSidebar/>
        </div>
    );
};

export default PurchaseOrder;