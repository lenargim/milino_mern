import React, {FC, useEffect, useState} from 'react';
import s from './profile.module.sass'
import {EditProfileType, OrderTypeApi, UserType} from "../../api/apiTypes";
import {formatDateToText, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {getAllOrders} from "../../api/apiFunctions";
import {setOrders} from "../../store/reducers/userSlice";

const ProfileOrders: FC<{ user: UserType }> = ({user}) => {
    const dispatch = useAppDispatch();
    const initialValues: EditProfileType = {...user, password: ''};
    const [values, setValues] = useState<EditProfileType>(initialValues);
    const {name} = values
    const orders = useAppSelector(state => state.user.orders)
    useEffect(() => {
        user._id && getAllOrders(user._id).then(data => {
            console.log(data)
            if (data) dispatch(setOrders(data))
        })
    }, [user]);

    return (
        <>
            <div className={s.roomEdit}>
                <h1>Orders History</h1>
                {orders.length ?
                    <div className={s.orderList}>
                        <div className={s.orderHead}>
                            <span>Project Name</span>
                            <span>Products</span>
                            <span>Total $</span>
                            <span>Date</span>
                        </div>
                        {orders.map((order, index) => <OrderItem order={order} key={index}/>)}
                    </div> :
                    <div>Your order history is empty</div>
                }
            </div>
        </>
    );
};

export default ProfileOrders;


const OrderItem: FC<{ order: OrderTypeApi }> = ({order}) => {
    const orderDate = formatDateToText(order.createdAt);
    return (
        <div className={s.orderRow}>
            <span>{order.room_name}</span>
            <span>{order.order.length}</span>
            <span>{order.total}</span>
            <span>{orderDate}</span>
        </div>
    )
}