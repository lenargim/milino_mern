import {AdminUsersRes, AdminUsersType, EditProfileType, LogInType, SignUpType, UserType} from "./apiTypes";
import {AdminAPI, AuthAPI, cartAPI, checkoutAPI, ConstructorAPI, PurchaseOrdersAPI, roomsAPI, usersAPI} from "./api";
import axios, {AxiosError, AxiosResponse} from "axios";
import {
    MaybeUndefined,
} from "../helpers/productTypes";
import {logout} from "../store/reducers/userSlice";
import {Customer} from "../helpers/constructorTypes";
import {SortAdminUsers, UserAccessData} from "../Components/Profile/ProfileAdmin";
import {jwtDecode} from "jwt-decode"
import {PONewType} from "../Components/PurchaseOrder/PurchaseOrderNew";
import {RoomNewType, RoomOrderType, RoomType} from "../helpers/roomTypes";
import {CartAPI, CartAPIResponse} from "../helpers/cartTypes";
import {PurchaseOrderType} from "../store/reducers/purchaseOrderSlice";
import {store} from "../store/store";

// 401 Unauthtorized
// 403 Forbidden
export const alertError = async (error: unknown, retryCallback?: () => Promise<any>) => {
    const axiosError = error as AxiosError;
    console.log(axiosError)
    const data:any = axiosError?.response?.data;
    const resStatus = axiosError.response?.status;
    if (resStatus === 401 && data?.type === 'token') {
        try {
            const newToken = await refreshTokenAPI();
            if (newToken) {
                localStorage.setItem('token', newToken);
                console.log(retryCallback)
                // Retry original request
                if (retryCallback) {
                    return await retryCallback();
                }
            } else {
                store.dispatch(logout());
                throw new Error('Refresh token failed');
            }
        } catch (refreshErr) {
            store.dispatch(logout());
            return;
        }
    } else if (resStatus === 403 || resStatus === 401) {
        if (data) {
            const msg = data?.message ?? axiosError.message;
            alert(msg);
        }
        store.dispatch(logout());
    } else {
        alert(axiosError.message);
    }
};

export const signUp = async (values: SignUpType): Promise<MaybeUndefined<true>> => {
    try {
        const res = await AuthAPI.signUp(values);
        if (res.status === 201) {
            return true
        }
    } catch (error) {
        return await alertError(error, () => signUp(values));
    }
}

export const updateProfile = async (values: EditProfileType):Promise<MaybeUndefined<UserType>> => {
    try {
        return (await usersAPI.patchMe(values)).data;
    } catch (error) {
        return await alertError(error, () => updateProfile(values));
    }
}


export const logIn = async (values: LogInType) => {
    try {
        const data = (await AuthAPI.logIn(values)).data;
        const {token, ...user} = data;
        localStorage.setItem('token', token);
        return user as UserType;
    } catch (error: any) {
        return alertError(error)
    }
}

export const refreshTokenAPI = async () => {
    try {
        return (await usersAPI.refreshToken()).data
    } catch (error) {
        return alertError(error);
    }
}

export const createRoomAPI = async (room: RoomNewType):Promise<MaybeUndefined<RoomType>> => {
    try {
        return (await roomsAPI.createRoom(room)).data;
    } catch (error) {
        return await alertError(error, () => createRoomAPI(room));
    }
}

export const deleteRoomAPI = async (purchase_order_id:string, room_id: string):Promise<MaybeUndefined<RoomType[]>> => {
    try {
        return (await roomsAPI.deleteRoom(purchase_order_id, room_id)).data;
    } catch (error) {
        return await alertError(error, () => deleteRoomAPI(purchase_order_id, room_id));
    }
}

export const getCartAPI = async (room_id: string):Promise<MaybeUndefined<CartAPIResponse>> => {
    try {
        return (await cartAPI.getCart(room_id)).data;
    } catch (error) {
        return await alertError(error, () => getCartAPI(room_id));
    }
}

export const addToCartAPI = async (product: CartAPI):Promise<MaybeUndefined<CartAPIResponse>> => {
    try {
        return (await cartAPI.addToCart(product)).data;
    } catch (error) {
        return await alertError(error, () => addToCartAPI(product));
    }
}

export const removeFromCartInRoomAPI = async (room: string, _id: string):Promise<MaybeUndefined<CartAPIResponse>> => {
    try {
        return (await cartAPI.remove(room, _id)).data
    } catch (error) {
        return await alertError(error, () => removeFromCartInRoomAPI(room, _id));
    }
}


export const updateProductAmountAPI = async (room: string, _id: string, amount: number):Promise<MaybeUndefined<CartAPIResponse>> => {
    try {
        return (await cartAPI.updateAmount(room, _id, amount)).data
    } catch (error) {
        return await alertError(error, () => updateProductAmountAPI(room, _id, amount));
    }
}

export const getAdminUsers = async (sort: SortAdminUsers, page: number): Promise<MaybeUndefined<AdminUsersRes>> => {
    try {
        return (await AdminAPI.getUsers(sort, page)).data
    } catch (error) {
        return await alertError(error, () => getAdminUsers(sort, page));
    }
}

export const adminUserToggleEnabled = async (_id: string, data: UserAccessData):Promise<MaybeUndefined<AdminUsersType>> => {
    try {
        return (await AdminAPI.toggleUserEnabled(_id, data)).data
    } catch (error) {
        return await alertError(error, () => adminUserToggleEnabled(_id, data));
    }
}

export const getConstructorCustomers = async () => {
    try {
        return (await ConstructorAPI.getCustomers()).data
    } catch (error) {
        return await alertError(error, getConstructorCustomers);
    }
}

export const constructorGetToken = async (): Promise<MaybeUndefined<string>> => {
    try {
        const token = localStorage.getItem('constructor_token');
        if (token && isTokenValid(token)) return token;
        const res = await ConstructorAPI.getToken();
        if (res.status === 200) {
            localStorage.setItem('constructor_token', res.data);
            return res.data;
        }
    } catch (error) {
        return await alertError(error, constructorGetToken);
    }
}

export const constructorSetCustomer = async (user: UserType):Promise<any> => {
    try {
        const {name, email, phone} = user;
        return (await ConstructorAPI.setCustomer({
            name: name,
            email: email,
            phone: phone,
            margins: [],
            identity: email,
            identityProvider: 'own'
        })).data
    } catch (error) {
        return await alertError(error, () => constructorSetCustomer(user));
    }
}

export const constructorRegisteredCustomer = async (user: UserType): Promise<MaybeUndefined<Customer>> => {
    try {
        return (await ConstructorAPI.getCustomer(user.email)).data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response?.data?.code === 'entity-not-found') {
                return await constructorSetCustomer(user);
            }
        }
        return await alertError(error, () => constructorRegisteredCustomer(user));
    }
}

export const constructorGetCustomerToken = async (user: UserType): Promise<MaybeUndefined<string>> => {
    try {
        const token = localStorage.getItem('customer_token');
        if (token && isTokenValid(token)) return token;
        const res = await ConstructorAPI.getCustomerToken(user.email)
        if (res.status === 200) {
            localStorage.setItem('customer_token', res.data);
            return res.data;
        }
    } catch (error) {
        return await alertError(error, () => constructorGetCustomerToken(user));
    }
}

export const constructorLogin = async (user: UserType): Promise<MaybeUndefined<string>> => {
    try {
        if (!user.is_active_in_constructor) return undefined;
        const constructor_token = await constructorGetToken();
        if (constructor_token) {
            const customer = await constructorRegisteredCustomer(user)
            if (customer && customer.identityProvider === 'own') {
                const customer_token = await constructorGetCustomerToken(user);
                if (customer_token) return customer_token;
            }
        }
        return undefined;
    } catch (error) {
        return await alertError(error, () => constructorLogin(user));
    }
}

// export const isTokenValid = (token: string): boolean => {
//     const decodedToken = jwtDecode(token);
//     const {exp} = decodedToken;
//     const currentDate = new Date().getUTCDate();
//     const expDate = exp ? exp : 0;
//     return expDate > currentDate / 1000;
// }

export const isTokenValid = (token: string): boolean => {
    try {
        const decodedToken = jwtDecode<{ exp: number }>(token);
        const { exp } = decodedToken;
        const now = Date.now() / 1000;
        return exp > now;
    } catch {
        return false; // Invalid token format
    }
};



export const getAllPOs = async (user_id: string):Promise<MaybeUndefined<PurchaseOrderType[]>> => {
    try {
        return (await PurchaseOrdersAPI.getAll(user_id)).data
    } catch (error) {
        return await alertError(error, () => getAllPOs(user_id));
    }
}

export const createPO = async (purchase_order: PONewType):Promise<MaybeUndefined<PurchaseOrderType>> => {
    try {
        return (await PurchaseOrdersAPI.createPO(purchase_order)).data;
    } catch (error) {
        return await alertError(error, () => createPO(purchase_order));
    }
}

export const deletePO = async (user_id:string,purchase_order_id: string):Promise<MaybeUndefined<PurchaseOrderType[]>> => {
    try {
        return (await PurchaseOrdersAPI.deletePO(user_id,purchase_order_id)).data
    } catch (error) {
        return await alertError(error, () => deletePO(user_id, purchase_order_id));
    }
}

export const editPOAPI = async (purchase_order: PurchaseOrderType):Promise<MaybeUndefined<PurchaseOrderType>> => {
    try {
        return (await PurchaseOrdersAPI.editPO(purchase_order)).data
    } catch (error) {
        return await alertError(error, () => editPOAPI(purchase_order));
    }
}

export const sendOrder = async (formData:FormData, company:string):Promise<AxiosResponse> => {
    try {
        return await checkoutAPI.postEmail(formData, company)
    } catch (error) {
        return await alertError(error, () => sendOrder(formData, company));
    }
}

export const getPurchaseRoomsOrderAmount = async (purchase_id:string):Promise<MaybeUndefined<number>> => {
    try {
        return (await checkoutAPI.getCheckoutRoomsAmount(purchase_id)).data
    } catch (error) {
        return await alertError(error, () => getPurchaseRoomsOrderAmount(purchase_id));
    }
}

export const getPurchaseRoomsOrder = async (purchase_id:string):Promise<MaybeUndefined<RoomOrderType[]>> => {
    try {
        return (await checkoutAPI.getCheckoutRooms(purchase_id)).data
    } catch (error) {
        return await alertError(error, () => getPurchaseRoomsOrder(purchase_id));
    }
}