import {optionType} from "../common/SelectField";
import {ledAlignmentType} from "../Components/Product/ProductLED";
import exp from "constants";
import {RoomCategoriesType} from "./roomTypes";

export type productTypings = 1 | 2 | 3 | 4
export type pricesTypings = 1 | 2 | 3
export type DoorColorType = 1 | 2 | 3;
export type BoxMaterialColorType = 1 | 2 | 3 | 4;

export type MaybeEmpty<T> = T | '';
export type MaybeUndefined<T> = T | undefined;
export type MaybeNull<T> = T | null;

export const cornerArr = ["Left", "Right"] as const;
export const hingeArr = ['Left', 'Right', 'Double Doors', 'Two left doors', 'Two right doors', 'Single left door', 'Single right door', 'Four doors', ''] as const;

export type cornerTypes = typeof cornerArr[number];
export type hingeTypes = typeof hingeArr[number];

export type ProductApiType = 'cabinet' | 'standard' | 'custom';
export type CustomTypes =
    'custom'
    | 'pvc'
    | 'glass-door'
    | 'glass-shelf'
    | 'led-accessories'
    | 'door-accessories'
    | 'standard-door'
    | 'standard-glass-door'
    | 'backing'
    | 'standard-panel'
    | 'plastic_toe'
    | 'simple-closets';

export type kitchenCategories =
    'Base Cabinets'
    | 'Wall Cabinets'
    | 'Tall Cabinets'
    | 'Gola Base Cabinets'
    | 'Gola Wall Cabinets'
    | 'Gola Tall Cabinets'
export type StandardCategory =
    'Standard Base Cabinets'
    | 'Standard Wall Cabinets'
    | 'Standard Tall Cabinets';

export type VanitiesCategory = 'Vanities' | 'Floating Vanities' | 'Gola Floating Vanities';

export type ClosetsCategory = 'Build In' | 'Leather' | 'Simple Closets'

export type productCategory =
    kitchenCategories
    | StandardCategory
    | VanitiesCategory
    | ClosetsCategory
    | 'Custom Parts'

export type AngleType = 'flat' | 'corner';

export type ProductOrCustomType = {
    id: number,
    name: string,
    product_type: ProductApiType,
    images: string[],
}

export interface ProductType extends ProductOrCustomType{
    // room: string,
    category: productCategory,
    attributes: attrItem[],
    options: string[],
    legsHeight?: number,
    isBlind?: boolean,
    isAngle?: AngleType,
    customHeight: MaybeUndefined<number>,
    customDepth: MaybeUndefined<number>,
    hasSolidWidth?: true,
    hasMiddleSection?: true,
    middleSectionDefault?: number,
    isCornerChoose: MaybeUndefined<true>,
    widthDivider?: number,
    heightRange?: number,
    cartExtras: CartExtrasType,
    hasLedBlock: boolean,
    blindArr?: number[],
    horizontal_line?: number
}

export interface CustomPartType extends ProductOrCustomType{
    type: CustomTypes,
    width?: number,
    depth?: number,
    height_range?: number[],
    materials_array?: materialsCustomPart[],
    limits?: materialsLimitsType,
    glass_shelf?: string[],
    standard_price?: number

}

export interface CustomPartDataType extends ProductOrCustomType{
    // room: string,
    type: CustomTypes,
    category: productCategory,
    width?: number,
    depth?: number,
    price?: number,
    materials_array?: materialsCustomPart[],
    limits?: materialsLimitsType,
    glassDoor?: glassDoorType,
    glassShelf?: optionType[]
}

export type glassDoorType = {
    ['Profile']?: optionType[],
    ['Glass Type']: optionType[],
    ['Glass Color']: optionType[]
}

export type materialsCustomPart = {
    name: string,
    limits?: materialsLimitsType,
    depth?: number
}

export type materialsLimitsType = {
    width?: number[],
    height?: number[],
    depth?: number[]
}

export type materialDataType = {
    is_standard_cabinet: boolean,
    category: MaybeEmpty<RoomCategoriesType>,
    base_price_type: pricesTypings,
    grain_coef: number,
    box_material_coef: number,
    box_material_finish_coef: number,
    door_price_multiplier: number,
    is_acrylic: boolean,
    door_type: string,
    door_finish_material: string,
    drawer_brand: string,
    drawer_type: string,
    drawer_color: string,
    leather: string,
    is_leather_or_simple_closet: boolean,
    box_material: string,
    box_color: string,
    materials_coef: number
}


export interface attrItem {
    name: string,
    values: valueItemType[],
}

export interface customAttrItem {
    name: string,
    values: customItemType[],
}

export type pricePart = {
    width: number,
    height?: number,
    depth?: number,
    price: number
}

export type priceStandardPanel = {
    id: number,
    standard_panel: pricePartStandardPanel[],
    shape_panel: pricePartStandardPanel[],
    wtk: pricePartStandardPanel[]
}

export type pricePartStandardPanel = {
    name: string,
    width: number,
    height: number,
    depth: number,
    price: number,
    painted_price: number
}

export type priceItem = {
    type: pricesTypings,
    data: pricePart[]
}

export type prices = priceItem[]

export type customItemType = {
    type: productTypings,
    value: number | string,
    minWidth?: number,
    maxWidth?: number
}

export type valueItemType = {
    type: productTypings,
    value: number,
    minHeight?: number,
    maxHeight?: number,
    minWidth?: number,
    maxWidth?: number
}

export type itemImg = {
    type: productTypings,
    value: string
}


export type settingItemType = {
    id: number,
    minPrice: number,
    multiplier: number
}


export type profileItem = { value: string, label: string, glassDoorType: number }


export type settingSizesType = {
    [key: string]: {
        width: number[],
        height: number[],
        depth: number[]
    }
}

export type sizeLimitsType = {
    width: number[],
    height: number[],
    depth: number[]
}

export type getBoxMaterialCoefsType = {
    boxMaterialCoef: number,
    boxMaterialFinishCoef: number
}

export interface drawerInterface {
    drawerBrand: MaybeUndefined<string>,
    drawerType: MaybeUndefined<string>,
    drawerColor: MaybeUndefined<string>
}


export type CabinetType = {
    product: ProductType,
    materialData: materialDataType,
    productRange: productRangeType,
    tablePriceData: pricePart[],
    sizeLimit: sizeLimitsType,
}

export type DepthRangeType = {
    [key: string]: number,
}

export type productRangeType = {
    widthRange: number[],
    heightRange: number[],
    depthRange: number[]
}

export type productDataToCalculatePriceType = {
    doorValues?: valueItemType[],
    drawersQty: number,
    shelfsQty: number
    rolloutsQty: number,
    blindArr?: number[],
    filteredOptions: string[]
}

export type StandardProductDataToCalculatePriceType = {
    doorValues?: valueItemType[],
    blindArr?: number[],
    filteredOptions: string[],
    drawersQty: number,
    shelfsQty: number,
    rolloutsQty: number
}

export type customPartDataToCalculatePriceType = {
    priceData?: pricePart[],
    productRange: productRangeType,
    sizeLimit?: sizeLimitsType,
}

export type productSizesType = {
    width: number,
    height: number,
    depth: number,
    maxWidth: number,
    maxHeight: number
}

export type CartExtrasType = {
    ptoDoors: number,
    ptoDrawers: number,
    glassShelf: number,
    glassDoor: number,
    ptoTrashBins: number,
    ledPrice: number,
    coefExtra: number,
    attributes: attrItem[],
    boxFromFinishMaterial: boolean
}

export type AttributesPrices = {
    ptoDoors: number,
    ptoDrawers: number,
    glassShelf: number,
    glassDoor: number,
    ptoTrashBins: number,
    ledPrice: number,
    pvcPrice: number,
    doorPrice: number,
    drawerPrice: number,
}

type initialStandardValues = {
    Width: number,
    isBlind: boolean,
    "Blind Width": MaybeEmpty<number>,
    Height: number,
    Depth: number,
    'Custom Depth': string,
    'Doors': number,
    'Hinge opening': hingeTypes,
    Corner: MaybeEmpty<cornerTypes>,
    Options: string[],
    'Profile': string,
    'Glass Type': string,
    'Glass Color': string,
    'Glass Shelf': string,
    'Middle Section': string,
    'LED borders': string[],
    'LED alignment': MaybeEmpty<ledAlignmentType>,
    'LED indent': string,
    'Note': string,
    price: number,
    image_active_number: productTypings
}

export interface ProductFormType extends initialStandardValues {
    "Custom Width": MaybeEmpty<number>,
    'Custom Blind Width': MaybeEmpty<number>,
    'Custom Height': MaybeEmpty<number>,
    "Custom Width Number": MaybeEmpty<number>,
    'Custom Blind Width Number': MaybeEmpty<number>,
    'Custom Height Number': MaybeEmpty<number>,
    'Custom Depth Number': MaybeEmpty<number>,
    'Middle Section Number': MaybeEmpty<number>,
    glass_door: string[],
    glass_shelf: string

}