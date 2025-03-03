import {optionType} from "../common/SelectField";
import {LEDAccessoriesType} from "../Components/CustomPart/LEDForm";
import {DoorAccessoireAPIType} from "../Components/CustomPart/CustomPart";
import {DoorType} from "../Components/CustomPart/StandardDoorForm";

export type productTypings = 1 | 2 | 3 | 4
export type pricesTypings = 1 | 2 | 3
export type BoxMaterialType = 0 | 1 | 2 | 3 | 4;

export type MaybeEmpty<T> = T | '';
export type MaybeUndefined<T> = T | undefined;
export type MaybeNull<T> = T | null;

function notEmpty<TValue>(value: MaybeUndefined<TValue>): value is TValue {
    return value !== null && value !== undefined;
}


export const cornerArr = ["Left", "Right"] as const;
export const hingeArr = ['Left', 'Right', 'Double Doors', 'Two left doors', 'Two right doors', 'Single left door', 'Single right door', 'Four doors', ''] as const;
export const roomCategories = ["Kitchen", "Vanity", "Build In Closet", "Leather Closet"] as const;

export type cornerTypes = typeof cornerArr[number];
export type hingeTypes = typeof hingeArr[number];
export type RoomCategories = typeof roomCategories[number];

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
    | 'standard-panel';

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

export type productCategory =
    kitchenCategories
    | StandardCategory
    | VanitiesCategory
    | 'Build In'
    | 'Leather'
    | 'Custom Parts'

export type AngleType = false | 'flat' | 'corner';

export type ProductType = {
    id: number,
    name: string,
    room: string,
    category: productCategory,
    images: itemImg[],
    attributes: attrItem[],
    options: string[],
    legsHeight: number,
    isBlind: boolean,
    isAngle: AngleType,
    isProductStandard: boolean,
    product_type: ProductApiType,
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


export type productPricesType = {
    id: number,
    prices: {
        type: pricesTypings,
        data: pricePart[]
    }[]
}


export type CustomPart = {
    id: number,
    name: string,
    type: CustomTypes,
    product_type: 'custom',
    width?: number,
    depth?: number,
    images: itemImg[],
    materials_array?: materialsCustomPart[],
    limits?: materialsLimitsType,
    glass_door?: {
        Profile: optionType[]
        Glass: string[],
        Mirror: string[],
        Colored: string[]
    },
    glass_shelf?: string[],

}

export type customPartDataType = {
    id: number,
    name: string,
    room: string,
    product_type: 'custom',
    type: CustomTypes,
    category: productCategory,
    width?: number,
    depth?: number,
    images: itemImg[],
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
    category: MaybeEmpty<RoomCategories>,
    base_price_type: pricesTypings,
    finish_coef: number,
    grain_coef: number,
    premium_coef: number,
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
    is_leather_closet: boolean,
    box_material: string
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

export type pricePartStandardPanel = {
    width: number,
    height: number,
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

export type OrderType = {
    product_id: number,
    price: number,
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
    note: string,
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