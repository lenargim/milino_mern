import {AdminUsersRes, EditProfileType, LogInType, SignUpType, UserType, UserTypeResponse} from "./apiTypes";
import {AdminAPI, AuthAPI, cartAPI, ConstructorAPI, PurchaseOrdersAPI, roomsAPI, usersAPI} from "./api";
import axios, {AxiosError, AxiosResponse} from "axios";
import {
    MaybeNull,
    MaybeUndefined,
} from "../helpers/productTypes";
import {logout} from "../helpers/helpers";
import {emptyUser} from "../store/reducers/userSlice";
import {Customer} from "../helpers/constructorTypes";
import {SortAdminUsers, UserAccessData} from "../Components/Profile/ProfileAdmin";
import {jwtDecode} from "jwt-decode"
import {PONewType} from "../Components/PurchaseOrder/PurchaseOrderNew";
import {RoomType} from "../helpers/roomTypes";
import {CartAPI} from "../helpers/cartTypes";


export const alertError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            alert(error.response.data.message)
            if (error.response.data.action === 'logout') {
                logout()
            }
        }
    }
}

export const signUp = async (values: SignUpType): Promise<MaybeUndefined<true>> => {
    try {
        const res = await AuthAPI.signUp(values);
        if (res.status === 201) {
            return true
        }
    } catch (error) {
        alertError(error)
    }
}

export const updateProfile = async (values: EditProfileType): Promise<MaybeUndefined<UserType>> => {
    try {
        const res: AxiosResponse<UserTypeResponse> = await usersAPI.patchMe(values);
        const {token, ...user} = res.data;
        localStorage.setItem('token', token);
        return user;
    } catch (error) {
        alertError(error)
    }
}


export const logIn = async (values: LogInType): Promise<MaybeUndefined<UserType>> => {
    try {
        const res: AxiosResponse<UserTypeResponse> = await AuthAPI.logIn(values);
        localStorage.setItem('token', res.data.token);
        return {
            _id: res.data._id,
            name: res.data.name,
            company: res.data.company,
            email: res.data.email,
            phone: res.data.phone,
            is_active: res.data.is_active,
            is_super_user: res.data.is_super_user,
            is_active_in_constructor: res.data.is_active_in_constructor
        };
    } catch (error: any) {
        const status = (error as AxiosError).status
        if (status === 403) {
            return emptyUser
        }
        alertError(error)
    }
}

export const me = async (): Promise<MaybeUndefined<UserType>> => {
    try {
        const res = await usersAPI.me();
        localStorage.setItem('token', res.data.token);
        return {
            _id: res.data._id,
            name: res.data.name,
            company: res.data.company,
            email: res.data.email,
            phone: res.data.phone,
            is_active: res.data.is_active,
            is_super_user: res.data.is_super_user,
            is_active_in_constructor: res.data.is_active_in_constructor || false
        };
    } catch (error) {
        console.log(error)
        alertError(error);
    }
}


export const getRooms = async (purchase_order_id: string) => {
    try {
        return (await roomsAPI.getRooms(purchase_order_id)).data;
    } catch (error) {
        alertError(error);
    }
}

export const createRoomAPI = async (room: RoomType) => {
    try {
        const res = await roomsAPI.createRoom(room);
        return res.data;
    } catch (error) {
        alertError(error);
    }
}

export const editRoomAPI = async (room: RoomType) => {
    try {
        return (await roomsAPI.editRoom(room)).data;
    } catch (error) {
        alertError(error);
    }
}

export const deleteRoomAPI = async (id: string) => {
    try {
        const res = await roomsAPI.deleteRoom(id);
        return res.data;
    } catch (error) {
        alertError(error);
    }
}

export const getCartAPI = async (room_id: string) => {
    try {
        return (await cartAPI.getCart(room_id)).data;
    } catch (error) {
        alertError(error);
    }
}

export const addToCartAPI = async (product: CartAPI) => {
    try {
        return (await cartAPI.addToCart(product)).data;
    } catch (error) {
        alertError(error);
    }
}

export const removeFromCartInRoomAPI = async (room: string, _id: string) => {
    try {
        const cartResponse = await cartAPI.remove(room, _id);
        return cartResponse.data
    } catch (error) {
        alertError(error);
    }
}


export const updateProductAmountAPI = async (room: string, _id: string, amount: number) => {
    try {
        return (await cartAPI.updateAmount(room, _id, amount)).data
    } catch (error) {
        alertError(error);
    }
}

export const getAdminUsers = async (sort: SortAdminUsers, page: number): Promise<MaybeUndefined<AdminUsersRes>> => {
    try {
        return (await AdminAPI.getUsers(sort, page)).data
    } catch (error) {
        alertError(error);
    }
}

export const adminUserToggleEnabled = async (_id: string, data: UserAccessData) => {
    try {
        const res = AdminAPI.toggleUserEnabled(_id, data)
        return (await res).data
    } catch (error) {
        alertError(error);
    }
}

export const getConstructorCustomers = async () => {
    try {
        const res = ConstructorAPI.getCustomers();
        return (await res).data
    } catch (error) {
        alertError(error);
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
        alertError(error);
    }
}

export const constructorSetCustomer = async (user: UserType) => {
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
        alertError(error);
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
        alertError(error);
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
        alertError(error);
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
        alertError(error);
    }
}

export const isTokenValid = (token: MaybeNull<string> = ''): boolean => {
    if (!token) return false;
    const decodedToken = jwtDecode(token);
    const {exp} = decodedToken;
    const currentDate = new Date().getUTCDate();
    const expDate = exp ? exp : 0;
    return expDate > currentDate / 1000;
}


export const getAllPOs = async (user_id: string) => {
    try {
        return (await PurchaseOrdersAPI.getAll(user_id)).data
    } catch (error) {
        alertError(error);
    }
}

export const createPO = async (purchase_order: PONewType) => {
    try {
        return (await PurchaseOrdersAPI.createPO(purchase_order)).data;
    } catch (error) {
        alertError(error);
    }
}