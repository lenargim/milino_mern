import { configureStore } from '@reduxjs/toolkit'
import generalSlice from "./reducers/generalSlice";
import userSlice from "./reducers/userSlice";
import roomSlice from "./reducers/roomSlice";

export const store = configureStore({
  reducer: {
    general: generalSlice,
    user: userSlice,
    room: roomSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch