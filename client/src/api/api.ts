import {AdminUsersType, EditProfileType, LogInType, SignUpType, UserTypeResponse} from "./apiTypes";
import {RoomTypeAPI} from "../store/reducers/roomSlice";
import axios from "axios";
import {CartAPI, CartAPIResponse} from "./apiFunctions";
import {MaterialsFormType} from "../common/MaterialsForm";
import {Customer} from "../helpers/constructorTypes";
import {UserAccessData} from "../Components/Profile/ProfileAdmin";


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

const prodboard_instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: process.env.REACT_APP_CONSTRUCTOR_PRODBOARD_URL,
    responseType: 'json',
});



const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
})

const getConstructorHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("constructor_token")}`
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
    patchMe: (data:EditProfileType) => instance.patch<UserTypeResponse>('/users/me', data, {headers: getHeaders()}),
    constructorSave: (_id:string) => instance.patch<UserTypeResponse>(`/users/constructor`, {_id}, {headers: getHeaders()})
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
    toggleUserEnabled: (_id:string, user_data:UserAccessData) => instance.patch<AdminUsersType>(`/admin/user/${_id}`, user_data, {headers: getHeaders()}),
}

export const ConstructorAPI = {
    getToken: () => prodboard_instance.post('security/get-token', {
        "company": process.env.REACT_APP_CONSTRUCTOR_PRODBOARD_COMPANY,
        "privateKey": process.env.REACT_APP_CONSTRUCTOR_PRODBOARD_PRIVATE
    }),
    setCustomer: (customer:Customer) => prodboard_instance.post('customers', customer, {headers: getConstructorHeaders()}),
    getCustomers: () => prodboard_instance.get('customers'),
    getCustomer: (id:string) => prodboard_instance.get(`customers/${id}`,{headers: getConstructorHeaders()}),
    signIn: (token:string) => prodboard_instance.post('sign-in', { token: token }),
    getCustomerToken: (email:string) => prodboard_instance.get(`customers/${email}/token`, {headers: getConstructorHeaders()})
}