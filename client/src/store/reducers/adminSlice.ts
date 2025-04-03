import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { AdminUsersRes, AdminUsersType} from "../../api/apiTypes";

const initialState: AdminUsersRes = {
    users: [],
    hasNextPage: false,
    page: 1,
    sort: {"createdAt": 1}
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminUsers: (state, action: PayloadAction<AdminUsersRes>) => {
            const {users, sort, hasNextPage, page} = action.payload
            state.users = users;
            state.page = page;
            state.hasNextPage = hasNextPage;
            state.sort = sort;
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