import {AlProfileType} from "../Components/CustomPart/CustomPartAlumProfile";
import {golaProfileType} from "../Components/CustomPart/CustomPartGolaProfile";
import {DoorAccessoryAPIType, RTAClosetAPIType} from "../Components/CustomPart/CustomPart";
import {cornerTypes, hingeTypes, MaybeEmpty, MaybeUndefined, ProductApiType, productTypings} from "./productTypes";

export type CartNewType = {
    room_id: string,
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
    glass: MaybeUndefined<GlassAPIType>,
    led?: CartLEDAPI,
    custom?: CartCustomType,
    note: string,
}

export type GlassAPIType = {
    door: MaybeUndefined<string[]>,
    shelf: MaybeUndefined<string>,
}

export type CartLEDAPI = {
    border: string[],
    alignment: string,
    indent: string
}

export interface CartAPI extends CartNewType {
    _id: string,
}

export interface CartAPIResponse extends CartAPI {
    cart: CartAPI[],
    room_id: string
}

export interface CartAPIImagedType extends CartAPI {
    image_active_number: productTypings,
}

export interface CartOrder {
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
    glass: MaybeUndefined<GlassAPIType>,
    led?: CartLEDAPI,
    custom?: MaybeUndefined<CartCustomType>,
    note: string,
    // price: number
}

// is standard or customized product (size led, options)
export interface CartItemFrontType extends CartAPIImagedType {
    subcategory: string,
    isStandard: IsStandardOptionsType
    price: number,
}

export type CartCustomType = {
    material?: string,
    accessories?: CustomAccessoriesType,
    standard_doors?: StandardDoorAPIType[],
    standard_panels?: PanelsFormAPIType,
    rta_closet?: RTAClosetAPIType[]
}

export type PanelsFormAPIType = {
    standard_panel: PanelsFormPartAPIType[],
    shape_panel: PanelsFormPartAPIType[],
    wtk: PanelsFormPartAPIType[],
    crown_molding: number
}

export type PanelsFormPartAPIType = { qty: number, name: string }

export type CustomAccessoriesType = {
    led_alum_profiles: AlProfileType[],
    led_gola_profiles: golaProfileType[],
    led_door_sensor: number,
    led_dimmable_remote: number,
    led_transformer: number,
    door?: DoorAccessoryAPIType[],
}

export type StandardDoorAPIType = {
    width: number,
    height: number,
    qty: number
}

export type IsStandardOptionsType = {
    dimensions: boolean,
    blind: boolean,
    middle: boolean,
    led: boolean,
    options: boolean
}
export type changeAmountType = 'plus' | 'minus';