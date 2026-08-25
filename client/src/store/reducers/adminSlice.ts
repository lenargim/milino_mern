import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AdminUsersRes, AdminUsersType, UserBasicTypesType, UserType} from "../../api/apiTypes";
import {MaybeNull, MaybeUndefined} from "../../helpers/productTypes";
import {getUser} from "../../api/apiFunctions";

export interface AdminStateType {
    designers: AdminUsersRes,
    managers: AdminUsersRes,
    loading: boolean,
    editable_user: MaybeNull<UserType>,
}

const initialState:AdminStateType = {
    designers: {
        users: [],
        hasNextPage: false,
        page: 1,
        sort: {"createdAt": 1},
        totalUsersCount: 0
    },
    managers: {
        users: [],
        hasNextPage: false,
        page: 1,
        sort: {"createdAt": 1},
        totalUsersCount: 0
    },
    loading: false,
    editable_user: null,
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
            state.designers = action.payload

        },
        setAdminManagers: (state, action: PayloadAction<AdminUsersRes>) => {
            state.managers = action.payload

        },
        setAdminUserEnabled: (
            state,
            action: PayloadAction<{user:UserType, user_type:UserBasicTypesType}>
        ) => {
            const user_payload = action.payload.user;
            const user = action.payload.user_type === 'designer' ?
                state.designers.users.find(user => user._id === user_payload._id) :
                state.managers.users.find(user => user._id === user_payload._id)

            if (!user) return;
            user.is_active_in_constructor =
                user_payload.is_active_in_constructor;

            user.is_active =
                user_payload.is_active;
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

export const {setAdminUsers, setAdminUserEnabled, setAdminManagers} = adminSlice.actions

export default adminSlice.reducer