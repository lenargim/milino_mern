import {EditProfileType, LogInType, SignUpType, UserType} from "./apiTypes";
import {AuthAPI, cartAPI, roomsAPI, usersAPI} from "./api";
import axios from "axios";
import {cornerTypes, hingeTypes, MaybeNull, ProductApiType, productTypings} from "../helpers/productTypes";
import {MaterialsFormType} from "../common/MaterialsForm";
import alumProfile, {alProfileType} from "../Components/CustomPart/AlumProfile";
import golaProfile, {golaProfileType} from "../Components/CustomPart/GolaProfile";
import {DoorAccessoiresType} from "../Components/CustomPart/DoorAccessoiresForm";
import {LEDAccessoriesType} from "../Components/CustomPart/LEDForm";
import {DoorType} from "../Components/CustomPart/StandardDoorForm";

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

export const createRoom = async (room: MaterialsFormType) => {
    try {
        const res = await roomsAPI.createRoom(room);
        return res.data;
    } catch (error) {
        alertError(error);
    }
}

export const editRoomAPI = async (room: MaterialsFormType, id: string) => {
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
    product_type: ProductApiType,
    amount: number,
    width: number,
    height: number,
    depth: number,
    blind_width: number,
    middle_section: number,
    corner: cornerTypes,
    hinge: hingeTypes,
    options: string[],
    door_option: string[],
    shelf_option: string[]
    led_border: string[],
    led_alignment: string,
    led_indent: string,
    leather: string,
    material: string,
    note: string,
    glass_door?: string[],
    glass_shelf?: string,
    led_accessories?: LEDAccessoriesType,
    door_accessories?: DoorAccessoiresType,
    standard_door?: DoorType
}

export interface CartAPIResponse extends CartAPI {
    _id: string,
    room: string,
}

export interface CabinetItemType extends CartAPI {
    image_active_number: productTypings,
}

export interface CartItemType extends CabinetItemType {
    _id: string,
    room: MaybeNull<string>,
    subcategory:string,
    price: number,
    isStandardSize: boolean,
}

export const addToCartInRoomAPI = async (product: CartItemType, roomId: string) => {
    try {
        const {_id, room, price, image_active_number, isStandardSize, ...data} = product
        const cartAPIData:CartAPI = {...data};

        const cartResponse = await cartAPI.addToCart(cartAPIData, roomId);
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