import {optionType} from "../common/SelectField";
import {ledAlignmentType} from "../Components/Product/ProductLED";
import {DoorTypesType, RoomCategoriesType} from "./roomTypes";
import {DoorAccessoryType} from "../Components/CustomPart/CustomPart";
import {PanelsFormType} from "../Components/CustomPart/CustomPartStandardPanel";
import {DoorSizesArrType} from "../Components/CustomPart/CustomPartStandardDoorForm";
import {BoxMaterialType} from "./roomTypes";
import {colorOption} from "../Components/CustomPart/CustomPartGolaProfile";

export type productTypings = 1 | 2 | 3 | 4
export type pricesTypings = 1 | 2 | 3 | 'wood_veneer';
export type DoorColorType = 1 | 2 | 3;
export type BoxMaterialColorType = 1 | 2 | 3 | 4;

export type MaybeEmpty<T> = T | '';
export type MaybeUndefined<T> = T | undefined;
export type MaybeNull<T> = T | null;

export const cornerArr = ["Left", "Right"] as const;
export const hingeArr = ['Left', 'Right', 'Double Doors', 'Two left doors', 'Two right doors', 'Single left door', 'Single right door', 'Four doors', ''] as const;
export const closetAccessoriesNames = ['Belt Rack', 'Tie Rack', 'Valet Rod', 'Pant Rack'] as const;
export const glassAndMirrorNames = ['Clear Glass', 'Bronze Glass', 'Gray Glass', 'Frosted Glass', 'Clear Mirror', 'Bronze Mirror', 'Gray Mirror'] as const;

export type cornerTypes = typeof cornerArr[number];
export type hingeTypes = typeof hingeArr[number];
export type ClosetAccessoriesTypes = typeof closetAccessoriesNames[number];
export type GlassAndMirrorTypes = typeof glassAndMirrorNames[number];

export type ProductApiType = 'cabinet' | 'standard' | 'custom';
export type CustomTypes =
    'custom'
    | 'pvc'
    | 'glass-door'
    | 'glass-shelf'
    | 'led-accessories'
    | 'door-accessories'
    | 'standard-doors'
    | 'standard-glass-doors'
    | 'backing'
    | 'standard-panel'
    | 'plastic_toe'
    | 'rta-closets'
    | 'custom-doors'
    | 'ribbed'
    | 'floating-shelf'
    | 'drawer-inserts';

const customPartsNames = ['RTA Closet additional parts', 'Standard Panel, L-shapes, Wood Toe Kick, Crown Molding', 'Standard Door', 'Glass Door', 'Open Cabinet', 'Floating Shelf', 'Panel, Filler, WTK', 'Double Panel', 'L Shape', 'Column', 'Plastic Toe Kick', 'Backing', 'Shaker Panel', 'Decor Panel', 'Slatted Panel', 'Shaker Glass Door', 'Glass Aluminum Door', 'PVC', 'Glass shelf', 'LED Accessories', 'Door Accessories', 'Custom Size Door', 'Custom Size Glass Door', 'Ribbed panels','1½” Thick Floating Shelves'] as const;
export type CustomPartsNamesType = typeof customPartsNames[number];

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
    | 'Standard Parts';

export type VanitiesCategory = 'Vanities' | 'Floating Vanities' | 'Gola Floating Vanities';

export type ClosetsCategory = 'Build In' | 'Leather' | 'RTA Closets' | 'Cabinet System Closet';

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
    images: string[]
}

export interface ProductType extends ProductOrCustomType{
    category: productCategory,
    attributes: attrItem[],
    options: string[],
    legsHeight?: number,
    isBlind?: boolean,
    isAngle?: AngleType,
    customHeight: MaybeUndefined<number>,
    customDepth: MaybeUndefined<number>,
    hasSolidWidth?: true,
    middleSectionDefault?: number,
    isCornerChoose: MaybeUndefined<true>,
    widthDivider?: number,
    heightRange?: number,
    cartExtras: CartExtrasType,
    hasLedBlock: boolean,
    blindArr?: number[],
    horizontal_line?: number,
    hasClosetAccessoriesBlock?: boolean,
    hasJeweleryBlock?:boolean,
    hasMechanism?: MechanismType
}

export interface CustomPartType extends ProductOrCustomType{
    name: CustomPartsNamesType,
    type: CustomTypes,
    width?: number,
    height?: number,
    depth?: number,
    height_range?: number[],
    materials_array?: materialsCustomPart[],
    limits?: materialsLimitsType,
    glass_shelf?: string[],

}

export interface CustomPartDataType extends ProductOrCustomType{
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
    depth?: number,
    img?: string
}

export type materialsLimitsType = {
    width?: number[],
    height?: number[],
    depth?: number[]
}

export type materialDataType = {
    is_standard_room: boolean,
    category: MaybeEmpty<RoomCategoriesType>,
    base_price_type: pricesTypings,
    grain_coef: number,
    box_material_coef: number,
    box_material_finish_coef: number,
    door_price_multiplier: number,
    door_type: MaybeEmpty<DoorTypesType>,
    door_finish_material: string,
    drawer_brand: string,
    drawer_type: string,
    drawer_color: string,
    leather: string,
    is_leather_or_rta_or_system_closet: boolean,
    box_material: MaybeEmpty<BoxMaterialType>,
    box_color: string,
    materials_coef: number
}


export interface attrItem {
    name: string,
    values: valueItemType[],
}

export type ImgFieldType = {
    value: string,
    img: string
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
    productData: ProductTableDataType
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
    closetAccessoriesPrice: number,
    jeweleryInsertsPrice: number,
    mechanismPrice: number
}

export const jeweleryInsertsNames = ['Top Drawer', 'Second Drawer'] as const;
export type JeweleryInsertsType = typeof jeweleryInsertsNames[number];
export type ProductExtraType = {
    closet_accessories?: ClosetAccessoriesTypes,
    jewelery_inserts?: JeweleryInsertsType[],
    mechanism?: string
}

export type ProductFormType = {
    width: number,
    custom_width: MaybeEmpty<number>,
    custom_width_string: string,
    blind_width: MaybeEmpty<number>,
    custom_blind_width: MaybeEmpty<number>,
    custom_blind_width_string: MaybeEmpty<string>,
    height: number,
    custom_height: MaybeEmpty<number>,
    custom_height_string: string,
    depth: number,
    custom_depth: MaybeEmpty<number>,
    custom_depth_string: string,
    doors_amount: number,
    hinge_opening: hingeTypes,
    corner: MaybeEmpty<cornerTypes>,
    options: string[],
    middle_section: MaybeEmpty<number>,
    middle_section_string: MaybeEmpty<string>,
    led_borders: string[],
    led_alignment: MaybeEmpty<ledAlignmentType>,
    led_indent_string: string,
    glass_door: string[],
    glass_shelf: MaybeEmpty<GlassAndMirrorTypes>
    note: string,
    price: number,
    image_active_number: productTypings,
    custom: MaybeNull<ProductExtraType>,
    amount: number
}



export type ProductTableDataType = {
    materialData: materialDataType,
    tablePriceData: pricePart[],
    sizeLimit: sizeLimitsType,
    widthRange: number[],
    heightRange: number[],
    depthRange: number[],
    middleSectionNumber: number,
    middleSection: string,
    blindWidth: MaybeEmpty<number>,
    corner:MaybeEmpty<cornerTypes>,
    ledAlignment:MaybeEmpty<ledAlignmentType>,
    productPriceData: productDataToCalculatePriceType
    isBlind: boolean,
}

export type CustomPartTableDataType = {
    initialMaterialData: MaybeNull<materialsCustomPart>,
    initialSizes: InitialSizesType,
    initialDoorAccessories: MaybeNull<DoorAccessoryType[]>,
    initialStandardPanels: MaybeNull<PanelsFormType>,
    initialLEDAccessories: MaybeNull<LedAccessoriesFormType>,
    standardDoorData: MaybeNull<DoorSizesArrType[]>
}

export type InitialSizesType = {
    initial_width: number,
    initial_height: number,
    initial_depth: number
}

export type LedAccessoriesFormType = {
    alum_profiles: {
        length_string: string,
        length: number,
        qty: number
    }[],
    gola_profiles: {
        length_string: string,
        length: number,
        color: colorOption,
        qty: number,
    }[],
    transformer_60_W: number,
    transformer_100_W: number,
    remote_control: number,
    door_sensor_single: number,
    door_sensor_double: number,
}

export type MechanismType = {
    label: string,
    attributes: MechanismAccessoriesType[]
}

type MechanismAccessoriesType = {
    name: string,
    price: number
}