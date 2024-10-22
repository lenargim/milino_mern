import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserType} from "../../api/apiTypes";

export interface UserState {
    isAuth: boolean,
    user: UserType,
}

export const emptyUser = {
    _id: '',
    email: '',
    name: '',
}

const initialState: UserState = {
    isAuth: false,
    user: emptyUser,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserType>) => {
            state.isAuth = true;
            state.user = action.payload;
        },
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        }
    }
})

export const {setUser, setIsAuth} = userSlice.actions

export default userSlice.reducer