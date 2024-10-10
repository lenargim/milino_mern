import {EditProfileType, LogInType, SignUpType, UserType} from "./apiTypes";
import {AuthAPI, cartAPI, roomsAPI, usersAPI} from "./api";
import axios from "axios";
import {RoomInitialType} from "../Components/Profile/RoomForm";
import {cornerTypes, hingeTypes, productTypings} from "../helpers/productTypes";

export const alertError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response) {
        console.log(error)
        alert(error.response.data.message)
    }
}

export const signUp = async (values: SignUpType) => {
    try {
        const res = await AuthAPI.signUp(values);
        localStorage.setItem('token', res.data.token);
        return {
            _id: res.data._id,
            name: res.data.name,
            email: res.data.email
        };

    } catch (error) {
        alertError(error)
    }
}

export const updateProfile = async (values: EditProfileType) => {
    try {
        const res = await usersAPI.patchMe(values);
        localStorage.setItem('token', res.data.token);
        return {
            _id: res.data._id,
            name: res.data.name,
            email: res.data.email
        };

    } catch (error) {
        alertError(error)
    }
}

export const logIn = async (values: LogInType): Promise<UserType | undefined> => {
    try {
        const res = await AuthAPI.logIn(values);
        localStorage.setItem('token', res.data.token);
        return {
            _id: res.data._id,
            name: res.data.name,
            email: res.data.email
        };
    } catch (error) {
        alertError(error)
    }
}

export const me = async (): Promise<UserType | undefined> => {
    try {
        const res = await usersAPI.me();
        return {
            _id: res.data._id,
            name: res.data.name,
            email: res.data.email
        };
    } catch (error) {
        alertError(error);
        localStorage.removeItem('token');
    }
}


export const getAllRooms = async () => {
    try {
        const response = (await roomsAPI.getAll()).data;
        return response;
    } catch (error) {
        alertError(error);
    }
}

export const createRoom = async (room: RoomInitialType) => {
    try {
        const res = await roomsAPI.createRoom(room);
        return res.data;
    } catch (error) {
        alertError(error);
    }
}

export const editRoomAPI = async (room: RoomInitialType, id: string) => {
    try {
        const res = await roomsAPI.editRoom(room, id);
        return res.data;
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


export type CartAPI = {
    product_id: number,
    product_type: 'cabinet',
    amount: number,
    width: number,
    height: number,
    depth: number,
    blind_width: number,
    corner: cornerTypes,
    middle_section: number,
    hinge: hingeTypes,
    options: string[],
    door_option: string[],
    shelf_option: string[]
    led_border: string[],
    led_alignment: string,
    led_indent: string,
    leather: string,
    note: string
}

export interface CartAPIResponse extends CartAPI {
    _id: string,
    room: string,
    createdAt: Date,
    updatedAt: Date
}

export interface CartFront extends CartAPIResponse {
    price: number,
    image_active_number: productTypings,
    isStandardSize: boolean
}

export const addToCartInRoomAPI = async (product: CartAPI, _id: string) => {
    try {
        const cartResponse = await cartAPI.addToCart(product, _id);
        return cartResponse.data
    } catch (error) {
        alertError(error);
    }
}

export const removeFromCartInRoomAPI = async (_id: string) => {
    try {
        const cartResponse = await cartAPI.remove( _id);
        return cartResponse.status
    } catch (error) {
        alertError(error);
    }
}


export const updateProductAmountAPI = async (_id:string, amount:number) => {
    try {
        return (await cartAPI.updateAmount(_id, amount)).data
    } catch (error) {
        alertError(error);
    }
}