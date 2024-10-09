import axios from "axios";
import {EditProfileType, LogInType, SignUpType} from "./apiTypes";
import {RoomTypeAPI} from "../store/reducers/roomSlice";
import {RoomInitialType} from "../Components/Profile/RoomForm";
import product from "../Components/Product/Product";
import cartItem from "../Components/Product/CartItem";
import {CartItemType} from "../store/reducers/generalSlice";
import {CartAPI, CartAPIResponse} from "./apiFunctions";

const instanceFormData = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': "multipart/form-data"
    },
})

const instance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})


const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
})

export const checkoutAPI = {
    postEmail: (form:FormData) => instanceFormData.post('api/email', form)
}

export const AuthAPI = {
    signUp: (data:SignUpType) => instance.post('/api/auth/register', data),
    logIn: (data:LogInType ) => instance.post('/api/auth/login', data),
    // refresh: () => instance.post('auth/jwt/refresh', null, {headers: getHeaders()}),
}

export const usersAPI = {
    me: () => instance.get('/api/users/me', {headers: getHeaders()}),
    patchMe: (data:EditProfileType) => instance.patch('/api/users/me', data, {headers: getHeaders()})
}


export const roomsAPI = {
    getAll: () => instance.get<RoomTypeAPI[]>('/api/rooms', {headers: getHeaders()}),
    createRoom: (room:RoomInitialType) => instance.post<RoomTypeAPI>('/api/rooms', room,{headers: getHeaders()} ),
    editRoom: (room:RoomInitialType, id:string) => instance.patch<RoomTypeAPI>(`/api/rooms/${id}`, room,{headers: getHeaders()} ),
    deleteRoom: (id:string) => instance.delete<RoomTypeAPI>(`/api/rooms/${id}`,{headers: getHeaders()} ),
}

export const cartAPI = {
    addToCart: (cart:CartAPI, _id:string) => instance.post<CartAPIResponse[]>(`/api/cart/${_id}`, cart,  {headers: getHeaders()})
}