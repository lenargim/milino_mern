import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OrderTypeAPI, UserType} from "../../api/apiTypes";
import {MaybeNull, MaybeUndefined} from "../../helpers/productTypes";
import {me} from "../../api/apiFunctions";

export interface UserState {
    loading: boolean,
    user: MaybeNull<UserType>,
    orders: OrderTypeAPI[]
}

export const loadUser = createAsyncThunk<MaybeUndefined<UserType>>(
    'user/loadUser',
    async (_) => {
        return await me();
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
                const user = action.payload ?? null;
                state.user = user;
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