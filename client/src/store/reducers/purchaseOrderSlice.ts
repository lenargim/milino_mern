import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MaybeNull} from "../../helpers/productTypes";

export type PurchaseOrdersState = {
    purchase_orders: PurchaseOrderType[],
    active_po: MaybeNull<string>
}
export type PurchaseOrderType = {
    _id:string,
    name:string,
    user_id: string
}

const initialState: PurchaseOrdersState = {
    purchase_orders: [],
    active_po: null
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
        setActivePO: (state, action: PayloadAction<string>) => {
            state.active_po = action.payload
        }
    }
})

export const {
    addPO,
    setPOs,
    editPO,
    setActivePO
} = purchase_order_slice.actions

export default purchase_order_slice.reducer
