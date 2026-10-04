import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type PurchaseOrdersState = {
    purchase_orders: PurchaseOrderType[]
}
export type PurchaseOrderType = {
    _id: string,
    name: string,
    user_id: string,
    is_archived: boolean,
}

const initialState: PurchaseOrdersState = {
    purchase_orders: [],
}

const purchase_order_slice = createSlice({
    name: 'purchase_order',
    initialState,
    reducers: {
        setPOs: (state, action: PayloadAction<PurchaseOrderType[]>) => {
            state.purchase_orders = action.payload;
        },
        addPO: (state, action: PayloadAction<PurchaseOrderType>) => {
            state.purchase_orders.push(action.payload)
        },
        editPO: (state, action: PayloadAction<PurchaseOrderType[]>) => {
            state.purchase_orders = action.payload
        },
    }
})

export const {
    addPO,
    setPOs,
    editPO
} = purchase_order_slice.actions

export default purchase_order_slice.reducer
