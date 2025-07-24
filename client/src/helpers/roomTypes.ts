import {MaybeEmpty, MaybeNull, productCategory} from "./productTypes";
import {CartAPI} from "./cartTypes";

export type RoomCategoriesType = 'Kitchen' | 'Vanity' | 'Build In Closet' | 'Leather Closet' | 'RTA Closet';

export type RoomMaterialsFormType = {
    name: string,
    category: MaybeEmpty<RoomCategoriesType>,
    gola: string,
    door_type: string,
    door_finish_material: string,
    door_frame_width: string,
    door_color: string,
    door_grain: string,
    box_material: string,
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