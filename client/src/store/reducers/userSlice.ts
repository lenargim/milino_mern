import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OrderTypeAPI, UserType} from "../../api/apiTypes";
import {me} from "../../helpers/helpers";
import {MaybeNull} from "../../helpers/productTypes";

export interface UserState {
    loading: boolean,
    user: MaybeNull<UserType>,
    orders: OrderTypeAPI[]
}

export const emptyUser:UserType = {
    _id: '',
    email: '',
    name: '',
    company: '',
    phone: '',
    is_active: false,
    is_super_user: false,
    is_active_in_constructor: false
}

export const loadUser = createAsyncThunk<MaybeNull<UserType>>(
    'user/loadUser',
    async (_) => {
        const token = localStorage.getItem('token');
        const user = await me(token);
        return user; // if null, reducers can handle clearing the state
    }
);

const initialState: UserState = {
    loading: false,
    user: null,
    orders: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<MaybeNull<UserType>>) => {
            state.user = action.payload;
        },
        logout(state) {
            state.user = null;
            state.loading = false;
            localStorage.removeItem('category')
            localStorage.removeItem('token')
            localStorage.removeItem('constructor_token')
            localStorage.removeItem('customer_token')
        },
        setOrders: (state, action: PayloadAction<OrderTypeAPI[]>) => {
            state.orders = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadUser.pending, state => {
                state.loading = true;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(loadUser.rejected, state => {
                state.user = null;
                state.loading = false;
                localStorage.removeItem('category')
                localStorage.removeItem('token')
                localStorage.removeItem('constructor_token')
                localStorage.removeItem('customer_token')
            });
    }
})

export const {setUser, logout, setOrders} = userSlice.actions

export default userSlice.reducer