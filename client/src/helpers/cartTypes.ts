import {AlProfileType} from "../Components/CustomPart/CustomPartAlumProfile";
import {golaProfileType} from "../Components/CustomPart/CustomPartGolaProfile";
import {
    DoorAccessoryAPIType,
    DrawerAccessoriesType,
    GrooveAPIType,
    RTAClosetAPIType
} from "../Components/CustomPart/CustomPart";
import {
    ClosetAccessoriesTypes,
    cornerTypes, GlassAndMirrorTypes,
    hingeTypes, JeweleryInsertsType,
    MaybeEmpty,
    MaybeUndefined,
    ProductApiType,
    productTypings
} from "./productTypes";
import {ledAlignmentType} from "../Components/Product/ProductLED";

export type CartAPI = {
    _id: string,
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
    shelf: MaybeEmpty<GlassAndMirrorTypes>,
}

export type CartLEDAPI = {
    border: string[],
    alignment: MaybeEmpty<ledAlignmentType>,
    indent: string
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
    note: string,
}

// is standard or customized product (size led, options)
export interface CartItemFrontType extends CartAPIImagedType {
    subcategory: string,
    isStandard: IsStandardOptionsType
    price: number,
}

export type CartCustomType = {
    material?: string,
    groove?: GrooveAPIType,
    drawer_accessories?: DrawerAccessoriesType,
    jewelery_inserts?: JeweleryInsertsType[],
    accessories?: CustomAccessoriesType,
    standard_doors?: StandardDoorAPIType[],
    standard_panels?: PanelsFormAPIType,
    rta_closet?: RTAClosetAPIType[],
    mechanism?: string
}

export type PanelsFormAPIType = {
    standard_panel: PanelsFormPartAPIType[],
    shape_panel: PanelsFormPartAPIType[],
    wtk: PanelsFormPartAPIType[],
    crown_molding: number
}

export type PanelsFormPartAPIType = { qty: number, name: string }

export type CustomAccessoriesType = {
    led?: LEDAccessoriesType,
    door?: DoorAccessoryAPIType[],
    closet?: ClosetAccessoriesTypes
}

export type LEDAccessoriesType = {
    alum_profiles: AlProfileType[],
    gola_profiles: golaProfileType[],
    transformer_60_W: number,
    transformer_100_W: number,
    remote_control: number,
    door_sensor_single: number,
    door_sensor_double: number,
}

export type StandardDoorAPIType = {
    width: number,
    height: number,
    qty: number
}

export type IsStandardOptionsType = {
    dimensions: IsStandardDimentionsType,
    blind: boolean,
    middle: boolean,
    led: boolean,
    options: boolean
}

export type IsStandardDimentionsType = {
    width: boolean,
    height: boolean,
    depth: boolean
}
export type changeAmountType = 'plus' | 'minus';