import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./reducers/userSlice";
import roomSlice from "./reducers/roomSlice";
import adminSlice from "./reducers/adminSlice";
import POSlice from "./reducers/purchaseOrderSlice"
import cartSlice from "./reducers/cartSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    room: roomSlice,
    admin: adminSlice,
    purchase_order: POSlice,
    cart: cartSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch