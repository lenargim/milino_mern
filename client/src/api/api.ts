import {AdminUsersType, EditProfileType, LogInType, SignUpType, UserTypeResponse} from "./apiTypes";
import {RoomTypeAPI} from "../store/reducers/roomSlice";
import axios from "axios";
import {CartAPI, CartAPIResponse} from "./apiFunctions";
import {MaterialsFormType} from "../common/MaterialsForm";


const instanceFormData = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': "multipart/form-data"
    },
});

const instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: process.env.REACT_APP_BASE_URL,
    responseType: 'json'
});

const constructor_instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 59tyoO828vPAbyx1wZpvZwGW19C1QIDO`
    },
    baseURL: process.env.REACT_APP_CONSTRUCTOR_ENV,
    responseType: 'json',
});


const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
})

export const checkoutAPI = {
    postEmail: (form:FormData) => instanceFormData.post('/email', form)
}

export const AuthAPI = {
    signUp: (data:SignUpType) => instance.post('/auth/register', data),
    logIn: (data:LogInType ) => instance.post<UserTypeResponse>('auth/login', data),
    // refresh: () => instance.post('auth/jwt/refresh', null, {headers: getHeaders()}),
}

export const usersAPI = {
    me: () => instance.get('/users/me', {headers: getHeaders()}),
    patchMe: (data:EditProfileType) => instance.patch<UserTypeResponse>('/users/me', data, {headers: getHeaders()})
}

export const roomsAPI = {
    getOne: (roomId:string) => instance.get<RoomTypeAPI>(`/rooms/${roomId}`, {headers: getHeaders()}),
    getAll: () => instance.get<RoomTypeAPI[]>('/rooms', {headers: getHeaders()}),
    createRoom: (room:MaterialsFormType) => instance.post<RoomTypeAPI>('/rooms', room,{headers: getHeaders()} ),
    editRoom: (room:MaterialsFormType, id:string) => instance.patch<RoomTypeAPI>(`/rooms/${id}`, room,{headers: getHeaders()} ),
    deleteRoom: (id:string) => instance.delete<RoomTypeAPI>(`/rooms/${id}`,{headers: getHeaders()} ),
}

export const cartAPI = {
    getCart: (roomId:string) => instance.get<CartAPIResponse[]>(`/cart/${roomId}`, {headers: getHeaders()}),
    addToCart: (cart:CartAPI, roomId:string) => instance.post<CartAPIResponse[]>(`/cart/${roomId}`, cart,  {headers: getHeaders()}),
    updateAmount: ( room:string,_id:string, amount:number) => instance.patch<CartAPIResponse[]>(`/cart/${room}/${_id}`, {amount:amount},  {headers: getHeaders()}),
    remove: (room:string,_id:string) => instance.delete(`/cart/${room}/${_id}`,{headers: getHeaders()}),
}

export const AdminAPI = {
    getUsers: () => instance.get<AdminUsersType[]>(`/admin/users`, {headers: getHeaders()}),
    toggleUserEnabled: (_id:string, is_active:boolean) => instance.patch<AdminUsersType>(`/admin/user/${_id}`, {is_active}, {headers: getHeaders()}),
}

export const ConstructorAPI = {
    getCustomers: () => constructor_instance.get('customers'),
}