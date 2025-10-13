import {
    AngleType,
    AttributesPrices,
    attrItem, BoxMaterialColorType, ClosetAccessoriesTypes, CustomPartType, CustomTypes,
    DoorColorType, JeweleryInsertsType,
    materialDataType, MaybeEmpty,
    MaybeNull,
    MaybeUndefined,
    priceItem,
    pricePart, priceStandardPanel,
    pricesTypings,
    productCategory,
    productDataToCalculatePriceType,
    productRangeType,
    ProductType,
    productTypings,
    sizeLimitsType,
    valueItemType
} from "./productTypes";
import settings from './../api/settings.json'
import {
    convertDoorAccessories,
    getAttributes, getCabinetHeightRangeBasedOnCategory, getFinishColorCoefCustomPart, getLEDProductCartPrice,
    getProductById,
    getSquare,
    getWidthToCalculateDoor, isClosetLeatherOrRTA,
} from "./helpers";
import {productChangeMaterialType,} from "../store/reducers/generalSlice";
import standardProductsPrices from '../api/standartProductsPrices.json'
import productPrices from '../api/prices.json'
import sizes from './../api/sizes.json'
import {DoorTypesType, FinishTypes, RoomMaterialsFormType} from "./roomTypes";
import {CartAPI, CartAPIImagedType, CartItemFrontType, StandardDoorAPIType} from "./cartTypes";
import {
    DoorAccessoryAPIType, DrawerInsertsType, GrooveAPIType,
    RTAClosetAPIType
} from "../Components/CustomPart/CustomPart";
import {PanelsFormAPIType} from "../Components/CustomPart/CustomPartStandardPanel";
import {BoxMaterialType} from "./roomTypes";

export const getTablePrice = (width: number, height: number, depth: number, priceData: pricePart[], product: ProductType): MaybeUndefined<number> => {
    const maxData = priceData[priceData.length - 1];
    const {width: maxDataWidth, price: maxDataPrice} = maxData
    const {category} = product
    switch (category) {
        case 'Base Cabinets':
        case "Vanities":
        case "Floating Vanities":
        case "Gola Floating Vanities":
        case "Gola Base Cabinets":
            // Round +1 inch to width
            if (width > maxDataWidth + 1) return maxDataPrice;
            const lastElIndex = priceData.length - 1;
            return priceData.find((data_el, index, arr) => {
                const delta_with_next_width = lastElIndex >= index + 1 ? arr[index + 1].width - data_el.width : 3;
                let round_width = delta_with_next_width > 1 ? 1 : 0.95;
                return data_el.width + round_width >= width
            })?.price

        case 'Wall Cabinets':
        case "Gola Wall Cabinets":
        case 'Tall Cabinets':
        case "Gola Tall Cabinets":
        case "Build In":
        case "Custom Parts":
            const widthAndHeightTablePrice: MaybeUndefined<number> = priceData.find(el => (el.width + 1 >= width) && (el.height && el.height + 1 >= height))?.price;
            if (widthAndHeightTablePrice) return widthAndHeightTablePrice;
            if (!maxData.height) return undefined;
            if (width > maxData.width && height > maxData.height) return maxData.price;
            if (width > maxData.width) return priceData.find(el => (el.width === maxData.width) && (el.height && el.height + 1 >= height))?.price;
            if (height > maxData.height) return priceData.find(el => (el.height === maxData.height) && (el.width + 1 >= width))?.price;
            return undefined;
        case "Leather":
        case "RTA Closets":
            if (!priceData[0]?.depth) {
                const widthTablePrice: MaybeUndefined<number> = priceData.find(el => el.width + 1 >= width)?.price;
                if (widthTablePrice) return widthTablePrice;
                if (width > maxData.width) return maxData.price;
                return undefined;
            }
            const widthAndDepthTablePrice: MaybeUndefined<number> = priceData.find(el => (el.width + 1 >= width) && (el.depth && el.depth + 1 >= depth))?.price;
            if (widthAndDepthTablePrice) return widthAndDepthTablePrice;
            if (width > maxData.width && maxData.depth && depth > maxData.depth) return maxData.price;
            if (width > maxData.width) return priceData.find(el => (el.width === maxData.width) && (el.depth && el.depth + 1 >= depth))?.price;
            if (maxData.depth && depth > maxData.depth) return priceData.find(el => (el.depth === maxData.depth) && (el.width + 1 >= width))?.price;
            return undefined;
        case "Standard Base Cabinets":
        case "Standard Wall Cabinets":
        case "Standard Tall Cabinets":
            const hasHeightDependency = priceData[0].height
            if (!hasHeightDependency) return priceData.find(el => el.width + 1 >= width)?.price;
            return priceData.find(el => el.width === width && el.height === height)?.price;
    }
    return undefined
};

function getStartPrice(customWidth: number, customHeight: number, customDepth: number, materialsCoef: number, sizeLimit: sizeLimitsType, tablePrice: MaybeUndefined<number>): number {
    const settingMinWidth = sizeLimit.width[0];
    const settingMaxWidth = sizeLimit.width[1];
    const settingMinHeight = sizeLimit.height[0];
    const settingMaxHeight = sizeLimit.height[1];
    const settingMinDepth = sizeLimit.depth[0];
    const settingMaxDepth = sizeLimit.depth[1];
    const isFitMinMaxWidth = (customWidth >= settingMinWidth) && (customWidth <= settingMaxWidth);
    const isFitMinMaxHeight = (customHeight >= settingMinHeight) && (customHeight <= settingMaxHeight);
    const isFitMinMaxDepth = (customDepth >= settingMinDepth) && (customDepth <= settingMaxDepth);
    if (!isFitMinMaxWidth || !isFitMinMaxHeight || !isFitMinMaxDepth || !tablePrice) return 0;
    return +(tablePrice * materialsCoef).toFixed(1)
}

export function addWidthPriceCoef(width: number, maxWidth: number) {
    return Math.ceil((width - maxWidth - 1) / 3) / 10;
}

export function addHeightPriceCoef(customHeight: number, maxHeight: number) {
    return Math.ceil((customHeight - maxHeight - 1) / 3) / 10
}

export function addDepthPriceCoef(customDepth: number, depthRangeData: number[], isAngle: MaybeUndefined<AngleType>) {
    if (isAngle) return 0;
    const maxDepth = depthRangeData[depthRangeData.length - 1];
    if (customDepth > maxDepth) return Math.ceil((customDepth - maxDepth - 1) / 3) / 10;
    return 0
}

function addPTODoorsPrice(attributes: attrItem[], prodType: productTypings): number {
    const attrs = getAttributes(attributes, prodType);
    const doorQty = attrs.find(attr => attr.name === "Door")?.value;
    return doorQty && settings.fixPrices["PTO for doors"] ? +doorQty * settings.fixPrices["PTO for doors"] : 0;
}

export function addPTODrawerPrice(prodType: productTypings, drawersQty: number): number {
    return drawersQty && settings.fixPrices["PTO for drawers"] ? +drawersQty * settings.fixPrices["PTO for drawers"] : 0;
}

export function addPTOTrashBinsPrice(): number {
    return settings.fixPrices['PTO for trash bins'] || 0
}

export function addGlassShelfPrice(qty: number): number {
    return settings.fixPrices["Glass Shelf"] * qty || 0
}

export function addGlassDoorPrice(square: number, profileName: MaybeUndefined<string>, is_standard: boolean, hasGlassDoor: boolean): number {
    if (!hasGlassDoor) return 0;
    if (is_standard) return square * settings.standard_glass_door_price;

    const profileType = settings.Glass.Profile.find(el => el.value === profileName)?.type;
    const minPrice = settings.Glass.priceType.find(el => el.id === profileType)?.minPrice;
    const multiplier = settings.Glass.priceType.find(el => el.id === profileType)?.multiplier;
    if (!minPrice || !multiplier) return 0;
    const p = square * multiplier;
    return p > minPrice ? p : minPrice
}

export function getType(width: number, height: number, widthDivider: number | undefined, doors: number, category: productCategory, attributes: attrItem[]): productTypings {
    const doorValues = attributes.find(el => el.name === 'Door')?.values ?? [];
    const shelfValues = attributes.find(el => el.name === 'Adjustable Shelf')?.values ?? [];
    if (!attributes.length || attributes[0].values.length < 2) return 1;

    switch (category) {
        case 'Base Cabinets':
        case "Vanities":
        case "Floating Vanities":
        case "Gola Floating Vanities":
        case "Gola Base Cabinets":
        case "Standard Base Cabinets":
            if (widthDivider) return width <= widthDivider ? 1 : 2;
            const currentDoorType = doorValues.find(el => el.value === doors)?.type
            return currentDoorType ?? 1;
        case 'Wall Cabinets':
        case 'Tall Cabinets':
        case "Gola Wall Cabinets":
        case "Gola Tall Cabinets":
        case "Build In":
        case "Leather":
        case "Standard Wall Cabinets":
        case "Standard Tall Cabinets":
            if (!shelfValues) return 1;
            const doorsArr = filterDoorArr(width, doorValues);

            const shelfsArr = shelfValues.filter(val => {
                const isMaxWidth = val.maxWidth
                const isMinWidth = val.minWidth
                const isMaxHeight = val.maxHeight
                const isMinHeight = val.minHeight

                if (isMaxWidth && isMaxWidth <= width) return false;
                if (isMinWidth && isMinWidth > width) return false;
                if (isMaxHeight && isMaxHeight <= height) return false;
                if (isMinHeight && isMinHeight > height) return false;
                return true
            })

            let doorTypes = doorsArr.map(el => el.type);
            const currentType = shelfsArr.find(el => doorTypes.includes(el.type));
            return currentType ? currentType.type : 1

        default:
            return 1
    }
}

const filterDoorArr = (width: number, doorValues?: valueItemType[]): valueItemType[] => {
    if (!doorValues) return [];
    if (doorValues.length === 1) return doorValues;
    return doorValues.filter(val => {
        const maxWidth = val.maxWidth;
        const minWidth = val.minWidth;
        if (maxWidth && width >= maxWidth) return false;
        if (minWidth && width < minWidth) return false;
        return true;
    });
}

export function getDoorMinMaxValuesArr(realWidth: number, doorValues?: valueItemType[], widthDivider?: number): MaybeNull<number[]> {
    if (!doorValues) return null;
    if (widthDivider && doorValues.length >= 2) return realWidth <= widthDivider ? [doorValues[0].value] : [doorValues[1].value];
    const filter = filterDoorArr(realWidth, doorValues)
    return [...new Set<number>(filter.map(el => el.value))]
}

function getPvcPrice(doorWidth: number, doorHeight: number, product:ProductType, materialData: materialDataType): number {
    const {horizontal_line = 2, product_type} = product
    const {
        is_acrylic,
        door_finish_material,
        door_type,
        is_leather_or_rta_closet
    } = materialData;
    if (door_type === 'No Doors' || door_finish_material === 'Milino' || product_type === 'standard' || is_leather_or_rta_closet || door_type === 'Wood ribbed doors') return 0;
    const per = (horizontal_line * doorWidth + doorHeight * 2) / 12;
    const pvcPrice = per * 2.5;
    return +(is_acrylic ? pvcPrice * 1.1 : pvcPrice).toFixed(1)
}

function getDoorPrice(square: number, materialData: materialDataType): number {
    const {
        door_price_multiplier,
        is_leather_or_rta_closet,
        box_material,
        box_color,
    } = materialData;
    if (is_leather_or_rta_closet) {
        const oldMultiplier = chooseDoorPanelMultiplier("Slab", box_material, box_color)
        return +(square * (door_price_multiplier - oldMultiplier)).toFixed(1);
    }
    return +(square * door_price_multiplier).toFixed(1);
}

function chooseDoorPanelMultiplier(door_type: string, material: string, color: string): number {
    switch (door_type) {
        case "Slab":
            switch (material) {
                case 'Milino': {
                    const colorType = getDoorColorType(color);
                    if (colorType === 1) return 8;
                    if (colorType === 2) return 8.8;
                    if (colorType === 3) return 9.6;
                    break;
                }
                case "Syncron":
                    return 18;
                case 'Luxe':
                case 'Ultrapan PET':
                    return 24;
                case "Zenit":
                    return 24.72;
                case "Ultrapan Acrylic":
                    return 26.4;
            }
            break;
        case "Five piece shaker":
            if (material === "Syncron") return 48;
            return 61.8;
        case "Custom Painted Shaker":
            return 78;
        case "Micro Shaker":
            return 60;
        case "Slatted":
            return 48;
    }
    return 0;
}

function getPanelPrice(square: number, door_finish_material: MaybeUndefined<string>): number {
    const k = square > 1 ? 1 : 1.8;
    switch (door_finish_material) {
        case "Milino":
            return square * k * 8;
        case "Plywood":
            return square * k * 10;
        case "Syncron":
            return square * k * 18;
        case "Luxe":
        case "Ultrapan PET":
            return square * k * 24;
        case "Ultrapan Acrylic":
            return square * k * 24 * 1.1;
        case "Zenit":
            return square * k * 24 * 1.03;
        case "Painted":
            return square * k * 31.2 * 1.3;
        case "Wood Veneer":
            return square * k * 42;
        default:
            return 0;
    }
}

function getShakerPanelPrice(square: number, door_finish_material: MaybeUndefined<string>): number {
    switch (door_finish_material) {
        case "Milino":
            return square * 36;
        case "Shaker Syncron":
        case "Micro Shaker Milino":
            return square * 48;
        case "Luxe":
        case "Ultrapan PET":
            return square * 60;
        case "Ultrapan Acrylic":
            return square * 60 * 1.1;
        case "Shaker Zenit":
            return square * 60 * 1.03;
        case 'Shaker Painted':
            return square * 78;
        case "Micro Shaker":
            return square * 60
        case "Micro Shaker Veneer":
            return square * 96;
        default:
            return 0;
    }
}

function getSlattedPanelPrice(square: number, material: MaybeUndefined<string>): number {
    if (!material) return 0;
    if (material === 'Milino') return square * 48;
    return square * 60;
}

function getDrawerPrice(qty: number, width: number, door_type: string, drawerBrand: string, drawerType: string, drawerColor: string): number {
    const isStandardCabinet = door_type === 'Standard Size White Shaker'
    if (!qty) return 0;

    switch (drawerBrand) {
        case 'Milino':
            switch (drawerType) {
                case 'Undermount':
                    return isStandardCabinet ? qty * 10 : qty * 15;
                case 'Legrabox':
                    if (drawerColor === 'LED') {
                        return qty * 150;
                    }
                    return !isStandardCabinet ? qty * 33 : 0;
                case 'Dovetail':
                    if (drawerColor === 'Maple') return qty * (width * 2 + 25);
                    if (drawerColor === 'Walnut') return qty * (width * 2 + 45);
                    break;
            }
            break
        case 'BLUM':
            switch (drawerType) {
                case 'Undermount':
                    return qty * 55;
                case 'Legrabox':
                    if (drawerColor === 'Orion Gray') return qty * 150;
                    if (drawerColor === 'Stainless Steel') return qty * 200;
                    break;
                case 'Dovetail':
                    if (drawerColor === 'Maple') return qty * (width * 2 + 65);
                    if (drawerColor === 'Walnut') return qty * (width * 2 + 85);
                    break;
            }
            break;
    }
    return 0
}

function getClosetAccessoriesPrice(closet_accessories: MaybeUndefined<ClosetAccessoriesTypes>, width: number): number {
    if (!closet_accessories) return 0;
    switch (closet_accessories) {
        case "Belt Rack":
            return 100;
        case "Tie Rack":
            return 120;
        case "Valet Rod":
            return 80;
        case "Pant Rack":
            if (width <= 18) return 280;
            if (width <= 24) return 300;
            if (width <= 30) return 350;
    }
    return 0
}

export function getJeweleryInsertsPrice(jewelery_inserts: MaybeUndefined<JeweleryInsertsType[]>): number {
    if (!jewelery_inserts) return 0;
    return jewelery_inserts.length * 100;
}

function getWidthRange(priceData: MaybeUndefined<pricePart[]>): number[] {
    if (!priceData) return [];
    const arr: number[] = priceData.map(el => el.width);
    return [...new Set<number>(arr)];
}

export function getHeightRange(priceData: MaybeUndefined<pricePart[]>, category: productCategory, customHeight: MaybeUndefined<number>): number[] {
    if (customHeight) return [customHeight];
    const isHeightData = priceData && priceData.find((el) => el.height)
    if (isHeightData) {
        let arr: number[] = []
        priceData && priceData.forEach((el) => {
            if (el.height) arr.push(el.height);
            arr.sort((a, b) => a - b)
        })
        return [...new Set<number>(arr)];
    }
    return getCabinetHeightRangeBasedOnCategory(category)
}

function getDepthRange(priceData: pricePart[] | undefined, category: productCategory, customDepth: number | undefined): number[] {
    if (customDepth) return [customDepth];
    const isDepthData = priceData && priceData.find((el) => el.depth);
    if (isDepthData) {
        let arr: number[] = []
        priceData && priceData.forEach((el) => {
            if (el.depth) arr.push(el.depth);
            arr.sort((a, b) => a - b)
        })
        return [...new Set<number>(arr)];
    }

    switch (category) {
        case "Base Cabinets":
        case "Tall Cabinets":
        case "Gola Base Cabinets":
        case "Gola Tall Cabinets":
        case "Standard Base Cabinets":
        case "Standard Tall Cabinets":
            return [24];
        case "Wall Cabinets":
        case "Gola Wall Cabinets":
        case "Standard Wall Cabinets":
            return [13];
        case "Vanities":
        case "Floating Vanities":
        case "Gola Floating Vanities":
            return [21];
        case "Build In":
            return [23]
        case "Leather":
            return [15.5]
        default:
            return []
    }
}

function getLedPrice(realWidth: number, realHeight: number, ledBorders: MaybeUndefined<string[]>): number {
    if (!ledBorders || !ledBorders.length) return 0;
    let sum: number = 0;
    if (ledBorders.includes('Sides')) sum = realHeight * 2 * 2.55
    if (ledBorders.includes('Top')) sum += (realWidth - 1.5) * 2.55
    if (ledBorders.includes('Bottom')) sum += (realWidth - 1.5) * 2.55
    return Math.round(sum)
}

const getBasePriceType = (materials: RoomMaterialsFormType, is_leather_closet: boolean): pricesTypings => {
    const {door_type, door_color, door_finish_material, box_material} = materials;
    if (!box_material || !door_type) return 1;
    if (is_leather_closet) {
        if (box_material === 'Milino') return 1;
        if (box_material === 'Syncron') return 2;
        return 3
    } else {
        switch (door_type as DoorTypesType) {
            case 'Slab':
                if (!door_finish_material) return 3;
                switch (door_finish_material) {
                    case 'Milino':
                        const colorType = getDoorColorType(door_color);
                        if (colorType === 1 || colorType === 2) return 1;
                        return 2;
                    case 'Syncron':
                        return 2;
                }
                break;
            case 'No Doors':
                return 1;
            case 'Five piece shaker':
            case 'Three Piece Door':
            case 'Finger Pull':
                if (door_finish_material === 'Syncron') return 2;
                break;
            case 'Micro Shaker':
            case 'Slatted':
                if (door_finish_material === 'Milino') return 2;
                break;
            case "Wood ribbed doors":
                return 1;
            case "Custom Painted Shaker":
                if (door_finish_material === 'Slab') return 2;
                return 3
        }
        return 3;
    }
}

const getMaterialCoef = (materials: RoomMaterialsFormType, is_leather_closet: boolean): number => {
    const {door_type, door_finish_material, door_color, box_material, box_color} = materials;
    if (!door_type || !box_material) return 1;
    if (!is_leather_closet) {
        switch (door_type as DoorTypesType) {
            case 'Slab':
                if (!door_finish_material) return 1;
                switch (door_finish_material) {
                    case 'Milino':
                        return getDoorColorType(door_color) === 2 ? 1.05 : 1;
                    case 'Zenit':
                        return 1.03;
                    case 'Ultrapan Acrylic':
                        return 1.1;
                }
                break;
            case 'Finger Pull':
            case 'Five piece shaker':
                if (door_finish_material === 'Zenit') return 1.03;
                break;
            case 'Custom Painted Shaker':
                if (door_finish_material === 'Slab') return 1;
                return 1.05;
            case 'Micro Shaker':
                if (door_finish_material === 'Zenit') return 1.03;
                if (door_finish_material === 'Ultrapan Acrylic') return 1.1;
                break;
            case 'Slatted':
                return 1.03;
            case "Wood ribbed doors":
                return 1;
        }
    } else {
        switch (box_material) {
            case 'Milino': {
                const boxColorType = getBoxMaterialColorType(box_color)
                if (boxColorType === 2) return 1.1;
                if (boxColorType === 3) return 1.2;
                if (boxColorType === 4) return 1.15
                break;
            }
            case 'Zenit':
                return 1.03;
            case 'Ultrapan Acrylic':
                return 1.1;
        }
    }
    return 1
}

const getGrainCoef = (doorGrain: string): number => {
    return !doorGrain || doorGrain === 'Vertical' ? 1 : 1.1
}

export const isTexturedColor = (color: string): boolean => {
    // New Textured colors
    return ['Brown Oak', 'Grey Woodline', 'Ivory Woodline', 'White Gloss'].includes(color)
}

const getDoorColorType = (color: string): DoorColorType => {
    if (color.includes('Melamine')) return 1;
    if (isTexturedColor(color)) return 2;
    if (color.includes('Ultra Matte')) return 3;
    return 1
};

const getBoxMaterialColorType = (color: string): BoxMaterialColorType => {
    if (color.includes('Melamine')) return 1;
    if (isTexturedColor(color)) return 2;
    if (color.includes('Ultra Matte')) return 3;
    if (color.includes('Plywood')) return 4;
    return 1
};

const getBoxMaterialCoef = (box_material: MaybeEmpty<BoxMaterialType>, product_id: number): number => {
    // Exceptions
    const noCoefExceptionsArr: number[] = [35];
    if (noCoefExceptionsArr.includes(product_id) || !box_material) return 1;
    switch (box_material) {
        case "Natural Plywood":
        case "White Plywood":
        case "Gray Plywood":
            return 1.15
        case "Gray Melamine":
        case "Ash Melamine":
        case "Beige Linen Melamine":
        case "Gray Linen Melamine":
        case "Walnut Melamine":
        case "White Melamine":
            return 1
        case "Brown Oak":
        case "Grey Woodline":
        case "Ivory Woodline":
        case "White Gloss":
            return 1.1
        case "Ultra Matte Grey":
        case "Ultra Matte White":
        case "Ultra Matte Cashmere":
            return 1.2
        default:
            return 1
    }
}

const getBoxMaterialFinishCoef = (door_finish_material: string, door_color: string): number => {
    switch (door_finish_material) {
        case "Milino":
            const colorType = getDoorColorType(door_color);
            if (colorType === 1) return 2.706;
            if (colorType === 2) return 1.1;
            return 1.2
        case "Syncron":
            return 1.845
        default:
            return 2.706
    }
}
const getDoorPriceMultiplier = (materials: RoomMaterialsFormType, is_standard_room: boolean, is_leather_closet: boolean): number => {
    const {door_type, door_finish_material, door_color} = materials
    if (is_standard_room) return door_color === 'Default White' ? 0 : 30;
    if (!is_leather_closet) {
        if (!door_type) return 0;

        switch (door_type as DoorTypesType) {
            case "Slab":
                if (door_finish_material === 'Wood Veneer') return 22;
                return 0;
            case "No Doors":
                return -8;
            case "Five piece shaker":
            case "Three Piece Door":
            case "Finger Pull":
                if (door_finish_material === 'Syncron') return 30;
                return 36;
            case "Custom Painted Shaker":
                if (door_finish_material === 'Slab') return 30;
                return 43.2;
            case "Micro Shaker":
                switch (door_finish_material as FinishTypes) {
                    case "Milino":
                        return 30;
                    case "Wood Veneer":
                        return 58
                    default:
                        return 36;
                }
            case "Slatted":
                if (door_finish_material === 'Milino') return 31.5;
                return 37.8;
            case "Wood ribbed doors": {
                const finish = door_finish_material as FinishTypes;
                const extra = finish.includes('Clear Coat') ? settings.fixPrices.clear_coat : 0;
                if (finish.includes('Maple') || finish.includes('Birch')) return 145 + extra;
                if (finish.includes('White Oak') || finish.includes('Walnut')) return 225 + extra;
            }
        }
        return 0;
    }
    return chooseDoorPanelMultiplier(door_type, door_finish_material, door_color);
}
export const getProductRange = (priceData: MaybeUndefined<pricePart[]>, category: productCategory, customHeight: MaybeUndefined<number>, customDepth: MaybeUndefined<number>): productRangeType => {
    return {
        widthRange: getWidthRange(priceData),
        heightRange: getHeightRange(priceData, category, customHeight),
        depthRange: getDepthRange(priceData, category, customDepth)
    }
}
export const getMaterialData = (materials: RoomMaterialsFormType, product_id: number): materialDataType => {
    const {
        box_material,
        door_type,
        door_grain,
        door_finish_material,
        door_color,
        category,
        drawer_brand,
        drawer_type,
        drawer_color,
        leather,
        box_color
    } = materials;
    const is_standard_room = door_type === "Standard Size White Shaker";

    const is_leather_or_rta_closet = isClosetLeatherOrRTA(category);
    const is_acrylic = door_finish_material === 'Ultrapan Acrylic';

    const base_price_type = getBasePriceType(materials, is_leather_or_rta_closet);
    const materials_coef = getMaterialCoef(materials, is_leather_or_rta_closet);
    const grain_coef = getGrainCoef(door_grain);
    const box_material_coef = getBoxMaterialCoef(box_material, product_id);
    const box_material_finish_coef = getBoxMaterialFinishCoef(door_finish_material, door_color);
    const door_price_multiplier = getDoorPriceMultiplier(materials, is_standard_room, is_leather_or_rta_closet);
    return {
        is_standard_room,
        category,
        base_price_type,
        grain_coef,
        box_material_coef,
        box_material_finish_coef,
        box_color,
        door_price_multiplier,
        is_acrylic,
        door_type,
        door_finish_material,
        drawer_brand,
        drawer_type,
        drawer_color,
        leather,
        is_leather_or_rta_closet,
        box_material,
        materials_coef
    }
}
export const getProductDataToCalculatePrice = (product: ProductType | productChangeMaterialType, drawerBrand: MaybeUndefined<string>, image_active_number: productTypings = 1): productDataToCalculatePriceType => {
    const {attributes, options} = product;
    const attrArr = getAttributes(attributes, image_active_number);
    const doorValues = attributes.find(el => el.name === 'Door')?.values;

    const drawersQty = attrArr.reduce((acc, current) => {
        const qty = current.name.includes('Drawer') ? current.value : 0
        return acc + qty;
    }, 0);
    const rolloutsQty = attrArr.reduce((acc, current) => {
        const qty = current.name.includes('Rollout') ? current.value : 0
        return acc + qty;
    }, 0);
    const filteredOptions = options.filter(option => (option !== 'PTO for drawers' || drawerBrand !== 'Milino'));
    const shelfsQty = getShelfsQty(attrArr);
    return {
        doorValues,
        drawersQty,
        rolloutsQty,
        filteredOptions,
        shelfsQty
    }
}
export const getProductPriceRange = (id: number, isStandardCabinet: boolean = false, type: pricesTypings = 1): MaybeUndefined<pricePart[]> => {
    if (isStandardCabinet) return standardProductsPrices.find(el => el.id === id)?.prices;
    const data = productPrices.find(el => el.id === id)?.prices as priceItem[];
    return data ? data.find(i => i.type === type)?.data : undefined
}
export const getCustomPartPrice = (product: CustomPartType, materials: RoomMaterialsFormType, values: CartAPI): number => {
    let price: number = 0;
    const {width, height, depth, custom, glass} = values;
    if (!custom) return price;
    const {material, accessories, standard_doors, standard_panels, rta_closet, groove, drawer_inserts} = custom;
    const {door_color, door_type} = materials
    const {id, type} = product;
    const area = +(width * height / 144).toFixed(2);
    switch (type) {
        case "custom":
        case "pvc":
        case "backing":
        case "glass-door":
        case "glass-shelf": {
            let priceCustom = 0;
            const finishColorCoef = getFinishColorCoefCustomPart(id, material, door_color);
            switch (id) {
                case 900: {
                    switch (material) {
                        case "Milino":
                            priceCustom = (width * height * depth / 100) + 120;
                            break;
                        case "Plywood":
                            priceCustom = (width * height * depth / 80) + 120;
                            break;
                        case "Syncron":
                            priceCustom = (width * height * depth / 50) + 120;
                            break;
                        case "Luxe":
                        case "Ultrapan PET":
                            priceCustom = (width * height * depth / 20) + 120;
                            break;
                        case "Ultrapan Acrylic":
                            priceCustom = ((width * height * depth / 20) + 120) * 1.1;
                            break;
                        case "Zenit":
                            priceCustom = ((width * height * depth / 20) + 120) * 1.03;
                            break;
                        case "Painted":
                            priceCustom = ((width * height * depth / 20) + 120) * 1.3 * 1.05;
                            break;
                        case "Wood Veneer":
                            priceCustom = ((width * height * depth / 10) + 120);
                            break;
                    }
                    break;
                }
                case 901: {
                    const opetCabinetCoef = (width * height + width * depth + height * depth) / 144 * 2 * 2.3
                    switch (material) {
                        case "Milino":
                            priceCustom = opetCabinetCoef * 20;
                            break;
                        case "Syncron":
                            priceCustom = opetCabinetCoef * 22;
                            break;
                        case "Luxe":
                        case "Ultrapan PET":
                            priceCustom = opetCabinetCoef * 24;
                            break;
                        case "Ultrapan Acrylic":
                            priceCustom = opetCabinetCoef * 24 * 1.1;
                            break;
                        case "Zenit":
                            priceCustom = opetCabinetCoef * 24 * 1.03;
                            break;
                        case "Painted":
                            priceCustom = opetCabinetCoef * 31.2 * 1.05;
                            break;
                        case "Wood Veneer":
                            priceCustom = opetCabinetCoef * 34;
                            break;
                    }
                    break;
                }
                case 903: {
                    priceCustom = getPanelPrice(area, material);
                    break;
                }
                case 905: {
                    switch (material) {
                        case "Milino":
                            priceCustom = area * 36;
                            break;
                        case "Plywood":
                            priceCustom = area * 40;
                            break;
                        case "Syncron":
                            priceCustom = area * 48;
                            break;
                        case "Luxe":
                        case "Ultrapan PET":
                            priceCustom = area * 60;
                            break;
                        case "Ultrapan Acrylic":
                            priceCustom = area * 60 * 1.1;
                            break;
                        case "Zenit":
                            priceCustom = area * 60 * 1.03;
                            break;
                        case "Painted":
                            priceCustom = area * 78;
                            break;
                        case "Wood Veneer":
                            priceCustom = area * 90;
                            break;
                    }
                    break;
                }
                case 906: {
                    const min = Math.min(width, height);
                    const max = Math.max(width, height);
                    const lSHapeArea = (min + depth) * max / 144
                    switch (material) {
                        case "Milino":
                            priceCustom = lSHapeArea * 19;
                            break
                        case "Plywood":
                            priceCustom = lSHapeArea * 21;
                            break
                        case "Syncron":
                            priceCustom = lSHapeArea * 39;
                            break
                        case "Luxe":
                        case "Ultrapan PET":
                            priceCustom = lSHapeArea * 58;
                            break
                        case "Ultrapan Acrylic":
                            priceCustom = lSHapeArea * 58 * 1.1;
                            break
                        case "Zenit":
                            priceCustom = lSHapeArea * 58 * 1.03;
                            break
                        case "Painted":
                            priceCustom = lSHapeArea * 74.4;
                            break
                        case "Wood Veneer":
                            priceCustom = lSHapeArea * 100;
                            break
                    }
                    break
                }
                case 907: {
                    const columnArea = (width * height + width * depth + height * depth) / 144 * 2 * 2.3;
                    switch (material) {
                        case "Milino":
                            priceCustom = columnArea * 15.2;
                            break
                        case "Syncron":
                            priceCustom = columnArea * 16.8;
                            break
                        case "Luxe":
                        case "Ultrapan PET":
                            priceCustom = columnArea * 18.4;
                            break
                        case "Ultrapan Acrylic":
                            priceCustom = columnArea * 18.4 * 1.1;
                            break
                        case "Zenit":
                            priceCustom = columnArea * 18.4 * 1.03;
                            break
                        case "Painted":
                            priceCustom = columnArea * 23.92;
                            break
                        case "Wood Veneer":
                            priceCustom = columnArea * 26;
                            break
                    }
                    break
                }
                case 909: {
                    priceCustom = width * height / 144 * 4.6;
                    break
                }
                case 910: {
                    priceCustom = getShakerPanelPrice(area, material);
                    break
                }
                case 911: {
                    let decorPrice = area > 4 ? area * 64 : 240;
                    priceCustom = material === 'Ultrapan Acrylic' ? decorPrice * 1.1 : decorPrice
                    switch (material) {
                        case "Ultrapan Acrylic":
                            priceCustom = decorPrice * 1.1;
                            break;
                        case "Wood Veneer":
                            priceCustom = area > 4 ? area * 105 : 240;
                            break;
                        default:
                            priceCustom = decorPrice;
                    }
                    break
                }
                case 912: {
                    priceCustom = getSlattedPanelPrice(area, material);
                    break
                }
                case 913: {
                    let shakerDoorPrice = area * 80 > 240 ? area * 80 : 240;
                    priceCustom = material === 'Ultrapan Acrylic' ? shakerDoorPrice * 1.1 : shakerDoorPrice;
                    break
                }
                case 914: {
                    const doorProfileVal: MaybeUndefined<string> = glass?.door?.[0]
                    priceCustom = addGlassDoorPrice(area, doorProfileVal, false, true);
                    break;
                }
                case 915: {
                    priceCustom = material === 'Ultrapan Acrylic' ? Math.ceil(width * 1.1) : Math.ceil(width);
                    break;
                }
                case 916: {
                    priceCustom = 170;
                    break
                }
            }
            price = +(priceCustom * finishColorCoef).toFixed(1);
            break;
        }
        case "led-accessories": {
            if (accessories?.led) price = getLEDProductCartPrice(accessories.led);
            break;
        }
        case "door-accessories": {
            if (accessories?.door) price = addToCartDoorAccessories(accessories.door);
            break
        }
        case "standard-doors":
        case "standard-glass-doors": {
            if (standard_doors) price = getCustomPartStandardDoorPrice(standard_doors, type, door_color);
            break;
        }
        case "standard-panel": {
            if (standard_panels) {
                const is_price_type_default = door_type === 'Standard Size White Shaker' && door_color === 'Default White';
                const apiPanelData = standardProductsPrices.find(el => el.id === id) as priceStandardPanel;
                price = getStandardPanelsPrice(standard_panels, is_price_type_default, apiPanelData)
            }
            break
        }
        case "plastic_toe": {
            price = settings.fixPrices.plastic_toe;
            break;
        }
        case "rta-closets": {
            if (rta_closet) price = getRTAClosetCustomPartPrice(rta_closet, materials);
            break;
        }
        case "custom-doors": {
            price = getCustomDoorsPrice(area, id);
            break;
        }
        case "ribbed":
            price = getRibbedCustomPartPrice(material, groove, area);
            break;
        case "floating-shelf":
            const sq = width * depth / 144;
            price = getFloatingShelfCustomPartPrice(material, sq);
            break;
        case "drawer-inserts":
            price = getDrawerInsertsCustomPartPrice(drawer_inserts, width);
            break;
    }
    return +(price * settings.global_price_coef).toFixed(1);
}

export const addToCartDoorAccessories = (values: MaybeNull<DoorAccessoryAPIType[]>): number => {
    if (!values) return 0;
    const frontAccessories = values.map(el => (convertDoorAccessories(el)))
    return +(frontAccessories.reduce((acc, item) => acc + (item.price * item.qty), 0)).toFixed(1)
}

export const getCustomPartStandardDoorPrice = (doors: MaybeNull<StandardDoorAPIType[]>, name: CustomTypes, color: string): number => {
    if (!doors) return 0;
    const glassPrice: number = name !== 'standard-doors' ? settings.standard_glass_door_price : 0;
    const colorPrice: number = color !== 'Default White' ? settings.standard_glass_door_color_coef : 0;
    return doors.reduce((acc, door) => {
        const sqr = door.width * door.height / 144;
        const doorPrice = sqr * (20 + glassPrice + colorPrice);
        return +(acc + (doorPrice * door.qty)).toFixed(1)
    }, 0);
}


export const getStandardPanelsPrice = (standard_panels: PanelsFormAPIType, is_price_type_default: boolean, apiPanelData: priceStandardPanel): number => {
    const {standard_panel = [], shape_panel = [], wtk = [], crown_molding = 0} = standard_panels;

    const standard_panel_price = standard_panel.reduce((acc, panel) => {
        const panelPriceData = apiPanelData.standard_panel.find(el => el.name === panel.name);
        if (!panelPriceData) return 0;
        return acc + ((is_price_type_default ? panelPriceData.price : panelPriceData.painted_price) * panel.qty)
    }, 0);

    const shape_panel_price = shape_panel.reduce((acc, panel) => {
        const panelPriceData = apiPanelData.shape_panel.find(el => el.name === panel.name);
        if (!panelPriceData) return 0;
        return acc + ((is_price_type_default ? panelPriceData.price : panelPriceData.painted_price) * panel.qty)
    }, 0);

    const wtk_price = wtk.reduce((acc, panel) => {
        const panelPriceData = apiPanelData.wtk.find(el => el.name === panel.name);
        if (!panelPriceData) return 0;
        return acc + ((is_price_type_default ? panelPriceData.price : panelPriceData.painted_price) * panel.qty)
    }, 0);


    const crown_molding_item_price: number = is_price_type_default ? settings.crown_molding_price[0] : settings.crown_molding_price[1]
    const crown_price = crown_molding_item_price * crown_molding;

    return standard_panel_price + shape_panel_price + wtk_price + crown_price;
}

const getShelfsQty = (attrArr: { name: string, value: number }[]): number => {
    return attrArr.find(el => el.name === 'Adjustable Shelf')?.value ?? 0;
}
export const calculateCartPriceAfterMaterialsChange = (cart: CartItemFrontType[], materials: RoomMaterialsFormType): CartItemFrontType[] => {
    return cart.map(cartItem => {
        const {product_id, product_type} = cartItem;
        const product_or_custom = getProductById(product_id, product_type === 'standard');
        if (!product_or_custom) return cartItem;
        if (product_type === 'custom') return cartItem;
        const product = product_or_custom as unknown as ProductType;
        const materialData = getMaterialData(materials, product_id)
        const {is_standard_room, base_price_type} = materialData;
        const tablePriceData = getProductPriceRange(product_id, is_standard_room, base_price_type);
        if (!tablePriceData) return cartItem;
        const sizeLimit: MaybeUndefined<sizeLimitsType> = sizes.find(size => size.productIds.includes(product_id))?.limits;
        if (!sizeLimit) return cartItem;
        const totalPrice = calculateProduct(cartItem, materialData, tablePriceData, sizeLimit, product);
        return {...cartItem, price: totalPrice};
    });
}

export const calculateProduct = (cabinetItem: CartAPIImagedType, materialData: materialDataType, tablePriceData: pricePart[], sizeLimit: sizeLimitsType, product: ProductType): number => {
    const {width, height, depth, options} = cabinetItem;
    const boxFromFinishMaterial = options.includes("Box from finish material");
    const overall_coef = getOverallCoef(materialData, boxFromFinishMaterial);
    const tablePrice = getTablePrice(width, height, depth, tablePriceData, product);
    const startPrice = getStartPrice(width, height, depth, overall_coef, sizeLimit, tablePrice);
    const size_coef = getSizeCoef(cabinetItem, tablePriceData, product);
    const attributesPrices = getAttributesProductPrices(cabinetItem, product, materialData);
    const attrPrice = Object.values(attributesPrices).reduce((partialSum, a) => partialSum + a, 0);
    const totalPrice = +(startPrice * size_coef + attrPrice).toFixed(1);
    return totalPrice * settings.global_price_coef
}

const getOverallCoef = (materialData: materialDataType, boxFromFinishMaterial: boolean): number => {
    const {box_material_coef, box_material_finish_coef, grain_coef, materials_coef} = materialData;
    const boxCoef = boxFromFinishMaterial ? box_material_finish_coef : box_material_coef;
    return +(boxCoef * materials_coef * grain_coef).toFixed(3);
}

const getAttributesProductPrices = (cart: CartAPIImagedType, product: ProductType, materialData: materialDataType): AttributesPrices => {
    const {legsHeight = 0, attributes, horizontal_line = 2, isAngle, category, id, product_type} = product;
    const {
        options,
        width,
        height,
        blind_width,
        image_active_number,
        middle_section,
        led,
        glass,
        custom
    } = cart;
    const {
        drawer_brand,
        drawer_type,
        drawer_color,
        door_type,
        is_leather_or_rta_closet
    } = materialData
    const productPriceData = getProductDataToCalculatePrice(product, drawer_brand, image_active_number);
    const {
        drawersQty,
        shelfsQty,
        rolloutsQty,
    } = productPriceData;
    const isWallCab = category === 'Wall Cabinets' || category === 'Gola Wall Cabinets' || category === 'Standard Wall Cabinets';
    const doorWidth = getWidthToCalculateDoor(width, blind_width, isAngle, isWallCab)
    const doorHeight = height - legsHeight - middle_section;
    const frontSquare = getSquare(doorWidth, doorHeight, id, is_leather_or_rta_closet);
    const hasGlassDoor = options.includes('Glass Door');
    const glassDoorProfile = glass?.door ? glass.door[0] : undefined;
    return {
        ptoDoors: options.includes('PTO for doors') ? addPTODoorsPrice(attributes, image_active_number) : 0,
        ptoDrawers: options.includes('PTO for drawers') ? addPTODrawerPrice(image_active_number, drawersQty) : 0,
        glassShelf: options.includes('Glass Shelf') ? addGlassShelfPrice(shelfsQty) : 0,
        ptoTrashBins: options.includes('PTO for Trash Bins') ? addPTOTrashBinsPrice() : 0,
        ledPrice: getLedPrice(width, height, led?.border),
        pvcPrice: getPvcPrice(doorWidth, doorHeight, product, materialData),
        doorPrice: getDoorPrice(frontSquare, materialData),
        glassDoor: addGlassDoorPrice(frontSquare, glassDoorProfile, product_type === "standard", hasGlassDoor),
        drawerPrice: getDrawerPrice(drawersQty + rolloutsQty, doorWidth, door_type, drawer_brand, drawer_type, drawer_color),
        closetAccessoriesPrice: getClosetAccessoriesPrice(custom?.accessories?.closet, width),
        jeweleryInsertsPrice: getJeweleryInsertsPrice(custom?.jewelery_inserts)
    }
}
const getSizeCoef = (cartItem: CartAPIImagedType, tablePriceData: pricePart[], product: ProductType): number => {
    const {category, isAngle, customHeight, customDepth} = product
    const {width, height, depth} = cartItem
    const productRange = getProductRange(tablePriceData, category, customHeight, customDepth);
    const {widthRange, heightRange, depthRange} = productRange
    let coef_w, coef_h, coef_d;
    coef_w = coef_h = coef_d = 0;
    const maxWidth = widthRange[widthRange.length - 1];
    const maxHeight = heightRange[heightRange.length - 1];
    if (maxWidth < width) coef_w = addWidthPriceCoef(width, maxWidth);
    if (maxHeight < height) coef_h = addHeightPriceCoef(height, maxHeight);
    if (depthRange[0] !== depth) coef_d = addDepthPriceCoef(depth, depthRange, isAngle);
    return 1 + (coef_w + coef_h + coef_d)
}

export const getRTAClosetCustomPartPrice = (rta_closet_custom: MaybeNull<RTAClosetAPIType[]>, materials: RoomMaterialsFormType): number => {
    if (!rta_closet_custom) return 0;
    const getItemPrice = (item: RTAClosetAPIType): number => {
        const {name, qty, width} = item;
        if (!qty || !name || !width) return 0;
        const getCoef = (materials: RoomMaterialsFormType): number => {
            const {box_material, box_color} = materials
            switch (box_material) {
                case "Milino":
                    const boxType = getBoxMaterialColorType(box_color)
                    if (boxType === 1) return 8;
                    if (boxType === 2) return 8.8;
                    if (boxType === 3) return 9.6;
                    return 9.2;
                case "Syncron":
                    return 18;
                case "Luxe":
                case "Zenit":
                case "Ultrapan PET":
                    return 24;
                case "Ultrapan Acrylic":
                    return 26.4;
                default:
                    return 0;
            }
        }
        const coef = getCoef(materials);
        switch (name) {
            case "SR":
                return width * 15 / 12;
            case "STK":
                return 1 + (width * 3 * coef) / 144;
            case "AS14":
                return width * 14 * coef / 144;
            case "AS18":
                return width * 18 * coef / 144;
            case "AS22":
                return width * 22 * coef / 144;
            case "FS14":
                return 5 + (width * 14 * coef) / 144
            case "FS18":
                return 5 + (width * 18 * coef) / 144
            case "FS22":
                return 5 + (width * 22 * coef) / 144
            case "SS14":
                return width + (width * 14 * coef) / 144
            case "SS18":
                return width + (width * 18 * coef) / 144
            case "SS22":
                return width + (width * 22 * coef) / 144;
            default:
                return 0
        }
    }
    return +(rta_closet_custom.reduce((acc, item) => acc + (getItemPrice(item) * item.qty), 0)).toFixed(2)
}

export const getCustomDoorsPrice = (area: number, id: number): number => {
    const coef = id === 924 ? 78 : 104
    return +(area * coef).toFixed(1);
}

export const getRibbedCustomPartPrice = (material: MaybeUndefined<string>, groove: MaybeUndefined<GrooveAPIType>, area: number): number => {
    const clearCoatPrice = groove?.clear_coat ? settings.fixPrices.clear_coat : 0;
    switch (material) {
        case "Painted":
            return area * (78 + clearCoatPrice)
        case "Maple":
        case "Birch":
            return area * (145 + clearCoatPrice)
        case "White Oak":
        case "Walnut":
            return area * (225 + clearCoatPrice)
    }
    return 0
}

export const getFloatingShelfCustomPartPrice = (material: MaybeUndefined<string>, area: number): number => {
    switch (material) {
        case "Milino":
            return area * 72;
        case "Syncron":
            return area * 86.4;
        case "Luxe":
        case "Ultrapan PET":
            return area * 102;
        case "Zenit":
            return area * 102 * 1.03;
        case "Ultrapan Acrylic":
            return area * 102 * 1.1;
        case "Painted":
            return area * 132.6;
        case "Wood Veneer":
            return area * 153;
    }
    return 0
}

export const getDrawerInsertsCustomPartPrice = (drawer: MaybeUndefined<DrawerInsertsType>, width: number): number => {
    if (!drawer || !width) return 0;
    const {box_type, color} = drawer;
    if (!color) return 0;
    let colorCoef: number = 0;
    switch (box_type) {
        case "Inserts":
            colorCoef = color === 'Maple' ? 5 : 9;
            break;
        case "Pegs":
            colorCoef = color === 'Maple' ? 4 : 8;
            break;
        case "Spice":
            colorCoef = color === 'Maple' ? 4 : 5;
            break;
    }
    return Math.round(width * colorCoef * 1.4);
}