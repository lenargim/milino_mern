import {EditProfileType, LogInType, SignUpType, UserType} from "./apiTypes";
import {AuthAPI, cartAPI, roomsAPI, usersAPI} from "./api";
import axios from "axios";
import {RoomInitialType} from "../Components/Profile/RoomForm";
import {CartItemType} from "../store/reducers/generalSlice";
import {cornerTypes, hingeTypes} from "../helpers/productTypes";
import {calculateCart} from "../helpers/calculatePrice";

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
        const res = await roomsAPI.getAll();
        return res.data;
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
    createdAt: Date,
    updatedAt: Date
}

export const addToCartInRoomAPI = async (product: CartAPI, _id: string) => {
    try {
        // const cart: CartAPI = {
        //     product_id: product.id,
        //     product_type: 'cabinet',
        //     amount: product.amount,
        //     width: width || 0,
        //     height: height || 0,
        //     depth: depth || 0,
        //     blind_width: blindWidth || 0,
        //     corner: corner || '',
        //     middle_section: middleSection || 0,
        //     hinge: hinge || '',
        //     options: options || [],
        //     door_option: [doorProfile||'', doorGlassType||'', doorGlassColor||''],
        //     shelf_option: [shelfProfile||'', shelfGlassType||'', shelfGlassColor||''],
        //     led_border: led?.border || [],
        //     led_alignment: led?.alignment || '',
        //     led_indent: led?.indent || '',
        //     leather: leather || '',
        //     note: product.note
        // }

        const cartResponse = await cartAPI.addToCart(product, _id);

        // return calculateCart(cartResponse.data);
        return cartResponse.data
    } catch (error) {
        alertError(error);
    }
}