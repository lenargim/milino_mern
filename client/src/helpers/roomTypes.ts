import {MaybeEmpty, productCategory} from "./productTypes";
import {CartAPI} from "./cartTypes";

export const roomCategories = ["Kitchen", "Vanity", "Build In Closet", "Leather Closet", "RTA Closet"] as const;
export const golaTypeNames = ['Regular Kitchen', 'Gola Kitchen', 'Regular Vanity', 'Gola Vanity'] as const;
export const golaNames = ['Aluminum Gola', 'Black Matte Gola', 'White Gloss Gola', 'Champagne Gola', 'Wood Gola'] as const;
export const doorTypesNames = ['No Doors','Standard Size White Shaker','Slab', 'Three Piece Door', 'Five piece shaker', 'Finger Pull', 'Micro Shaker', 'Slatted', 'Custom Painted Shaker'] as const;
export const boxMaterialNames = ['White Melamine', 'Gray Melamine', 'Gray Linen Melamine', 'Beige Linen Melamine', 'Ash Melamine', 'Walnut Melamine', 'Brown Oak', 'Ivory Woodline', 'Grey Woodline', 'Natural Plywood', 'White Plywood', 'Gray Plywood', 'Ultra Matte White', 'Ultra Matte Grey', 'Ultra Matte Cashmere', 'White Gloss'] as const;
export const leatherBoxMaterialNames = ['Milino', 'Syncron', 'Luxe', 'Ultrapan PET', 'Zenit', 'Ultrapan Acrylic'] as const;
export const totalBoxMaterialNames = [...boxMaterialNames, ...leatherBoxMaterialNames] as const;

export type RoomCategoriesType = typeof roomCategories[number];
export type GolaTypesType = typeof golaTypeNames[number];
export type GolaType = typeof golaNames[number];
export type DoorTypesType = typeof doorTypesNames[number];
export type BoxMaterialType = typeof totalBoxMaterialNames[number];

export type RoomMaterialsFormType = {
    name: string,
    category: MaybeEmpty<RoomCategoriesType>,
    category_gola_type: MaybeEmpty<GolaTypesType>
    gola: MaybeEmpty<GolaType>,
    door_type: MaybeEmpty<DoorTypesType>,
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

export type OrderFormSelectType = {
    data: materialsData[],
    value: string | number,
    name: string,
    label?: string
    small?: boolean
}

export type materialsData = {
    value: string,
    img?: string
}

export interface drawer extends materialsData {
    types: drawerType[]
}

export interface drawerType extends materialsData {
    colors: materialsData[]
}

export interface doorType extends materialsData {
    finish: finishType[]
    frame?: materialsData[],
}

export interface finishType extends materialsData {
    colors?: colorType[],
}

export interface colorType extends materialsData {
    isGrain?: boolean | number,
}

export type MaterialsType = {
    categories: materialsData[],
    golaType: materialsData[],
    gola: materialsData[],
    doors: doorType[],
    boxMaterial: materialsData[],
    drawers: drawer[],
    leatherBoxMaterial: materialsData[]
    leatherType: materialsData[],
    grain: materialsData[]
}