import {MaybeNull} from "../../helpers/productTypes";
import {CartAPI, CartItemFrontType} from "../../helpers/cartTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {convertCartAPIToFront} from "../../helpers/helpers";

export interface CartState {
    cart_items: MaybeNull<CartItemFrontType[]>,
    loading: boolean;
    error: MaybeNull<string>;
}

const initialState: CartState = {
    cart_items: [],
    loading: false,
    error: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action:PayloadAction<CartAPI[]>) => {
            state.cart_items = convertCartAPIToFront(action.payload)
        },
        updateCartAfterMaterialsChange: (state, action: PayloadAction<CartItemFrontType[]>) => {
            state.cart_items = action.payload
        }
    }
})

export const {
    setCart,
    updateCartAfterMaterialsChange
} = cartSlice.actions


export default cartSlice.reducer