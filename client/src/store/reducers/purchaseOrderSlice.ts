import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type PurchaseOrdersState = {
    purchase_orders: PurchaseOrderType[],
    activePO: string
}
export type PurchaseOrderType = {
    _id:string,
    name:string,
    user_id: string
}

const initialState: PurchaseOrdersState = {
    purchase_orders: [],
    activePO: ''
}

export const purchase_order = createSlice({
    name: 'purchase_order',
    initialState,
    reducers: {
        setPOs: (state, action: PayloadAction<PurchaseOrderType[]>) => {
            state.purchase_orders = action.payload;
        },
        addPO: (state, action: PayloadAction<PurchaseOrderType>) => {
            state.purchase_orders.push(action.payload)
        },
        // setPO: (state, action: PayloadAction<PurchaseOrder>) => {
        //     state.purchase_orders = state.purchase_orders.find(el => el._id === action.payload._id)
        // },
        editPO: (state, action: PayloadAction<PurchaseOrderType>) => {
            state.purchase_orders = state.purchase_orders.map(el => {
                return el._id === action.payload._id ? action.payload : el;
            })
        },
        // deletePO: (state, action: PayloadAction<POTypeAPI>) => {
        //     state.rooms = state.rooms.filter(room => room._id !== action.payload._id);
        // },
        SetActivePO: (state, action: PayloadAction<{ _id: string }>) => {
            state.activePO = action.payload._id
        }
    }
})

export const {
    addPO,
    setPOs,
    // getPOs,
    editPO
} = purchase_order.actions

export default purchase_order.reducer