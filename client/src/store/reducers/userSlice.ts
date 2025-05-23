import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OrderTypeAPI, UserType} from "../../api/apiTypes";

export interface UserState {
    isAuth: boolean,
    user: UserType,
    orders: OrderTypeAPI[]
}

export const emptyUser = {
    _id: '',
    email: '',
    name: '',
    company: '',
    phone: '',
    is_active: false,
    is_super_user: false,
    is_active_in_constructor: false
}

const initialState: UserState = {
    isAuth: false,
    user: emptyUser,
    orders: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserType>) => {
            state.isAuth = true;
            state.user = action.payload;
        },
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
        setOrders: (state, action: PayloadAction<OrderTypeAPI[]>) => {
            state.orders = action.payload
        }
    }
})

export const {setUser, setIsAuth,setOrders} = userSlice.actions

export default userSlice.reducer