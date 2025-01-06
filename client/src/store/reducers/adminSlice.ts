import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AdminType, AdminUsersType} from "../../api/apiTypes";

const initialState: AdminType = {
    users: []
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminUsers: (state, action: PayloadAction<AdminUsersType[]>) => {
            state.users = action.payload
        },
        setAdminUserEnabled: (state, action: PayloadAction<AdminUsersType>) => {
            state.users = state.users.map(user => {
                if (user._id !== action.payload._id) return user;
                return action.payload
            })
        },
    }
})

export const {setAdminUsers, setAdminUserEnabled} = adminSlice.actions

export default adminSlice.reducer