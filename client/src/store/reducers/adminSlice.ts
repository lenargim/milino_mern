import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AdminUsersRes, AdminUsersType, UserType} from "../../api/apiTypes";
import {MaybeUndefined} from "../../helpers/productTypes";
import {getUser} from "../../api/apiFunctions";

const initialState: AdminUsersRes = {
    users: [],
    hasNextPage: false,
    page: 1,
    sort: {"createdAt": 1},
    editable_user: null,
    loading: false,
}

export const getEditableUser = createAsyncThunk<MaybeUndefined<UserType>, {_id:string}>(
    'admin/loadUser',
    async ({_id}) => {
        return await getUser(_id);
    }
);

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
    },
    extraReducers: builder => {
        builder
            .addCase(getEditableUser.pending, state => {
                state.loading = true;
            })
            .addCase(getEditableUser.fulfilled, (state, action) => {
                state.editable_user = action.payload ?? null;
                state.loading = false;
            })
            .addCase(getEditableUser.rejected, state => {
                state.editable_user = null;
                state.loading = false;
            });
    }
})

export const {setAdminUsers, setAdminUserEnabled} = adminSlice.actions

export default adminSlice.reducer