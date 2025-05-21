import { configureStore } from '@reduxjs/toolkit'
import generalSlice from "./reducers/generalSlice";
import userSlice from "./reducers/userSlice";
import roomSlice from "./reducers/roomSlice";
import adminSlice from "./reducers/adminSlice";
import POSlice from "./reducers/purchaseOrderSlice"

export const store = configureStore({
  reducer: {
    general: generalSlice,
    user: userSlice,
    room: roomSlice,
    admin: adminSlice,
    purchase_order: POSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch