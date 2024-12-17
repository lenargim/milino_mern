import {EditProfileType, LogInType, SignUpType, UserTypeResponse} from "./apiTypes";
import {RoomTypeAPI} from "../store/reducers/roomSlice";

import axios from "axios";
import {CartAPI, CartAPIResponse} from "./apiFunctions";
import {MaterialsFormType} from "../common/MaterialsForm";
import {OrderType} from "../helpers/productTypes";

const instanceFormData = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': "multipart/form-data"
    },
});

const instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: process.env.BASE_URL,
    responseType: 'json'
});


const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
})

export const checkoutAPI = {
    postEmail: (form:FormData) => instanceFormData.post('/api/email', form)
}

export const AuthAPI = {
    signUp: (data:SignUpType) => instance.post<UserTypeResponse>('/api/auth/register', data),
    logIn: (data:LogInType ) => instance.post('/api/auth/login', data),
    // refresh: () => instance.post('auth/jwt/refresh', null, {headers: getHeaders()}),
}

export const usersAPI = {
    me: () => instance.get('/api/users/me', {headers: getHeaders()}),
    patchMe: (data:EditProfileType) => instance.patch<UserTypeResponse>('/api/users/me', data, {headers: getHeaders()})
}

export const roomsAPI = {
    getOne: (roomId:string) => instance.get<RoomTypeAPI>(`/api/rooms/${roomId}`, {headers: getHeaders()}),
    getAll: () => instance.get<RoomTypeAPI[]>('/api/rooms', {headers: getHeaders()}),
    createRoom: (room:MaterialsFormType) => instance.post<RoomTypeAPI>('/api/rooms', room,{headers: getHeaders()} ),
    editRoom: (room:MaterialsFormType, id:string) => instance.patch<RoomTypeAPI>(`/api/rooms/${id}`, room,{headers: getHeaders()} ),
    deleteRoom: (id:string) => instance.delete<RoomTypeAPI>(`/api/rooms/${id}`,{headers: getHeaders()} ),
}

export const cartAPI = {
    getCart: (roomId:string) => instance.get<CartAPIResponse[]>(`/api/cart/${roomId}`, {headers: getHeaders()}),
    addToCart: (cart:CartAPI, roomId:string) => instance.post<CartAPIResponse[]>(`/api/cart/${roomId}`, cart,  {headers: getHeaders()}),
    updateAmount: ( room:string,_id:string, amount:number) => instance.patch<CartAPIResponse[]>(`/api/cart/${room}/${_id}`, {amount:amount},  {headers: getHeaders()}),
    remove: (room:string,_id:string) => instance.delete(`/api/cart/${room}/${_id}`,{headers: getHeaders()}),
}


export const orderAPI = {
    placeOrder: (roomId:string, data: {order:OrderType[], total:number}) => instance.post(`/api/order/${roomId}`, data ,{headers: getHeaders()}),
}