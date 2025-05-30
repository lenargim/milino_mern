import {
    AdminUsersRes,
    AdminUsersType,
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
import {RoomNewType, RoomType} from "../helpers/roomTypes";
import {CartAPI, CartAPIResponse, CartNewType} from "../helpers/cartTypes";

const instanceFormData = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': "multipart/form-data"
    }
});

const instance = axios.create({
    withCredentials: true,
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

//
// instance.interceptors.response.use(
//     res => res,
//     async (error: AxiosError) => {
//         const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
//         // If token expired
//         if (
//             error.response?.status === 401 &&
//             !originalRequest._retry
//         ) {
//             originalRequest._retry = true;
//             // Queue retry if already refreshing
//             if (isRefreshing) {
//                 return new Promise((resolve, reject) => {
//                     failedQueue.push((newToken: string | null) => {
//                         if (newToken) {
//                             originalRequest.headers = {
//                                 ...originalRequest.headers,
//                                 Authorization: `Bearer ${newToken}`
//                             };
//                             resolve(instance(originalRequest));
//                         } else {
//                             reject(error);
//                         }
//                     });
//                 });
//             }
//             // Start refresh
//             isRefreshing = true;
//             try {
//                 const newToken = await refreshTokenAPI();
//                 if (!newToken) throw new Error('Refresh failed');
//                 localStorage.setItem('token', newToken);
//                 // Retry all queued requests
//                 failedQueue.forEach(cb => cb(newToken));
//                 failedQueue = [];
//                 originalRequest.headers = {
//                     ...originalRequest.headers,
//                     Authorization: `Bearer ${newToken}`
//                 };
//                 return instance(originalRequest);
//             } catch (refreshError) {
//                 // Clear queue and logout
//                 failedQueue.forEach(cb => cb(null));
//                 failedQueue = [];
//                 localStorage.removeItem('token');
//                 store.dispatch(logout());
//                 window.location.href = '/';
//                 return Promise.reject(refreshError);
//             } finally {
//                 isRefreshing = false;
//             }
//         }
//         return Promise.reject(error);
//     }
// );



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
    logIn: (data: LogInType):Promise<AxiosResponse<UserAndTokenType>> => instance.post('auth/login', data),
}

export const usersAPI = {
    me: ():Promise<AxiosResponse<UserType>> => instance.get('/users/me', {headers: getHeaders()}),
    patchMe: (data: EditProfileType):Promise<AxiosResponse<UserType>> => instance.patch<UserType>('/users/me', data, {headers: getHeaders()}),
    refreshToken: ():Promise<AxiosResponse<string>> => instance.post('/users/refresh',)
}

export const PurchaseOrdersAPI = {
    getAll: (user_id: string): Promise<AxiosResponse<PurchaseOrderType[]>> => instance.get(`/po/${user_id}`, {headers: getHeaders()}),
    createPO: (purchase_order: PONewType): Promise<AxiosResponse<PurchaseOrderType>> => instance.post('/po', purchase_order, {headers: getHeaders()}),
    deletePO: (user_id:string,purchase_order_id:string): Promise<AxiosResponse<PurchaseOrderType[]>> => instance.patch(`/po/delete`, {user_id, purchase_order_id},{headers: getHeaders()} ),
    editPO: (purchase_order: PurchaseOrderType):Promise<AxiosResponse<PurchaseOrderType>> => instance.patch(`/po/${purchase_order._id}`, purchase_order, {headers: getHeaders()}),
}

export const roomsAPI = {
    getRooms: (purchase_order_id: string): Promise<AxiosResponse<RoomType[]>> => instance.get(`/rooms/${purchase_order_id}`, {headers: getHeaders()}),
    createRoom: (room: RoomNewType): Promise<AxiosResponse<RoomType>> => instance.post('/rooms', room, {headers: getHeaders()}),
    deleteRoom: (purchase_order_id:string,room_id: string): Promise<AxiosResponse<RoomType[]>> => instance.patch(`/rooms/delete`, {purchase_order_id,room_id}, {headers: getHeaders()}),
    editRoom: (room: RoomType): Promise<AxiosResponse<RoomType[]>> => instance.patch(`/rooms/${room._id}`, room, {headers: getHeaders()}),
}

export const cartAPI = {
    getCart: (roomId: string): Promise<AxiosResponse<CartAPIResponse>> => instance.get(`/cart/${roomId}`, {headers: getHeaders()}),
    addToCart: (cart: CartNewType): Promise<AxiosResponse<CartAPIResponse>> => instance.post(`/cart`, cart, {headers: getHeaders()}),
    remove: (room_id: string, _id: string): Promise<AxiosResponse<CartAPIResponse>> => instance.delete(`/cart/${room_id}/${_id}`, {headers: getHeaders()}),
    updateAmount: (room_id: string, _id: string, amount: number): Promise<AxiosResponse<CartAPIResponse>> => instance.patch(`/cart/${room_id}/${_id}`, {amount: amount}, {headers: getHeaders()}),
}

export const AdminAPI = {
    getUsers: (sort: SortAdminUsers, page: number):Promise<AxiosResponse<AdminUsersRes>> => instance.post(`/admin/users`, {
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