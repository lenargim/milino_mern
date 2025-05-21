import {
    AngleType,
    AttributesPrices,
    attrItem,
    DoorColorType,
    materialDataType,
    MaybeNull,
    MaybeUndefined,
    priceItem,
    pricePart,
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
    getAttributes, getCabinetHeightRangeBasedOnCategory,
    getProductById,
    getSquare,
    getWidthToCalculateDoor
} from "./helpers";
import {fillCart, productChangeMaterialType,} from "../store/reducers/generalSlice";
import standardProductsPrices from '../api/standartProductsPrices.json'
import productPrices from '../api/prices.json'
import sizes from './../api/sizes.json'
import {MaterialsFormType} from "../common/MaterialsForm";
import {CartAPIImagedType, CartItemFrontType} from "../api/apiFunctions";
import {UnknownAction} from "@reduxjs/toolkit";
import {Dispatch} from "react";
import {updateCartAfterMaterialsChange} from "../store/reducers/roomSlice";

export const getTablePrice = (width: number, height: number, depth: number, priceData: pricePart[], category: productCategory): MaybeUndefined<number> => {
    const maxData = priceData[priceData.length - 1];
    switch (category) {
        case 'Base Cabinets':
        case "Vanities":
        case "Floating Vanities":
        case "Gola Floating Vanities":
        case "Gola Base Cabinets":
            // +1 to width cabinet
            const widthTablePrice: MaybeUndefined<number> = priceData.find(el => el.width + 1 >= width)?.price;
            if (widthTablePrice) return widthTablePrice;
            if (width > maxData.width + 1) return maxData.price;
            return undefined
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
        default:
            return undefined;
    }
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

export function addDepthPriceCoef(customDepth: number, depthRangeData: number[], isAngle: AngleType) {
    if (isAngle) return 0;
    const maxDepth = depthRangeData[depthRangeData.length - 1];
    if (customDepth > maxDepth) {
        return Math.ceil((customDepth - maxDepth - 1) / 3) / 10
    }
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

export function addGlassDoorPrice(square: number, profileName: string, is_standard: boolean, hasGlassDoor: boolean): number {
    if (!hasGlassDoor) return 0;
    if (is_standard) return square * 10;

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
    if (attributes[0].values.length < 2) return 1;

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

function getPvcPrice(doorWidth: number, doorHeight: number, isAcrylic = false, horizontal_line: number, doorType: string, doorFinish: string, isProductStandard:boolean, is_leather_closet:boolean): number {
    if (doorType === 'No Doors' || doorFinish === 'Milino' || isProductStandard || is_leather_closet) return 0;
    const per = (horizontal_line * doorWidth + doorHeight * 2) / 12;
    const pvcPrice = per * 2.5;
    return +(isAcrylic ? pvcPrice * 1.1 : pvcPrice).toFixed(1)
}

function getDoorPrice(square: number, materialData: materialDataType, isProductStandard: boolean): number {
    if (isProductStandard) return 0;
    const {
        door_price_multiplier,
        is_leather_closet,
        box_material,
        box_color,
    } = materialData;
    if (is_leather_closet) {
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
        case "Painted":
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
        default:
            return 0;
    }
}

function getShakerPanelPrice(square: number, door_finish_material: MaybeUndefined<string>): number {
    switch (door_finish_material) {
        case "Milino":
            return square * 36;
        case "Syncron":
            return square * 48;
        case "Luxe":
        case "Ultrapan PET":
            return square * 60;
        case "Ultrapan Acrylic":
            return square * 60 * 1.1;
        case "Zenit":
            return square * 60 * 1.03;
        case 'Painted':
            return square * 78;
        case "Micro Shaker":
            return square * 60
        default:
            return 0;
    }
}

function getSlattedPanelPrice(square: number): number {
    return square * 48;
}

function getDrawerPrice(qty: number, width: number, door_type: string, drawerBrand: string, drawerType: string, drawerColor: string): number {
    const isStandardCabinet = door_type === 'Standard White Shaker'
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

const getBasePriceType = (materials: MaterialsFormType, is_leather_closet: boolean): pricesTypings => {
    const {door_type, door_color, door_finish_material, box_material} = materials;
    if (is_leather_closet) {
        if (box_material === 'Milino') return 1;
        if (box_material === 'Syncron') return 2;
        return 3
    } else {
        switch (door_type) {
            case 'Slab':
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
        }
        return 3;
    }
}

const getMaterialCoef = (materials: MaterialsFormType, is_leather_closet: boolean): number => {
    const {door_type, door_finish_material, door_color, box_material, box_color} = materials;

    if (!is_leather_closet) {
        switch (door_type) {
            case 'Slab':
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
                if (door_finish_material === 'Zenit') return 1.03;
                break;
            case 'Painted':
                return 1.05;
            case 'Micro Shaker':
                if (door_finish_material === 'Zenit') return 1.03;
                if (door_finish_material === 'Ultrapan Acrylic') return 1.1;
                break;
            case 'Slatted':
                return 1.03;
        }
    } else {
        switch (box_material) {
            case 'Milino': {
                const boxColorType = getDoorColorType(box_color)
                if (boxColorType === 2) return 1.1;
                if (boxColorType === 3) return 1.2;
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

const getDoorColorType = (color: string): DoorColorType => {
    if (color.includes('Melamine')) return 1;
    if (['Brown Oak', 'Grey Woodline', 'Ivory Woodline'].includes(color)) return 2;
    if (color.includes('Ultra Matte')) return 3;
    return 1
};

const getBoxMaterialCoef = (box_material: string, is_standard_cabinet: boolean): number => {
    if (is_standard_cabinet) return box_material.includes('Plywood') ? 1.1 : 1;
    if (['Brown Oak', 'Grey Woodline', 'Ivory Woodline'].includes(box_material)) return 1.1;
    if (box_material.includes('Plywood') || box_material.includes('Ultra Matte')) return 1.2;
    return 1;
}

const getBoxMaterialFinishCoef = (doorFinish: string, is_standard_cabinet: boolean, box_material: string): number => {
    if (is_standard_cabinet) return 1;
    if (doorFinish === 'Milino') {
        if (['Brown Oak', 'Grey Woodline', 'Ivory Woodline'].includes(box_material)) return 1.1;
        if (box_material.includes('Ultra Matte')) return 1.2;
    }
    return doorFinish === 'Syncron' ? 1.845 : 2.706
}
const getDoorPriceMultiplier = (materials: MaterialsFormType, is_standard_cabinet: boolean, is_leather_closet: boolean): number => {
    const {door_type, door_finish_material, door_color} = materials
    if (is_standard_cabinet) return door_color === 'Default White' ? 0 : 30;
    if (!is_leather_closet) {
        switch (door_type) {
            case "Slab":
                return 0;
            case "No Doors":
                return -8;
            case "Five piece shaker":
            case "Three Piece Door":
            case "Finger Pull":
                if (door_finish_material === 'Syncron') return 30;
                return 36;
            case "Painted":
                return 37.8;
            case "Micro Shaker":
                if (door_finish_material === 'Milino') return 30;
                return 36;
            case "Slatted":
                if (door_finish_material === 'Milino') return 31.5;
                return 37.8;
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
export const getMaterialData = (materials: MaterialsFormType): materialDataType => {
    const {
        box_material,
        door_type,
        door_grain,
        door_finish_material,
        category,
        drawer_brand,
        drawer_type,
        drawer_color,
        leather,
        box_color
    } = materials;

    const is_standard_cabinet = door_type === "Standard White Shaker";
    const is_leather_closet = category === 'Leather Closet'
    const is_acrylic = door_finish_material === 'Ultrapan Acrylic';
    const base_price_type = getBasePriceType(materials, is_leather_closet);
    const materials_coef = getMaterialCoef(materials, is_leather_closet);
    const grain_coef = getGrainCoef(door_grain);
    const box_material_coef = getBoxMaterialCoef(box_material, is_standard_cabinet);
    const box_material_finish_coef = getBoxMaterialFinishCoef(door_finish_material, is_standard_cabinet, box_material);
    const door_price_multiplier = getDoorPriceMultiplier(materials, is_standard_cabinet, is_leather_closet);

    return {
        is_standard_cabinet,
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
        is_leather_closet,
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
export const getCustomPartPrice = (id: number, width: number, height: number, depth: number, material: MaybeUndefined<string>, profile: string): number => {
    const area = +(width * height / 144).toFixed(2);
    switch (id) {
        case 900:
            switch (material) {
                case "Milino":
                    return (width * height * depth / 100) + 120;
                case "Plywood":
                    return (width * height * depth / 80) + 120;
                case "Syncron":
                    return (width * height * depth / 50) + 120;
                case "Luxe":
                case "Ultrapan PET":
                    return (width * height * depth / 20) + 120;
                case "Ultrapan Acrylic":
                    return ((width * height * depth / 20) + 120) * 1.1;
                case "Zenit":
                    return ((width * height * depth / 20) + 120) * 1.03;
                case "Painted":
                    return ((width * height * depth / 20) + 120) * 1.3 * 1.05;
                default:
                    return 0;
            }
        case 901:
            const opetCabinetCoef = (width * height + width * depth + height * depth) / 144 * 2 * 2.3
            switch (material) {
                case "Milino":
                    return opetCabinetCoef * 20
                case "Syncron":
                    return opetCabinetCoef * 22
                case "Luxe":
                case "Ultrapan PET":
                    return opetCabinetCoef * 24
                case "Ultrapan Acrylic":
                    return opetCabinetCoef * 24 * 1.1
                case "Zenit":
                    return opetCabinetCoef * 24 * 1.03
                case "Painted":
                    return opetCabinetCoef * 31.2 * 1.05
                default:
                    return 0;
            }
        case 903:
            return getPanelPrice(area, material);
        case 905:
            switch (material) {
                case "Milino":
                    return area * 36;
                case "Plywood":
                    return area * 40;
                case "Syncron":
                    return area * 48;
                case "Luxe":
                case "Ultrapan PET":
                    return area * 60;
                case "Ultrapan Acrylic":
                    return area * 60 * 1.1;
                case "Zenit":
                    return area * 60 * 1.03;
                case "Painted":
                    return area * 78;
                default:
                    return 0;
            }
        case 906:
            const lSHapeArea = (width + depth) * height / 144
            switch (material) {
                case "Milino":
                    return lSHapeArea * 19;
                case "Plywood":
                    return lSHapeArea * 21;
                case "Syncron":
                    return lSHapeArea * 39;
                case "Luxe":
                case "Ultrapan PET":
                    return lSHapeArea * 58;
                case "Ultrapan Acrylic":
                    return lSHapeArea * 58 * 1.1;
                case "Zenit":
                    return lSHapeArea * 58 * 1.03;
                case "Painted":
                    return lSHapeArea * 74.4;
                default:
                    return 0;
            }
        case 907:
            const columnArea = (width * height + width * depth + height * depth) / 144 * 2 * 2.3;
            switch (material) {
                case "Milino":
                    return columnArea * 15.2;
                case "Syncron":
                    return columnArea * 16.8;
                case "Luxe":
                case "Ultrapan PET":
                    return columnArea * 18.4;
                case "Ultrapan Acrylic":
                    return columnArea * 18.4 * 1.1;
                case "Zenit":
                    return columnArea * 18.4 * 1.03;
                case "Painted":
                    return columnArea * 23.92;
                default:
                    return 0;
            }
        case 909:
            return width * height / 144 * 4.6
        case 910:
            return getShakerPanelPrice(area, material)
        case 911:
            let decorPrice = area > 4 ? area * 64 : 240;
            return material === 'Ultrapan Acrylic' ? decorPrice * 1.1 : decorPrice
        case 912:
            return getSlattedPanelPrice(area);
        case 913:
            let shakerDoorPrice = area * 80 > 240 ? area * 80 : 240;
            return material === 'Ultrapan Acrylic' ? shakerDoorPrice * 1.1 : shakerDoorPrice
        case 914:
            return addGlassDoorPrice(area, profile, false, true)
        case 915:
            return material === 'Ultrapan Acrylic' ? Math.ceil(width * 1.1) : Math.ceil(width);
        case 916:
            return 170;
        default:
            return 0
    }
}
const getShelfsQty = (attrArr: { name: string, value: number }[]): number => {
    return attrArr.find(el => el.name === 'Adjustable Shelf')?.value ?? 0;
}
export const checkCartData = (cart: CartItemFrontType[], values: MaterialsFormType, dispatch: Dispatch<UnknownAction>) => {
    const roomId = cart[0].room_id;
    const updatedPriceCart = cart.map(cartItem => {
        const {product_id, product_type} = cartItem;
        const product = getProductById(product_id, product_type === 'standard');
        if (!product) return cartItem;
        const {category} = product
        if (category === 'Custom Parts') return cartItem;
        const materialData = getMaterialData(values)
        const {
            is_standard_cabinet,
            base_price_type
        } = materialData;

        const tablePriceData = getProductPriceRange(product_id, is_standard_cabinet, base_price_type);
        if (!tablePriceData) return cartItem;
        const sizeLimit: MaybeUndefined<sizeLimitsType> = sizes.find(size => size.productIds.includes(product_id))?.limits;
        if (!sizeLimit) return cartItem;
        const totalPrice = calculateProduct(cartItem, materialData, tablePriceData, sizeLimit, product);
        return {...cartItem, price:totalPrice};
    });
    roomId ?
        dispatch(updateCartAfterMaterialsChange({cart: updatedPriceCart, room: roomId})) :
        dispatch(fillCart(updatedPriceCart));
}

export const calculateProduct = (cabinetItem: CartAPIImagedType, materialData: materialDataType, tablePriceData: pricePart[], sizeLimit: sizeLimitsType, product: ProductType): number => {
    const {product_id, width, height, depth, options} = cabinetItem;
    const {category} = product;
    const boxFromFinishMaterial = options.includes("Box from finish material");
    const overall_coef = getOverallCoef(materialData, boxFromFinishMaterial, product_id)
    const tablePrice = getTablePrice(width, height, depth, tablePriceData, category);
    const startPrice = getStartPrice(width, height, depth, overall_coef, sizeLimit, tablePrice);
    const size_coef = getSizeCoef(cabinetItem, tablePriceData, product);
    const attributesPrices = getAttributesProductPrices(cabinetItem, product, materialData);
    const attrPrice = Object.values(attributesPrices).reduce((partialSum, a) => partialSum + a, 0);
    // console.log(materialData)
    // console.log(`overall_coef ${overall_coef}`)
    return +(startPrice * size_coef + attrPrice).toFixed(1);
}

const getOverallCoef = (materialData: materialDataType, boxFromFinishMaterial: boolean, product_id: number): number => {
    const {box_material_coef, box_material_finish_coef, is_standard_cabinet, grain_coef, materials_coef} = materialData;
    // Exceptions
    const noCoefExceptionsArr: number[] = [35];
    if (noCoefExceptionsArr.includes(product_id)) return 1;
    const boxCoef = boxFromFinishMaterial ? box_material_finish_coef : box_material_coef;
    return !is_standard_cabinet ? +(boxCoef * materials_coef * grain_coef).toFixed(3) : 1;
}
const getAttributesProductPrices = (cart: CartAPIImagedType, product: ProductType, materialData: materialDataType): AttributesPrices => {
    const {legsHeight, attributes, isProductStandard, horizontal_line = 2, isAngle, category, id} = product;
    const {
        options,
        width,
        height,
        blind_width,
        image_active_number,
        middle_section,
        led,
        glass
    } = cart;
    const {
        is_acrylic,
        drawer_brand,
        drawer_type,
        drawer_color,
        door_finish_material,
        door_type,
        is_leather_closet
    } = materialData
    const productPriceData = getProductDataToCalculatePrice(product, drawer_brand,image_active_number);
    const {
        drawersQty,
        shelfsQty,
        rolloutsQty,
    } = productPriceData;
    const isWallCab = category === 'Wall Cabinets' || category === 'Gola Wall Cabinets' || category === 'Standard Wall Cabinets';
    const doorWidth = getWidthToCalculateDoor(width, blind_width, isAngle, isWallCab)
    const doorHeight = height - legsHeight - middle_section;
    const frontSquare = getSquare(doorWidth, doorHeight, id, is_leather_closet);
    const hasGlassDoor = options.includes('Glass Door');

    return {
        ptoDoors: options.includes('PTO for doors') ? addPTODoorsPrice(attributes, image_active_number) : 0,
        ptoDrawers: options.includes('PTO for drawers') ? addPTODrawerPrice(image_active_number, drawersQty) : 0,
        glassShelf: options.includes('Glass Shelf') ? addGlassShelfPrice(shelfsQty) : 0,
        ptoTrashBins: options.includes('PTO for Trash Bins') ? addPTOTrashBinsPrice() : 0,
        ledPrice: getLedPrice(width, height, led.border),
        pvcPrice: getPvcPrice(doorWidth, doorHeight, is_acrylic, horizontal_line, door_type, door_finish_material,isProductStandard,is_leather_closet),
        doorPrice: getDoorPrice(frontSquare, materialData, isProductStandard),
        glassDoor: addGlassDoorPrice(frontSquare, glass.door[0], isProductStandard, hasGlassDoor),
        drawerPrice: getDrawerPrice(drawersQty + rolloutsQty, doorWidth, door_type, drawer_brand, drawer_type, drawer_color),
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