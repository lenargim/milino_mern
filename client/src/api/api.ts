
import {EditProfileType, LogInType, SignUpType} from "./apiTypes";
import {RoomTypeAPI} from "../store/reducers/roomSlice";

import {CartAPI, CartAPIResponse} from "./apiFunctions";
import axios from "axios";
import {MaterialsFormType} from "../common/MaterialsForm";


const instanceFormData = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': "multipart/form-data"
    },
})

const instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: process.env.BASE_URL,
    responseType: 'json'
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
    createRoom: (room:MaterialsFormType) => instance.post<RoomTypeAPI>('/api/rooms', room,{headers: getHeaders()} ),
    editRoom: (room:MaterialsFormType, id:string) => instance.patch<RoomTypeAPI>(`/api/rooms/${id}`, room,{headers: getHeaders()} ),
    deleteRoom: (id:string) => instance.delete<RoomTypeAPI>(`/api/rooms/${id}`,{headers: getHeaders()} ),
}

export const cartAPI = {
    addToCart: (cart:any, roomId:string) => instance.post<CartAPIResponse[]>(`/api/cart/${roomId}`, cart,  {headers: getHeaders()}),
    updateAmount: ( _id:string,amount:number) => instance.patch<CartAPIResponse>(`/api/cart/${_id}`, {amount:amount},  {headers: getHeaders()}),
    remove: (_id:string) => instance.delete(`/api/cart/${_id}`,{headers: getHeaders()}),
}