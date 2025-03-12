import {EditProfileType, LogInType, SignUpType, UserType, UserTypeResponse} from "./apiTypes";
import {AdminAPI, AuthAPI, cartAPI, ConstructorAPI, roomsAPI, usersAPI} from "./api";
import axios, {AxiosError, AxiosResponse} from "axios";
import {
    cornerTypes,
    hingeTypes, MaybeEmpty,
    MaybeNull,
    MaybeUndefined,
    ProductApiType,
    productTypings
} from "../helpers/productTypes";
import {MaterialsFormType} from "../common/MaterialsForm";
import {LEDAccessoriesType} from "../Components/CustomPart/LEDForm";
import {DoorType} from "../Components/CustomPart/StandardDoorForm";
import {DoorAccessoireAPIType} from "../Components/CustomPart/CustomPart";
import {logout} from "../helpers/helpers";
import {emptyUser} from "../store/reducers/userSlice";
import {PanelsFormType} from "../Components/CustomPart/StandardPanel";
import {Customer} from "../helpers/constructorTypes";
import {UserAccessData} from "../Components/Profile/ProfileAdmin";


export const alertError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message)
        if (error.status === 403 && error.response.data.action === 'logout') {
            logout()
        }
    }
}

export const signUp = async (values: SignUpType): Promise<MaybeUndefined<true>> => {
    try {
        const res = await AuthAPI.signUp(values);
        if (res.status === 200) {
            return true
        }
    } catch (error) {
        alertError(error)
    }
}

export const updateProfile = async (values: EditProfileType):Promise<MaybeUndefined<UserType>> => {
    try {
        const res:AxiosResponse<UserTypeResponse> = await usersAPI.patchMe(values);
        const {token, ...user} = res.data;
        localStorage.setItem('token', token);
        return user;
    } catch (error) {
        alertError(error)
    }
}


export const logIn = async (values: LogInType): Promise<MaybeUndefined<UserType>> => {
    try {
        const res:AxiosResponse<UserTypeResponse> = await AuthAPI.logIn(values);
        localStorage.setItem('token', res.data.token);
        return {
            _id: res.data._id,
            name: res.data.name,
            company: res.data.company,
            email: res.data.email,
            phone: res.data.phone,
            is_active: res.data.is_active,
            is_super_user: res.data.is_super_user,
            is_signed_in_constructor: res.data.is_signed_in_constructor,
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
        if (res.status === 403) {
            alert(res.data.message)
            logout()
        }
        return {
            _id: res.data._id,
            name: res.data.name,
            company: res.data.company,
            email: res.data.email,
            phone: res.data.phone,
            is_active: res.data.is_active,
            is_super_user: res.data.is_super_user,
            is_signed_in_constructor: res.data.is_signed_in_constructor || false,
            is_active_in_constructor: res.data.is_active_in_constructor || false
        };
    } catch (error) {
        alertError(error);
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

export const getOneRoom = async (id: string) => {
    try {
        const response = (await roomsAPI.getOne(id)).data;
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

export type PanelsFormAPIType = {
    standard_panel: PanelsFormPartAPIType[],
    shape_panel: PanelsFormPartAPIType[],
    wtk: PanelsFormPartAPIType[],
}

export type PanelsFormPartAPIType = { qty: number, name: string }


export type CartAPI = {
    product_id: number,
    product_type: ProductApiType,
    amount: number,
    width: number,
    height: number,
    depth: number,
    blind_width: number,
    middle_section: number,
    corner: MaybeEmpty<cornerTypes>,
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
    door_accessories?: DoorAccessoireAPIType[],
    standard_door?: DoorType
    standard_panels?: PanelsFormAPIType,
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
    isStandard: IsStandardOptionsType
}

export type IsStandardOptionsType = {
    dimensions: boolean,
    blind: boolean,
    middle: boolean,
    led: boolean,
    options: boolean
}

export const addToCartInRoomAPI = async (product: CartItemType, roomId: string) => {
    try {
        const {
            _id,
            room,
            subcategory,
            price,
            image_active_number,
            led_accessories,
            ...data
        } = product
        let cartAPIData: any = {...data};
        if (subcategory === 'led-accessories' && led_accessories) {
            const {led_gola_profiles, led_alum_profiles, door_sensor, dimmable_remote, transformer} = led_accessories
            cartAPIData = {
                ...cartAPIData,
                led_accessories: {
                    ...cartAPIData.led_accessories,
                    led_alum_profiles: led_alum_profiles.map(el => ({
                        length: el.length,
                        qty: el.qty
                    })),
                    led_gola_profiles: led_gola_profiles.map(el => ({
                        length: el.length,
                        qty: el.qty,
                        color: el.color
                    })),
                    door_sensor: door_sensor,
                    dimmable_remote: dimmable_remote,
                    transformer: transformer
                },
            }
        }

        let cartResponse: MaybeUndefined<CartAPIResponse[]> = (await cartAPI.addToCart(cartAPIData, roomId))?.data;
        console.log(cartAPIData)
        if (!cartResponse) return undefined;
        return cartResponse
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

export const getAdminUsers = async () => {
    try {
        const res = AdminAPI.getUsers()
        return (await res).data
    } catch (error) {
        alertError(error);
    }
}

export const adminUserToggleEnabled = async (_id: string, data:UserAccessData) => {
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

export const constructorGetToken = async () => {
    try {
        const constructorRes = await ConstructorAPI.getToken();
        if (constructorRes.status === 200) {
            localStorage.setItem('constructor_token', constructorRes.data);
            return true
        }
        return false
    } catch (error) {
        alertError(error);
    }
}

export const constructorSetCustomer = async (user:UserType) => {
    try {
        const {name, email, phone, _id} = user;
        const customer: Customer = {
            name: name,
            email: email,
            phone: phone,
            margins: [],
            identity: email,
            identityProvider: 'own'
        }
        await ConstructorAPI.setCustomer(customer).then(() => {
            patchUserSignedInConstructor(_id);
        })
    } catch (error) {
        alertError(error);
    }
}

export const getConstructorCustomer = async (id:string) => {
    try {
        const res = ConstructorAPI.getCustomer(id);
        return (await res).data
    } catch (error) {
        alertError(error);
    }
}

export const patchUserSignedInConstructor = async (id:string) => {
    try {
        return (await usersAPI.constructorSave(id)).data
    } catch (error) {
        alertError(error);
    }
}

export const getCustomerToken = async (email:string) => {
    try {
        return (await ConstructorAPI.getCustomerToken(email)).data
    } catch (error) {
        alertError(error);
    }
}