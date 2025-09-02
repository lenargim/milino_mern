import {MaybeEmpty, productCategory} from "./productTypes";
import {CartAPI} from "./cartTypes";
import {BoxMaterialType} from "./materialsTypes";

export const roomCategories = ["Kitchen", "Vanity", "Build In Closet", "Leather Closet", "RTA Closet"] as const;
export const golaTypeNames = ['Regular Kitchen', 'Gola Kitchen', 'Regular Vanity', 'Gola Vanity'] as const;
export const golaNames = ['Aluminum Gola', 'Black Matte Gola', 'White Gloss Gola', 'Champagne Gola', 'Wood Gola'] as const;

export type RoomCategoriesType = typeof roomCategories[number];
export type GolaTypesType = typeof golaTypeNames[number];
export type GolaType = typeof golaNames[number];

export type RoomMaterialsFormType = {
    name: string,
    category: MaybeEmpty<RoomCategoriesType>,
    category_gola_type: MaybeEmpty<GolaTypesType>
    gola: MaybeEmpty<GolaType>,
    door_type: string,
    door_finish_material: string,
    door_frame_width: string,
    door_color: string,
    door_grain: string,
    box_material: MaybeEmpty<BoxMaterialType>,
    box_color: string,
    drawer_brand: string,
    drawer_type: string,
    drawer_color: string,
    leather: string,
    leather_note: string
}

export interface RoomNewType extends RoomMaterialsFormType {
    purchase_order_id: string,
    category: RoomCategoriesType,
}

export interface RoomType extends RoomNewType {
    _id: string,
}

export interface RoomFront extends RoomType {
    activeProductCategory: MaybeEmpty<productCategory>,
}

export interface RoomOrderType extends RoomType {
    carts: CartAPI[]
}