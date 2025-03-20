import {
    AngleType,
    AttributesPrices,
    attrItem,
    BoxMaterialType,
    hingeArr,
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
    profileItem,
    sizeLimitsType,
    valueItemType
} from "./productTypes";
import settings from './../api/settings.json'
import {
    getAttributes,
    getFinishColorCoefCustomPart,
    getProductById,
    getSquare,
    getWidthToCalculateDoor
} from "./helpers";
import {fillCart, productChangeMaterialType,} from "../store/reducers/generalSlice";
import standardProductsPrices from '../api/standartProductsPrices.json'
import productPrices from '../api/prices.json'
import sizes from './../api/sizes.json'
import {MaterialsFormType} from "../common/MaterialsForm";
import {CabinetItemType, CartItemType} from "../api/apiFunctions";
import {UnknownAction} from "@reduxjs/toolkit";
import {Dispatch} from "react";
import {updateCartAfterMaterialsChange} from "../store/reducers/roomSlice";

export type coefType = {
    width: number,
    height: number,
    depth: number
}
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

export function getStartPrice(customWidth: number, customHeight: number, customDepth: number, materialsCoef: number, sizeLimit: sizeLimitsType, tablePrice: MaybeUndefined<number>): number {
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

export function addPTODoorsPrice(attributes: attrItem[], prodType: productTypings): number {
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

export function addGlassDoorPrice(square: number = 0, profileVal: any, is_standard: boolean): number {
    if (is_standard) return +(square * 10).toFixed(1);
    const glassDoor = settings["Glass"];
    const {Profile, priceType} = glassDoor
    const profileData: MaybeUndefined<profileItem> = Profile.find(el => el.value === profileVal)
    const glassDoorType = profileData && profileData?.glassDoorType;
    const settingItem = (glassDoorType && priceType.find(el => el.id === glassDoorType)) || undefined
    const minPrice = settingItem?.minPrice
    const multiplier = settingItem?.multiplier
    if (minPrice && multiplier) {
        const price = square * multiplier;
        return +(price > minPrice ? price : minPrice).toFixed(1)
    }
    return 0
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

export function getPvcPrice(doorWidth: number, doorHeight: number, isAcrylic = false, horizontal_line: number, doorType?: string, doorFinish?: string): number {
    if (doorType === 'No Doors' || doorFinish === 'Milino') return 0;
    const per = (horizontal_line * doorWidth + doorHeight * 2) / 12;
    const pvcPrice = per * 2.5;
    return +(isAcrylic ? pvcPrice * 1.1 : pvcPrice).toFixed(1)
}

export function getDoorPrice(square: number, materialData: materialDataType): number {
    const {door_price_multiplier, is_leather_closet, door_finish_material, box_material, door_type, } = materialData;
    if (is_leather_closet) {
        const oldPrice = chooseDoorPanelPrice(square, box_material, 'Slab')
        const newPrice = chooseDoorPanelPrice(square, door_finish_material, door_type)
        console.log(`oldPrice: ${oldPrice}`);
        console.log(`newPrice ${newPrice}`);
        return newPrice > oldPrice ? newPrice-oldPrice : 0;
    }
    return +(square * door_price_multiplier).toFixed(1);
}

function chooseDoorPanelPrice(square: number, material: string, door_type: string): number {
    switch (door_type) {
        case 'Slab':
            return getPanelPrice(square, material);
        case 'Micro Shaker':
            return getShakerPanelPrice(square, 'Micro Shaker');
        case 'Shaker':
        case 'Painted':
            return getShakerPanelPrice(square, material);
        case 'Slatted':
            return getSlattedPanelPrice(square)
        default:
            return getPanelPrice(square, material);
    }
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
        case "Ultrapan Acrilic":
            return square * k * 24 * 1.1;
        case "Zenit":
            return square * k * 24 * 1.03;
        case "Stone":
            return square * k * 31.2 * 2;
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
        case "Ultrapan Acrilic":
            return square * 60 * 1.1;
        case "Zenit":
            return square * 60 * 1.03;
        case "Stone":
            return square * 78 * 2;
        case 'Frame 3/4':
        case 'Frame 1':
        case 'Frame 1 1/2':
        case 'Frame 2':
        case 'Frame 2 1/2':
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

export function getDrawerPrice(qty: number, width: number, door_type: string, drawerBrand: string, drawerType: string, drawerColor: string): number {
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

export function getWidthRange(priceData: MaybeUndefined<pricePart[]>): number[] {
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
    switch (category) {
        case 'Base Cabinets':
        case "Vanities":
        case "Floating Vanities":
        case "Gola Floating Vanities":
        case "Gola Base Cabinets":
        case "Standard Base Cabinets":
            return [34.5];
        default:
            return []
    }
}

export function getDepthRange(priceData: pricePart[] | undefined, category: productCategory, customDepth: number | undefined): number[] {
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

export function getBlindArr(category: string, product_id: number): number[] {
    type rangeType = {
        [key: string]: number
    }
    const range: rangeType = settings.blindRange;
    //Wall corner Exceptions
    const wallProductExceptionsArr: number[] = [109, 110, 113, 114];
    if (wallProductExceptionsArr.includes(product_id)) return [13, 0];
    // Base Cabinet Exceptions
    const baseProductExceptionsArr: number[] = [23, 24, 25, 26, 51, 52];
    if (baseProductExceptionsArr.includes(product_id)) return [24, 0];
    return range[category] ? [range[category], 0] : [0];
}

export function getHingeArr(doorArr: number[], product_id: number): string[] {
    const [left, right, double, left_2, right_2, single_left, single_right, four] = hingeArr;
    let arr: string[] = [];
    const no_hinge: number[] = [5, 6, 7, 42, 43, 44, 104, 105, 108, 208, 211, 216];
    const tall_type_1: number[] = [201, 202, 203, 204, 214, 215];
    const tall_type_2: number[] = [212, 213];
    const tall_type_3: number[] = [205, 206];
    const tall_type_4: number[] = [217, 218, 219, 220];

    if (no_hinge.includes(product_id)) return arr;
    if (tall_type_1.includes(product_id)) {
        if (doorArr.includes(2)) arr.push(left_2, right_2, single_left, single_right);
        if (doorArr.includes(4)) arr.push(double, four)
        return arr;
    } else if (tall_type_2.includes(product_id)) {
        return [left, right, double]
    } else if (tall_type_3.includes(product_id)) {
        return [left_2, right_2, single_left, single_right]
    } else if (tall_type_4.includes(product_id)) {
        return [left, right]
    }
    // Basic
    if (doorArr.includes(1)) arr.push(left, right);
    if (doorArr.includes(2)) arr.push(double);
    if (doorArr.includes(4) && !doorArr.includes(2)) arr.push(double, four)
    return arr;
}

export function getLedPrice(realWidth: number, realHeight: number, ledBorders: MaybeUndefined<string[]>): number {
    if (!ledBorders || !ledBorders.length) return 0;
    let sum: number = 0;
    if (ledBorders.includes('Sides')) sum = realHeight * 2 * 2.55
    if (ledBorders.includes('Top')) sum += (realWidth - 1.5) * 2.55
    if (ledBorders.includes('Bottom')) sum += (realWidth - 1.5) * 2.55
    return Math.round(sum)
}

export const getBasePriceType = (materials: MaterialsFormType, is_leather_closet: boolean): pricesTypings => {
    const {door_type, door_color, door_finish_material, box_material} = materials;
    if (is_leather_closet) {
        if (box_material === 'Milino') return 1;
        if (box_material === 'Syncron') return 2;
        return 3
    }
    if (!door_type || !door_finish_material || door_finish_material.includes('No Doors')) return 1;
    if (door_finish_material === 'Milino') {
        if (door_type === 'Slab') {
            const colorType = getBoxMaterialType(door_color, false);
            switch (colorType) {
                case 4:
                    return 2;
                default:
                    return 1
            }
        }
        return 2;
    }
    if (door_finish_material === 'Syncron') return 2
    return 3
}

export const getMaterialCoef = (materials: MaterialsFormType, box_material_type: BoxMaterialType, base_price_type: pricesTypings): number => {
    const {door_finish_material, door_type} = materials;
    if (door_finish_material === 'Milino') {
        if (door_type === 'Slab') {
            switch (box_material_type) {
                case 3:
                    return 1.05;
                default:
                    return 1;
            }
        }
    }
    if (base_price_type === 1 || !door_type || !door_finish_material || door_type === 'Micro Shaker') return 1;
    if (door_type === 'Painted') return 1.05;
    if (door_type === 'Slatted') return 1.03
    if (door_finish_material === 'Stone') return 1.69
    if (door_finish_material === 'Zenit') return 1.03
    if (door_finish_material === 'Ultrapan Acrylic') return 1.1
    return 1
}

export const getMaterialCoefLeather = (materials: MaterialsFormType, box_material_type: BoxMaterialType): number => {
    const {box_material} = materials;
    if (box_material === 'Milino') {
        switch (box_material_type) {
            case 2:
                return 1;
            case 3:
                return 1.1;
            case 4:
                return 1.2;
            default:
                return 1
        }
    }
    if (box_material === 'Zenit') return 1.03;
    if (box_material === 'Ultrapan Acrylic') return 1.1;
    return 1;
}

export const getGrainCoef = (doorGrain: string): number => {
    return doorGrain === 'Horizontal' ? 1.1 : 1
}
export const getBoxMaterialType = (box_material: string, is_standard_cabinet: boolean): BoxMaterialType => {
    if (box_material.includes('Plywood')) return is_standard_cabinet ? 3 : 1;
    if (box_material.includes('Melamine')) return 2;
    if (['Brown Oak', 'Grey Woodline', 'Ivory Woodline'].includes(box_material)) return 3;
    if (box_material.includes('Ultra Matte')) return 4;
    return 1
};
export const getLeatherBoxMaterialType = (box_color: string): BoxMaterialType => {
    if (box_color.includes('Plywood')) return 1;
    if (box_color.includes('Melamine')) return 2;
    if (['Brown Oak', 'Grey Woodline', 'Ivory Woodline'].includes(box_color)) return 3;
    if (box_color.includes('Ultra Matte')) return 4;
    return 1
};
export const getBoxMaterialCoef = (box_material_type: BoxMaterialType): number => {
    switch (box_material_type) {
        case 2:
            return 1;
        case 3:
            return 1.1;
        case 1:
            return 1.15;
        case 4:
            return 1.2;
    }
    return 1;
}
export const getBoxMaterialFinishCoef = (doorFinish: string, doorType: string, is_standard_cabinet: boolean, door_color: string): number => {
    if (is_standard_cabinet) return 1;
    if (doorFinish === 'Milino') {
        const colorType = getBoxMaterialType(door_color, is_standard_cabinet);
        return getBoxMaterialCoef(colorType)
    }
    return doorFinish === 'Syncron' ? 1.845 : 2.706
}
export const getDoorPriceMultiplier = (doorType: string, doorFinish: string, door_color: string, is_standard_cabinet: boolean): number => {
    if (is_standard_cabinet) return door_color === 'Default White' ? 0 : 30;
    if (doorType === 'Slab') return 0;
    if (doorFinish === 'Milino' && (doorType === 'Micro Shaker' || doorType === 'Slatted')) return 30
    if (doorType === 'Painted' || doorType === 'Slatted') return 37.8
    if (doorType === 'Micro Shaker') return 36
    if (doorType === 'No Doors') return -8
    if (doorFinish === 'Syncron') return 30
    if (doorFinish === 'Luxe') return 36
    if (doorFinish === 'Zenit') return (36 * 1.03)
    return 0
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
        door_color,
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
    const box_material_type = is_leather_closet ? getLeatherBoxMaterialType(box_color) : getBoxMaterialType(box_material, is_standard_cabinet);
    const base_price_type = getBasePriceType(materials, is_leather_closet);
    const material_coef = is_leather_closet ? getMaterialCoefLeather(materials, box_material_type) : getMaterialCoef(materials, box_material_type, base_price_type);
    const grain_coef = door_grain ? getGrainCoef(door_grain) : 1;
    const box_material_coef = getBoxMaterialCoef(box_material_type);
    const box_material_finish_coef = getBoxMaterialFinishCoef(door_finish_material, door_type, is_standard_cabinet, door_color);
    const door_price_multiplier = getDoorPriceMultiplier(door_type, door_finish_material, door_color, is_standard_cabinet);
    return {
        is_standard_cabinet,
        category,
        base_price_type,
        material_coef,
        grain_coef,
        box_material_coef,
        box_material_finish_coef,
        door_price_multiplier,
        is_acrylic,
        door_type,
        door_finish_material,
        drawer_brand,
        drawer_type,
        drawer_color,
        leather,
        is_leather_closet,
        box_material
    }
}
export const getProductDataToCalculatePrice = (product: ProductType | productChangeMaterialType, drawerBrand: MaybeUndefined<string>, image_active_number: productTypings = 1): productDataToCalculatePriceType => {
    const {
        attributes,
        options,
    } = product;

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
export const getCustomPartPrice = (id: number, width: number, height: number, depth: number, material: MaybeUndefined<string>, profile: MaybeNull<number> = null): number => {
    const area = width * height / 144;
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
                case "Ultrapan Acrilic":
                    return ((width * height * depth / 20) + 120) * 1.1;
                case "Zenit":
                    return ((width * height * depth / 20) + 120) * 1.03;
                case "Stone":
                    return ((width * height * depth / 20) + 120) * 1.3 * 2;
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
                case "Ultrapan Acrilic":
                    return opetCabinetCoef * 24 * 1.1
                case "Zenit":
                    return opetCabinetCoef * 24 * 1.03
                case "Stone":
                    return opetCabinetCoef * 31.2 * 2
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
                case "Ultrapan Acrilic":
                    return area * 60 * 1.1;
                case "Zenit":
                    return area * 60 * 1.03;
                case "Stone":
                    return area * 78 * 2;
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
                case "Ultrapan Acrilic":
                    return lSHapeArea * 58 * 1.1;
                case "Zenit":
                    return lSHapeArea * 58 * 1.03;
                case "Stone":
                    return lSHapeArea * 75.4 * 2;
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
                case "Ultrapan Acrilic":
                    return columnArea * 18.4 * 1.1;
                case "Zenit":
                    return columnArea * 18.4 * 1.03;
                case "Stone":
                    return columnArea * 23.92 * 2;
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
            return material === 'Ultrapan Acrilic' ? decorPrice * 1.1 : decorPrice
        case 912:
            return getSlattedPanelPrice(area);
        case 913:
            let shakerDoorPrice = area * 80 > 240 ? area * 80 : 240;
            return material === 'Ultrapan Acrilic' ? shakerDoorPrice * 1.1 : shakerDoorPrice
        case 914:
            switch (profile) {
                case 1021:
                case 1040:
                    return area * 100 > 300 ? area * 100 : 300
                case 1022:
                case 1042:
                    return area * 120 > 300 ? area * 120 : 300
                default:
                    return 0;
            }
        case 915:
            return material === 'Ultrapan Acrilic' ? Math.ceil(width * 1.1) : Math.ceil(width);
        case 916:
            return 170;
        default:
            return 0
    }
}
export const getShelfsQty = (attrArr: { name: string, value: number }[]): number => {
    return attrArr.find(el => el.name === 'Adjustable Shelf')?.value ?? 0;
}
export const checkCartData = (cart: CartItemType[], values: MaterialsFormType, dispatch: Dispatch<UnknownAction>) => {
    const roomId = cart[0].room;
    const updatedPriceCart = cart.map(cartItem => {
        const {product_id, height, width, depth, options, product_type} = cartItem;
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
        const boxFromFinishMaterial = options.includes("Box from finish material");
        const materialsCoef = getMaterialsCoef(materialData, boxFromFinishMaterial)
        const tablePrice = getTablePrice(width, height, depth, tablePriceData, category);
        const startPrice = getStartPrice(width, height, depth, materialsCoef, sizeLimit, tablePrice);
        const coef = getProductCoef(cartItem, tablePriceData, product);
        const productCoef = 1 + (coef.width + coef.height + coef.depth)
        const attributesPrices = getAttributesProductPrices(cartItem, product, materialData);
        const attrPrice = Object.values(attributesPrices).reduce((partialSum, a) => partialSum + a, 0);
        const price = +(startPrice * productCoef + attrPrice).toFixed(1);
        return {...cartItem, price};
    });
    roomId ?
        dispatch(updateCartAfterMaterialsChange({cart: updatedPriceCart, room: roomId})) :
        dispatch(fillCart(updatedPriceCart));
}
export const getMaterialsCoef = (materialData: materialDataType, boxFromFinishMaterial: boolean,): number => {
    const {box_material_finish_coef, box_material_coef, is_standard_cabinet, material_coef, grain_coef} = materialData
    const boxCoef = boxFromFinishMaterial ? box_material_finish_coef : box_material_coef;
    return !is_standard_cabinet ? +(boxCoef * material_coef * grain_coef).toFixed(3) : 1;
}
export const getAttributesProductPrices = (cart: CabinetItemType, product: ProductType, materialData: materialDataType): AttributesPrices => {
    const {legsHeight, attributes, isProductStandard, horizontal_line = 2, isAngle, category, id} = product;
    const {
        door_option,
        options,
        width,
        height,
        led_border,
        blind_width,
        image_active_number,
        middle_section,
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
    const productPriceData = getProductDataToCalculatePrice(product, drawer_brand);
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
        ledPrice: getLedPrice(width, height, led_border),
        pvcPrice: (isProductStandard || is_leather_closet) ? 0 : getPvcPrice(doorWidth, doorHeight, is_acrylic, horizontal_line, door_type, door_finish_material),
        doorPrice: getDoorPrice(frontSquare, materialData),
        glassDoor: hasGlassDoor ? addGlassDoorPrice(frontSquare, door_option[0], isProductStandard) : 0,
        drawerPrice: getDrawerPrice(drawersQty + rolloutsQty, doorWidth, door_type, drawer_brand, drawer_type, drawer_color),
    }
}
export const getProductCoef = (cartItem: CabinetItemType, tablePriceData: pricePart[], product: ProductType): coefType => {
    const {category, isAngle, customHeight, customDepth} = product
    const {width, height, depth} = cartItem
    const productRange = getProductRange(tablePriceData, category, customHeight, customDepth);
    const {widthRange, heightRange, depthRange} = productRange
    const coef: coefType = {
        width: 0,
        height: 0,
        depth: 0
    }
    const maxWidth = widthRange[widthRange.length - 1];
    const maxHeight = heightRange[heightRange.length - 1];
    if (maxWidth < width) coef.width = addWidthPriceCoef(width, maxWidth);
    if (maxHeight < height) coef.height = addHeightPriceCoef(height, maxHeight);
    if (depthRange[0] !== depth) coef.depth = addDepthPriceCoef(depth, depthRange, isAngle);
    return coef;
}