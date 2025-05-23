import {AdminUsersType, EditProfileType, LogInType, SignUpType, UserTypeResponse} from "./apiTypes";
import axios, {AxiosResponse} from "axios";
import {Customer} from "../helpers/constructorTypes";
import {SortAdminUsers, UserAccessData} from "../Components/Profile/ProfileAdmin";
import {PurchaseOrderType} from "../store/reducers/purchaseOrderSlice";
import {PONewType} from "../Components/PurchaseOrder/PurchaseOrderNew";
import {RoomType} from "../helpers/roomTypes";
import {CartAPI} from "../helpers/cartTypes";


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
    postEmail: (form: FormData) => instanceFormData.post('/email', form)
}

export const AuthAPI = {
    signUp: (data: SignUpType) => instance.post('/auth/register', data),
    logIn: (data: LogInType) => instance.post<UserTypeResponse>('auth/login', data),
    // refresh: () => instance.post('auth/jwt/refresh', null, {headers: getHeaders()}),
}

export const usersAPI = {
    me: () => instance.get('/users/me', {headers: getHeaders()}),
    patchMe: (data: EditProfileType) => instance.patch<UserTypeResponse>('/users/me', data, {headers: getHeaders()})
}

export const roomsAPI = {
    getRooms: (purchase_order_id: string): Promise<AxiosResponse<RoomType[]>> => instance.get(`/rooms/${purchase_order_id}`, {headers: getHeaders()}),
    getOne: (roomId: string): Promise<AxiosResponse<RoomType>> => instance.get(`/room/${roomId}`, {headers: getHeaders()}),
    createRoom: (room: RoomType): Promise<AxiosResponse<RoomType>> => instance.post('/rooms', room, {headers: getHeaders()}),
    editRoom: (room: RoomType): Promise<AxiosResponse<RoomType>> => instance.patch(`/rooms/${room._id}`, room, {headers: getHeaders()}),
    deleteRoom: (id: string): Promise<AxiosResponse<RoomType>> => instance.delete(`/rooms/${id}`, {headers: getHeaders()}),
}

export const cartAPI = {
    getCart: (roomId: string): Promise<AxiosResponse<CartAPI[]>> => instance.get(`/cart/${roomId}`, {headers: getHeaders()}),
    addToCart: (cart: CartAPI): Promise<AxiosResponse<CartAPI[]>> => instance.post(`/cart/${cart.room_id}`, cart, {headers: getHeaders()}),
    updateAmount: (room: string, _id: string, amount: number): Promise<AxiosResponse<CartAPI[]>> => instance.patch(`/cart/${room}/${_id}`, {amount: amount}, {headers: getHeaders()}),
    remove: (room: string, _id: string): Promise<AxiosResponse<CartAPI[]>> => instance.delete(`/cart/${room}/${_id}`, {headers: getHeaders()}),
}

export const AdminAPI = {
    getUsers: (sort: SortAdminUsers, page: number) => instance.post(`/admin/users`, {
        sort,
        page
    }, {headers: getHeaders()}),
    toggleUserEnabled: (_id: string, user_data: UserAccessData) => instance.patch<AdminUsersType>(`/admin/user/${_id}`, user_data, {headers: getHeaders()}),
}

export const ConstructorAPI = {
    getToken: (): Promise<AxiosResponse<string>> => prodboard_instance.post('security/get-token', {
        "company": process.env.REACT_APP_CONSTRUCTOR_PRODBOARD_COMPANY,
        "privateKey": process.env.REACT_APP_CONSTRUCTOR_PRODBOARD_PRIVATE
    }),
    setCustomer: (customer: Customer) => prodboard_instance.post('customers', customer, {headers: getConstructorHeaders()}),
    getCustomers: () => prodboard_instance.get('customers'),
    getCustomer: (id: string) => prodboard_instance.get(`customers/${id}`, {headers: getConstructorHeaders()}),
    signIn: (token: string) => prodboard_instance.post('sign-in', {token: token}),
    getCustomerToken: (email: string) => prodboard_instance.get(`customers/${email}/token`, {headers: getConstructorHeaders()})
}


export const PurchaseOrdersAPI = {
    getAll: (user_id: string): Promise<AxiosResponse<PurchaseOrderType[]>> => instance.get(`po/${user_id}`, {headers: getHeaders()}),
    createPO: (purchase_order: PONewType): Promise<AxiosResponse<PurchaseOrderType>> => instance.post('/po', purchase_order, {headers: getHeaders()}),
    // getOne: (roomId:string) => instance.get<RoomType>(`/rooms/${roomId}`, {headers: getHeaders()}),
    // editRoom: (room:MaterialsFormType, id:string) => instance.patch<RoomType>(`/rooms/${id}`, room,{headers: getHeaders()} ),
    // deleteRoom: (id:string) => instance.delete<RoomType>(`/rooms/${id}`,{headers: getHeaders()} ),
}