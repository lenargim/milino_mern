import {
    AdminUsersRes,
    EditProfileType,
    LogInType,
    SignUpType,
    UserAndTokenType,
    UserType
} from "./apiTypes";
import axios, {AxiosResponse} from "axios";
import {Customer} from "../helpers/constructorTypes";
import {SortAdminUsers, UserAccessData} from "../Components/Profile/ProfileAdmin";
import {PurchaseOrderType} from "../store/reducers/purchaseOrderSlice";
import {PONewType} from "../Components/PurchaseOrder/PurchaseOrderNew";
import {RoomNewType, RoomOrderType, RoomType} from "../helpers/roomTypes";
import {CartAPIResponse, CartAPI} from "../helpers/cartTypes";
import {updateProduct} from "../store/reducers/roomSlice";

const instanceFormData = axios.create({
    headers: {
        'Content-Type': "multipart/form-data"
    },
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

const instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: process.env.REACT_APP_BASE_URL,
    responseType: 'json',
    withCredentials: true,
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
    postEmail: (form: FormData, company: string) => instanceFormData.post(`/email/${company}`, form, {headers: getHeaders()}),
    getCheckoutRooms: (purchase_id: string): Promise<AxiosResponse<RoomOrderType[]>> => instance.get(`/email/pdf/${purchase_id}`, {headers: getHeaders()}),
    getCheckoutRoomsAmount: (purchase_id: string): Promise<AxiosResponse<number>> => instance.get(`/email/pdf/amount/${purchase_id}`, {headers: getHeaders()}),
}

export const AuthAPI = {
    signUp: (data: SignUpType) => instance.post('/auth/register', data),
    logIn: (data: LogInType): Promise<AxiosResponse<UserAndTokenType>> => instance.post('auth/login', data),
}

export const usersAPI = {
    me: (): Promise<AxiosResponse<UserType>> => instance.get('/users/me', {headers: getHeaders()}),
    patchMe: (data: EditProfileType): Promise<AxiosResponse<UserType>> => instance.patch<UserType>('/users/me', data, {headers: getHeaders()}),
    refreshToken: (): Promise<AxiosResponse<string>> => instance.post('/users/refresh',)
}

export const PurchaseOrdersAPI = {
    getAll: (user_id: string): Promise<AxiosResponse<PurchaseOrderType[]>> => instance.get(`/po/${user_id}`, {headers: getHeaders()}),
    createPO: (purchase_order: PONewType): Promise<AxiosResponse<PurchaseOrderType>> => instance.post('/po', purchase_order, {headers: getHeaders()}),
    deletePO: (user_id: string, purchase_order_id: string): Promise<AxiosResponse<PurchaseOrderType[]>> => instance.patch(`/po/delete`, {
        user_id,
        purchase_order_id
    }, {headers: getHeaders()}),
    editPO: (purchase_order: PurchaseOrderType): Promise<AxiosResponse<PurchaseOrderType>> => instance.patch(`/po/${purchase_order._id}`, purchase_order, {headers: getHeaders()}),
}

export const roomsAPI = {
    getRooms: (purchase_order_id: string): Promise<AxiosResponse<RoomType[]>> => instance.get(`/rooms/${purchase_order_id}`, {headers: getHeaders()}),
    createRoom: (room: RoomNewType): Promise<AxiosResponse<RoomType>> => instance.post('/rooms', room, {headers: getHeaders()}),
    deleteRoom: (purchase_order_id: string, room_id: string): Promise<AxiosResponse<RoomType[]>> => instance.patch(`/rooms/delete`, {
        purchase_order_id,
        room_id
    }, {headers: getHeaders()}),
    editRoom: (room: RoomType): Promise<AxiosResponse<RoomType[]>> => instance.patch(`/rooms/${room._id}`, room, {headers: getHeaders()}),
}

export const cartAPI = {
    getCart: (roomId: string): Promise<AxiosResponse<CartAPIResponse>> => instance.get(`/cart/${roomId}`, {headers: getHeaders()}),
    addToCart: (cart: CartAPI): Promise<AxiosResponse<CartAPIResponse>> => instance.post(`/cart`, cart, {headers: getHeaders()}),
    removeAll: (room_id: string): Promise<AxiosResponse<CartAPIResponse>> => instance.delete(`/cart/all/${room_id}`, {headers: getHeaders()}),
    remove: (room_id: string, _id: string): Promise<AxiosResponse<CartAPIResponse>> => instance.delete(`/cart/${room_id}/${_id}`, {headers: getHeaders()}),
    updateAmount: (room_id: string, _id: string, amount: number): Promise<AxiosResponse<CartAPIResponse>> => instance.patch(`/cart/${room_id}/${_id}`, {amount: amount}, {headers: getHeaders()}),
    updateProduct: (cart: CartAPI): Promise<AxiosResponse<CartAPIResponse>> => instance.patch(`/cart`, cart, {headers: getHeaders()}),
}

export const AdminAPI = {
    getUsers: (sort: SortAdminUsers, page: number): Promise<AxiosResponse<AdminUsersRes>> => instance.post(`/admin/users`, {
        sort,
        page
    }, {headers: getHeaders()}),
    toggleUserEnabled: (_id: string, user_data: UserAccessData) => instance.patch(`/admin/user/${_id}`, user_data, {headers: getHeaders()}),
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