import {optionType} from "../common/SelectField";
import {MaybeEmpty, MaybeUndefined} from "../Components/Profile/RoomForm";
export type productTypings = 1 | 2 | 3 | 4
export type pricesTypings = 1 | 2 | 3

export type hingeTypes = 'Left' | 'Right' | 'Double Door' | 'Single Door' | '';
export type cornerTypes = 'Left' | 'Right' | '';

export const cornerArr:cornerTypes[] = ["Left", "Right"];
export const hingeArr:hingeTypes[] = ['Left' , 'Right' , 'Double Door' , 'Single Door'];

export type RoomCategories = "Kitchen" | "Vanity" | "Build In Closet" | "Leather Closet" | "Standard Door"

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
    | 'Standard Tall Cabinets'
export type productCategory =
    kitchenCategories
    | StandardCategory
    | 'Regular Vanities'
    | 'Gola Vanities'
    | 'Build In'
    | 'Leather'
    | 'Custom Parts'

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
    isAngle: boolean,
    isProductStandard: boolean,
    customHeight?: number,
    customDepth?: number,
    hasSolidWidth?: true,
    hasMiddleSection?: true,
    isCornerChoose: MaybeUndefined<true>,
    doorSquare: number,
    widthDivider?: number,
    heightRange?: number,
    cartExtras: CartExtrasType,
    hasLedBlock: boolean,
    blindArr?: number[]
}


export type productPricesType = {
    id: number,
    prices: {
        type: pricesTypings,
        data: pricePart[]
    }[]
}


export const DefaultProductType: Pick<ProductType, 'isProductStandard'> = {
    isProductStandard: false,
}

export type customPartDataType = {
    id: number,
    name: string,
    room: string,
    type: 'custom' | 'pvc' | 'glass-door' | 'glass-shelf' | 'led-accessories' | 'door-accessories' | 'standard-door' | 'standard-glass-door' | 'backing'
    category: productCategory,
    width?: number,
    depth?: number,
    image: string,
    price?: number,
    materials?: materialsCustomPart[],
    limits?: materialsLimitsType,
    glassDoor?: glassDoorType,
    glassShelf?: optionType[]
}

export type glassDoorType = {
    ['Profile']?: optionType[],
    ['Glass Type']?: optionType[],
    ['Glass Color']?: optionType[]
}

export type materialsCustomPart = {
    name: string,
    limits: materialsLimitsType,
    depth?: number
}

export type materialsLimitsType = {
    width?: number[],
    height?: number[],
    depth?: number[]
}


// export interface standardProductType extends productDataType {
//     type: productTypings,
//     price: number,
//     height: number,
//     depth: number,
//     doorSquare?: number,
//     widthDivider?: number,
//     heightRange?: number,
//     cartExtras: CartExtrasType
// }

export type materialDataType = {
    isStandardCabinet: boolean,
    category: MaybeEmpty<RoomCategories>,
    basePriceType: pricesTypings,
    baseCoef: number,
    grainCoef: number,
    premiumCoef: number,
    boxMaterialCoef: number,
    boxMaterialFinishCoef: number,
    doorPriceMultiplier: number,
    isAcrylic: boolean,
    doorType: MaybeUndefined<string>,
    doorFinish: MaybeUndefined<string>,
    drawerBrand: string,
    drawerType: string,
    drawerColor: string,
    leatherType: MaybeUndefined<string>
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
    productRange:productRangeType,
    tablePriceData: pricePart[],
    sizeLimit:sizeLimitsType
}

export type CabinetFormType = {
    product: ProductType,
    extraPrices: extraPricesType,
    productPriceData: productDataToCalculatePriceType,
    productRange: productRangeType,
    hingeArr: string[],
}

// export type StandardCabinetType = {
//     product: standardProductType,
//     materials: OrderFormType,
// }

export type StandardMaterialDataType = {
    category: string
    boxMaterialCoef: number,
    drawer: drawerInterface,
}

// export type StandardCabinetFormType = {
//     product: standardProductType,
//     StandardProductPriceData: StandardProductDataToCalculatePriceType,
//     sizeLimit: sizeLimitsType,
//     baseProductPrice: pricePart[],
//     productRange: productRangeType
//     materialData: StandardMaterialDataType
// }

export type DepthRangeType = {
    [key: string]: number,
}

export interface extraPricesType {
    width?: number,
    height?: number,
    depth?: number,
    ptoDoors: number,
    ptoDrawers: number,
    ptoTrashBins: number,
    glassShelf: number,
    glassDoor: number,
    pvcPrice: number,
    doorPrice: number,
    drawerPrice: number,
    ledPrice: number,
    doorSquare: number,
    frontSquare: number,
    premiumCoef: number,
    boxMaterialCoef: number,
    tablePrice?: number
    startPrice?: number
}

export interface extraStandardPricesType {
    depth?: number,
    ptoDoors: number,
    ptoDrawers: number,
    ptoTrashBins: number,
    glassShelf: number,
    glassDoor: number,
    ledPrice: number,
    doorSquare: number,
    tablePrice?: number,
    doorPrice: number,
    drawerPrice: number,
    boxMaterialCoef: number

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