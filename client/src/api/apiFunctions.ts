import {EditProfileType, LogInType, SignUpType, UserType} from "./apiTypes";
import {AuthAPI, cartAPI, roomsAPI, usersAPI} from "./api";
import axios from "axios";
import {
    cornerTypes,
    hingeTypes,
    MaybeNull,
    MaybeUndefined,
    ProductApiType,
    productTypings
} from "../helpers/productTypes";
import {MaterialsFormType} from "../common/MaterialsForm";
import {v4 as uuidv4} from "uuid";
import {DoorAccessoiresType} from "../Components/CustomPart/DoorAccessoiresForm";
import {LEDAccessoriesType} from "../Components/CustomPart/LEDForm";
import {DoorType} from "../Components/CustomPart/StandardDoorForm";
import {getFraction} from "../helpers/helpers";

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

    material?: string,
    glass_door?: string[],
    glass_shelf?: string,
    led_accessories?: LEDAccessoriesType,
    door_accessories?: DoorAccessoiresType,
    standard_door?: DoorType

    note: string,
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
    subcategory: string,
    price: number,
    isStandardSize: boolean,
}

export const addToCartInRoomAPI = async (product: CartItemType, roomId: string) => {
    try {
        const {
            _id,
            room,
            subcategory,
            price,
            isStandardSize,
            image_active_number,
            led_accessories,
            door_accessories,
            ...data
        } = product
        let cartAPIData: any = {...data};

        if (subcategory === 'led-accessories' && led_accessories) {
            let ledApi: {
                led_gola_profiles: { length: number, qty: number, color: string }[],
                led_alum_profiles: { length: number, qty: number }[],
                dimmable_remote: number,
                door_sensor: number,
                transformer: number
            } = {
                led_gola_profiles: [],
                led_alum_profiles: [],
                dimmable_remote: led_accessories.dimmable_remote,
                door_sensor: led_accessories.door_sensor,
                transformer: led_accessories.transformer
            };

            ledApi.led_gola_profiles = led_accessories.led_gola_profiles.map(el => {
                return {
                    length: el["length Number"],
                    qty: el.qty,
                    color: el.color
                }
            })
            ledApi.led_alum_profiles = led_accessories.led_alum_profiles.map(el => {
                return {
                    length: el["length Number"],

                    qty: el.qty
                }
            })
            cartAPIData = {
                ...cartAPIData,
                led_accessories: ledApi
            }

        }

        if (subcategory === 'door-accessories' && door_accessories) {
            let doorApi: {
                value: string,
                qty: number
            }[] = [];
            const {aventos, PTO, door_hinge, hinge_holes, servo} = door_accessories
            aventos.forEach(el => {
                if (el.qty) doorApi.push({value: el.title, qty: el.qty})
            })
            servo.forEach(el => {
                if (el.qty) doorApi.push({value: el.title, qty: el.qty})
            })
            PTO.forEach(el => {
                if (el.qty) doorApi.push({value: el.title, qty: el.qty})
            })
            if (door_hinge) doorApi.push({value: 'door_hinge', qty: door_hinge})
            if (hinge_holes) doorApi.push({value: 'hinge_holes', qty: hinge_holes})
            cartAPIData = {
                ...cartAPIData,
                door_accessories: doorApi
            }
        }

        let cartResponse: MaybeUndefined<CartAPIResponse[]> = (await cartAPI.addToCart(cartAPIData, roomId))?.data;
        if (!cartResponse) return undefined;

        cartResponse = cartResponse.map(cartItem => {
            const {led_accessories} = cartItem
            if (subcategory === 'led-accessories' && led_accessories) {
                const ledRes: LEDAccessoriesType = {
                    transformer: led_accessories.transformer || 0,
                    door_sensor: led_accessories.door_sensor || 0,
                    dimmable_remote: led_accessories.dimmable_remote || 0,
                    led_alum_profiles: [],
                    led_gola_profiles: []
                }
                ledRes.led_alum_profiles = led_accessories.led_alum_profiles.map(el => ({
                    _id: uuidv4(),
                    qty: el.qty,
                    "length Number": +el.length,
                    length: getFraction(+el.length),
                }));
                ledRes.led_gola_profiles = led_accessories.led_gola_profiles.map(el => ({
                    _id: uuidv4(),
                    qty: el.qty,
                    "length Number": +el.length,
                    length: getFraction(+el.length),
                    color: el.color
                }))
                return {...cartItem, led_accessories: ledRes}
            }
            return cartItem;
        })

        return cartResponse
    } catch (error) {
        alertError(error);
    }
}

export const removeFromCartInRoomAPI = async (_id: string) => {
    try {
        const cartResponse = await cartAPI.remove(_id);
        return cartResponse.status
    } catch (error) {
        alertError(error);
    }
}


export const updateProductAmountAPI = async (_id: string, amount: number) => {
    try {
        return (await cartAPI.updateAmount(_id, amount)).data
    } catch (error) {
        alertError(error);
    }
}