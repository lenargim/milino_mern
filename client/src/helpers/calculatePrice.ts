import {
    attrItem,
    drawerInterface,
    extraPricesType, extraStandardPricesType,
    getBoxMaterialCoefsType, hingeArr,
    materialDataType, priceItem,
    pricePart,
    pricesTypings,
    productCategory, productDataToCalculatePriceType, productPricesType,
    productRangeType, productSizesType, ProductType,
    productTypings,
    profileItem,
    sizeLimitsType, StandardMaterialDataType, valueItemType
} from "./productTypes";
import prices from './../api/prices.json';
import pricesGola from '../api/no-pricesGola.json'
import pricesCloset from '../api/no-pricesClosets.json'
import settings from './../api/settings.json'
import {getAttributes, getSquare, isHasLedBlock} from "./helpers";
import {OrderFormType} from "./types";
import {
    CartItemType,
    productChangeMaterialType,
    updateCartItemPrice,
} from "../store/reducers/generalSlice";
import standardProductsPrices from '../api/standartProductsPrices.json'
import productPrices from '../api/prices.json'
import sizes from './../api/sizes.json'
import {MaybeUndefined} from "../Components/Profile/RoomForm";
import {RoomTypeAPI} from "../store/reducers/roomSlice";

export type coefType = {
    width: number,
    height: number,
    depth: number
}

type calculatePriceType = {
    totalPrice: number,
    coef: coefType
    coefExtra: number
}

type calculateStandardPriceType = {
    totalPrice: number,
    coefDepth: number,
    coefExtra: number
}

export const getPriceData = (id: number, category: productCategory, basePriceType: pricesTypings): pricePart[] | undefined => {
    type apiPartType = {
        id: number,
        prices: priceItem[]
    }
    let api;
    switch (category) {
        case "Gola Base Cabinets":
        case "Gola Wall Cabinets":
        case "Gola Tall Cabinets":
            api = pricesGola as apiPartType[]
            break;
        case "Build In":
        case "Leather":
            api = pricesCloset as apiPartType[]
            break
        default:
            api = prices as apiPartType[];
    }
    const productPrices = api && api.find(el => el.id === id)?.prices;
    return productPrices && productPrices.find(el => el.type === basePriceType)?.data;
}

export const getInitialPrice = (priceData: pricePart[], productRange: productRangeType, category: productCategory, coefs: number): number => {
    let price;
    switch (category) {
        case 'Base Cabinets':
        case "Regular Vanities":
        case "Gola Vanities":
        case "Custom Parts":
        case "Gola Base Cabinets":
        case "Leather":
        case "Standard Base Cabinets":
            price = priceData.find(el => el.width === productRange.widthRange[0])?.price;
            break
        case 'Wall Cabinets':
        case 'Tall Cabinets':
        case "Gola Wall Cabinets":
        case "Gola Tall Cabinets":
        case "Build In":
        case "Standard Wall Cabinets":
        case "Standard Tall Cabinets":
            price = priceData.find(el => el.width === productRange.widthRange[0] && el.height === productRange.heightRange[0])?.price;
            break
    }
    return price ? +(price * coefs).toFixed(1) : 0
}


export const getTablePrice = (width: number, height: number, depth: number, priceData: pricePart[], category: productCategory): number | undefined => {
    const maxData = priceData[priceData.length - 1];
    switch (category) {
        case 'Base Cabinets':
        case "Regular Vanities":
        case "Gola Vanities":
        case "Gola Base Cabinets":
            const widthTablePrice: number | undefined = priceData.find(el => el.width >= width)?.price;
            if (widthTablePrice) return widthTablePrice;
            if (width > maxData.width) return maxData.price;
            return undefined
        case 'Wall Cabinets':
        case "Gola Wall Cabinets":
        case 'Tall Cabinets':
        case "Gola Tall Cabinets":
        case "Build In":
        case "Custom Parts":
            const widthAndHeightTablePrice: number | undefined = priceData.find(el => (el.width >= width) && (el.height && el.height >= height))?.price;
            if (widthAndHeightTablePrice) return widthAndHeightTablePrice;
            if (width > maxData.width && maxData.height && height > maxData.height) {
                return maxData.price
            }
            if (width > maxData.width) {
                return priceData.find(el => (el.width === maxData.width) && (el.height && el.height >= height))?.price;
            }
            if (maxData.height && height > maxData.height) {
                return priceData.find(el => (el.height === maxData.width) && (el.width && el.width >= width))?.price;
            }
            return undefined
        case "Leather":
            const widthAndDepthTablePrice: number | undefined = priceData.find(el => (el.width >= width) && (el.depth && el.depth >= depth))?.price;
            if (widthAndDepthTablePrice) return widthAndDepthTablePrice;
            if (width > maxData.width && maxData.depth && depth > maxData.depth) {
                return maxData.price
            }
            if (width > maxData.width) {
                return priceData.find(el => (el.width === maxData.width) && (el.depth && el.depth >= depth))?.price;
            }
            if (maxData.depth && depth > maxData.depth) {
                return priceData.find(el => (el.depth === maxData.width) && (el.width && el.width >= width))?.price;
            }
            if (!priceData[0]?.depth) {
                const widthTablePrice: number | undefined = priceData.find(el => el.width >= width)?.price;
                if (widthTablePrice) return widthTablePrice;
                if (width > maxData.width) return maxData.price;
            }
            return undefined
        default:
            return undefined;
    }
};

export const getStandardTablePrice = (width: number, height: number, depth: number, priceData: pricePart[]): number | undefined => {
    const hasHeightDependency = priceData[0].height
    if (!hasHeightDependency) return priceData.find(el => el.width >= width)?.price;
    return priceData.find(el => el.width === width && el.height === height)?.price;
}

export const getPriceForExtraWidth = (initialPriceWithCoef: number, priceData: pricePart[], width: number, widthCoef: number, allCoefs: number): number => {
    const maxData = priceData[priceData.length - 1];
    let maxWidth: number = 0;
    const widthTablePrice: number | undefined = priceData.find(el => el.width >= width)?.price;
    if (widthTablePrice) maxWidth = widthTablePrice;
    if (width > maxData.width) maxWidth = maxData.price * (widthCoef + 1);
    if (maxWidth) {
        return +(maxWidth * allCoefs - initialPriceWithCoef).toFixed(1)
    }
    return 0
}

export const getPriceForExtraHeight = (priceData: pricePart[], initialPriceWithCoef: number, width: number, height: number, allCoefs: number, heightCoef: number): number => {
    const maxData = priceData[priceData.length - 1];
    if (!maxData.height) {
        return +(initialPriceWithCoef * (heightCoef + 1) - initialPriceWithCoef).toFixed(1);
    }
    const checkedWidth = priceData.filter(el => maxData.width >= width ? el.width === width : el.width === maxData.width);
    const initialPrice = checkedWidth.length && checkedWidth[0].price * allCoefs;
    if (!initialPrice) return 0
    const currentHeightPrice = checkedWidth.find(el => el.height && el.height >= height)?.price;
    return currentHeightPrice ? +(currentHeightPrice * allCoefs - initialPrice).toFixed(1) : 0

}

export function calculatePrice(sizes: productSizesType, extraPrices: extraPricesType, productRange: productRangeType, startPrice: number, isAngle: boolean): calculatePriceType {
    const {width, height, depth, maxWidth, maxHeight} = sizes
    const coef: coefType = {
        width: 0,
        height: 0,
        depth: 0
    }

    if (maxWidth < width) coef.width = addWidthPriceCoef(width, maxWidth);
    if (maxHeight < height) coef.height = addHeightPriceCoef(height, maxHeight);
    if (productRange.depthRange[0] !== depth) coef.depth = addDepthPriceCoef(depth, productRange.depthRange, isAngle)
    const coefExtra = 1 + (coef.width + coef.height + coef.depth);
    const totalPrice = startPrice ? +(startPrice * coefExtra + extraPrices.ptoDoors + extraPrices.ptoDrawers + extraPrices.glassShelf + extraPrices.glassDoor + extraPrices.ptoTrashBins + extraPrices.pvcPrice + extraPrices.doorPrice + extraPrices.drawerPrice + extraPrices.ledPrice) : 0
    return {
        totalPrice: +totalPrice.toFixed(1),
        coef,
        coefExtra
    };
}

export function calculateStandardData(initialPrice: number, extraPrices: extraStandardPricesType, realDepth: number, depthRange: number[], isAngle: boolean): calculateStandardPriceType {
    let coefDepth: number = 0;
    if (depthRange[0] !== realDepth) coefDepth = addDepthPriceCoef(realDepth, depthRange, isAngle);
    const coefExtra = 1 + (coefDepth);
    const totalPrice = +(initialPrice * coefExtra + extraPrices.ptoDoors + extraPrices.ptoDrawers + extraPrices.ptoTrashBins + extraPrices.glassShelf + extraPrices.glassDoor + extraPrices.ledPrice).toFixed(1)
    return {
        totalPrice,
        coefDepth,
        coefExtra
    }
}

export function getStartPrice(customWidth: number, customHeight: number, customDepth: number, allCoefs: number, sizeLimit: sizeLimitsType, tablePrice: number | undefined): number {
    const settingMinWidth = sizeLimit.width[0];
    const settingMaxWidth = sizeLimit.width[1];
    const settingMinHeight = sizeLimit.height[0];
    const settingMaxHeight = sizeLimit.height[1];
    const settingMinDepth = sizeLimit.depth[0];
    const settingMaxDepth = sizeLimit.depth[1];

    const isFitMinMaxWidth = (customWidth >= settingMinWidth) && (customWidth <= settingMaxWidth);
    const isFitMinMaxHeight = (customHeight >= settingMinHeight) && (customHeight <= settingMaxHeight);
    const isFitMinMaxDepth = (customDepth >= settingMinDepth) && (customDepth <= settingMaxDepth);

    if (!isFitMinMaxWidth || !isFitMinMaxHeight || !isFitMinMaxDepth || !tablePrice) {
        return 0;
    }
    return +(tablePrice * allCoefs).toFixed(1)
}

export function getStandardStartPrice(customDepth: number, allCoefs: number, sizeLimit: sizeLimitsType, tablePrice: number | undefined): number {
    const settingMinDepth = sizeLimit.depth[0];
    const settingMaxDepth = sizeLimit.depth[1];

    const isFitMinMaxDepth = (customDepth >= settingMinDepth) && (customDepth <= settingMaxDepth);

    if (!isFitMinMaxDepth || !tablePrice) {
        return 0;
    }
    return +(tablePrice * allCoefs).toFixed(1)
}

export function addWidthPriceCoef(width: number, maxWidth: number) {
    return Math.ceil((width - maxWidth) / 3) / 10;
}

export function addHeightPriceCoef(customHeight: number, maxHeight: number) {
    return Math.ceil((customHeight - maxHeight) / 3) / 10
}

export function addDepthPriceCoef(customDepth: number, depthRangeData: number[], isAngle: boolean) {
    if (isAngle) return 0;
    const maxDepth = depthRangeData[depthRangeData.length - 1];
    if (customDepth > maxDepth) {
        return Math.ceil((customDepth - maxDepth) / 3) / 10
    }
    return 0
}

export function addPTODoorsPrice(attributes: attrItem[], prodType: productTypings): number {
    const attrs = getAttributes(attributes, prodType);
    const doorQty = attrs.find(attr => attr.name === "Door")?.value
    if (doorQty && settings.fixPrices["PTO for doors"]) {
        return +doorQty * settings.fixPrices["PTO for doors"]
    }
    return 0
}

export function addPTODrawerPrice(prodType: productTypings, drawersQty: number): number {
    if (drawersQty && settings.fixPrices["PTO for drawers"]) {
        return +drawersQty * settings.fixPrices["PTO for drawers"]
    }
    return 0
}

export function addPTOTrashBinsPrice(): number {
    return settings.fixPrices['PTO for trash bins'] || 0
}

export function addGlassShelfPrice(qty: number): number {
    return settings.fixPrices["Glass Shelf"] * qty || 0
}

export function addGlassDoorPrice(square: number = 0, profileVal: any): number {
    const glassDoor = settings["Glass"];
    const {Profile, priceType} = glassDoor
    const profileData: profileItem | undefined = Profile.find(el => el.value === profileVal)
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

export function getDoorSquare(width: number, height: number): number {
    if (width > 0 && height > 0) return +(width * height / 144).toFixed(1);
    return 0;
}

export function getType(width: number, height: number, widthDivider: number | undefined, doors: number, category: productCategory, attributes: attrItem[]): productTypings {
    const doorValues = attributes.find(el => el.name === 'Door')?.values ?? [];
    const shelfValues = attributes.find(el => el.name === 'Adjustable Shelf')?.values ?? [];
    if (attributes[0].values.length < 2) return 1;

    switch (category) {
        case 'Base Cabinets':
        case "Regular Vanities":
        case "Gola Vanities":
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
        if (minWidth && width <= minWidth) return false;
        return true;
    });
}

export function getDoorMinMaxValuesArr(realWidth: number, doorValues?: valueItemType[], widthDivider?: number): number[] | null {
    if (!doorValues) return null;
    if (widthDivider && doorValues.length >= 2) return realWidth <= widthDivider ? [doorValues[0].value] : [doorValues[1].value];
    const filter = filterDoorArr(realWidth, doorValues)
    return [...new Set<number>(filter.map(el => el.value))]
}

export function getPvcPrice(width: number, blindWidth: MaybeUndefined<number> = 0, height: number, isAcrylic = false, doorType?: string, doorFinish?: string): number {
    if (doorType === 'No Doors' || doorFinish === 'Milino') return 0;
    const sq = (width - blindWidth + height) * 2 / 12;
    const pvcPrice = sq * 2.5;
    return +(isAcrylic ? pvcPrice * 1.1 : pvcPrice).toFixed(1)
}


export function getDoorPrice(square: number, doorPriceMultiplier: number): number {
    return +(square * doorPriceMultiplier).toFixed(1);
}

export function getDrawerPrice(qty: number, drawer: drawerInterface, width: number, category: string): number {
    const isStandardCabinet = category === "Standard Door";
    const {drawerBrand, drawerType, drawerColor} = drawer
    if (!qty) return 0
    let price: number = 0;
    switch (drawerBrand) {
        case 'Milino':
            switch (drawerType) {
                case 'Undermount':
                    price = isStandardCabinet ? qty * 10 : qty * 15;
                    break;
                case 'Legrabox':
                    if (drawerColor === 'Led') {
                        price = qty * 150;
                        break;
                    }
                    price = !isStandardCabinet ? qty * 33 : 0;
                    break;
                case 'Dovetail':
                    if (drawerColor === 'Maple') price = qty * (width * 2 + 25);
                    if (drawerColor === 'Walnut') price = qty * (width * 2 + 45);
                    break;
            }
            break
        case 'BLUM':
            switch (drawerType) {
                case 'Undermount':
                    price = qty * 40 + 15;
                    break;
                case 'Legrabox':
                    if (drawerColor === 'Orion Gray') price = qty * 150;
                    if (drawerColor === 'Stainless Steel') price = qty * 200;
                    break;
                case 'Dovetail':
                    if (drawerColor === 'Maple') price = qty * (width * 2 + 65);
                    if (drawerColor === 'Walnut') price = qty * (width * 2 + 85);
                    break;
            }
            break;
    }
    return +price.toFixed(1)
}


export function getWidthRange(priceData: pricePart[] | undefined): number[] {
    const arr: number[] = priceData && priceData.map(el => el.width) || [];
    return [...new Set<number>(arr)];

}

export function getHeightRange(priceData: pricePart[] | undefined, category: productCategory, customHeight: number | undefined): number[] {
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
        case "Regular Vanities":
        case "Gola Vanities":
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
        case "Regular Vanities":
        case "Gola Vanities":
            return [21];
        case "Build In":
            return [23]
        case "Leather":
            return [15.5]
        default:
            return []
    }
}

type rangeType = {
    [key: string]: number
}

export function getBlindArr(category: string): number[] {
    const range: rangeType = settings.blindRange;
    return range[category] ? [range[category], 0] : [0];

}

export function getDoorWidth(realWidth: number, realBlindWidth: number, isBlind: boolean, isAngle: boolean): number {
    if (isBlind && isAngle) {
        const leg = realWidth - realBlindWidth;
        return +(Math.sqrt(Math.pow(leg, 2) * 2)).toFixed(2)
    }
    if (isBlind) return realWidth - realBlindWidth;
    return realWidth
}


export function getHingeArr(doorArr: number[], category: productCategory): string[] {
    const [left, right, double, singleDoor] = hingeArr;
    let arr: string[] = []
    switch (category) {
        case 'Tall Cabinets':
        case 'Gola Tall Cabinets':
        case "Standard Tall Cabinets":
            if (doorArr[0] === 4) return [''];
            if (doorArr.includes(2) && doorArr.includes(4)) return [singleDoor, double]
            if (doorArr[0] === 2) return [left, right, singleDoor];
            if (doorArr.length === 1 && doorArr[0] === 1) return [left, right];
            return [left, right, singleDoor];
        default:
            if (doorArr.includes(1)) arr.push(left, right);
            if (doorArr.includes(2)) arr.push(double)
            return arr
    }
}

export function getLedPrice(realWidth: number, realHeight: number, ledBorders: string[] | undefined): number {
    if (!ledBorders || !ledBorders.length) return 0;
    let sum: number = 0;
    if (ledBorders.includes('Sides')) sum = realHeight * 2 * 2.55
    if (ledBorders.includes('Top')) sum += (realWidth - 1.5) * 2.55
    if (ledBorders.includes('Bottom')) sum += (realWidth - 1.5) * 2.55
    return Math.round(sum)
}


export const getBasePriceType = (doorType: string, doorFinish: string): pricesTypings => {
    if (doorType === 'Painted' || doorType === 'Slatted' || doorType === 'Micro Shaker') return 3
    if (doorFinish.includes('Milino') || doorFinish.includes('No Doors')) return 1;
    if (doorFinish.includes('Syncron') || doorFinish === 'Cleaf') return 2
    return 3
}

export const getPremiumCoef = (doorType: string, doorFinish: string): number => {
    if (doorType === 'Painted' || doorType === 'Slatted' || doorType === 'Micro Shaker') return 1.05;
    if (doorFinish === 'Stone') return 1.69
    if (doorFinish === 'Zenit') return 1.03
    if (doorFinish === 'Ultrapan Acrylic') return 1.1
    return 1
}

export const getGrainCoef = (doorGrain: string): number => {
    return doorGrain === 'Gorizontal' ? 1.1 : 1
}

export const getBoxMaterialCoefs = (boxMaterial: string, doorFinish: string): getBoxMaterialCoefsType => {
    return {
        boxMaterialCoef: boxMaterial.includes('Plywood') ? 1.2 : 1,
        boxMaterialFinishCoef: doorFinish === 'Cleaf' || doorFinish === 'Syncron' ? 1.845 : 2.706
    }
}

export const getStandardBoxMaterialCoefs = (boxMaterial: string): number => {
    return boxMaterial.includes('Plywood') ? 1.1 : 1
}

export const getDoorPriceMultiplier = (doorType: string, doorFinish: string): number => {
    if (doorType === 'Slab') return 0
    if (doorType === 'Painted' || doorType === 'Slatted') return 37.8
    if (doorType === 'Micro Shaker') return 36
    if (doorType === 'No Doors') return -8
    if (doorFinish === 'Syncron') return 30
    if (doorFinish === 'Luxe') return 36
    if (doorFinish === 'Zenit') return (36 * 1.03)
    return 0
}

export const getProductRange = (priceData: MaybeUndefined<pricePart[]>, category: productCategory, customHeight: number | undefined, customDepth: number | undefined): productRangeType => {
    return {
        widthRange: getWidthRange(priceData),
        heightRange: getHeightRange(priceData, category, customHeight),
        depthRange: getDepthRange(priceData, category, customDepth)
    }
}


export const getMaterialData = (materials: OrderFormType): materialDataType => {
    const {
        ['Category']: category,
        ['Door Type']: doorType,
        ['Door Finish Material']: doorFinish,
        ['Door Grain']: doorGrain,
        ['Box Material']: boxMaterial,
        ['Drawer']: drawerBrand,
        ['Drawer Type']: drawerType,
        ['Drawer Color']: drawerColor,
        ['Leather Type']: leatherType
    } = materials;
    const basePriceType: pricesTypings = getBasePriceType(doorType, doorFinish);
    const baseCoef = basePriceType === 3 ? getPremiumCoef(doorType, doorFinish) : 1;
    const grainCoef = doorGrain ? getGrainCoef(doorGrain) : 1;
    const premiumCoef = +(baseCoef * grainCoef).toFixed(3)
    const boxMaterialCoefs = getBoxMaterialCoefs(boxMaterial, doorFinish)
    const doorPriceMultiplier = getDoorPriceMultiplier(doorType, doorFinish);
    const isAcrylic = doorFinish === 'Ultrapan Acrylic';
    const drawer: drawerInterface = {
        drawerBrand,
        drawerType,
        drawerColor
    };
    return {
        category,
        basePriceType,
        baseCoef,
        grainCoef,
        premiumCoef,
        boxMaterialCoefs,
        doorPriceMultiplier,
        isAcrylic,
        doorType,
        doorFinish,
        drawer,
        leatherType
    }
}

export const getStandardMaterialData = (materials: OrderFormType): StandardMaterialDataType => {
    const {
        ['Category']: category,
        ['Box Material']: boxMaterial,
        ['Drawer']: drawerBrand,
        ['Drawer Type']: drawerType,
        ['Drawer Color']: drawerColor
    } = materials;
    const boxMaterialCoef = getStandardBoxMaterialCoefs(boxMaterial)
    const drawer: drawerInterface = {
        drawerBrand,
        drawerType,
        drawerColor
    };
    return {
        boxMaterialCoef,
        drawer,
        category
    }
}


export const getMaterialDataAPI = (room: RoomTypeAPI): { door_type: string; baseCoef: number; drawer: { drawerType: string; drawerColor: string; drawerBrand: string }; doorType: string; grainCoef: number; isAcrylic: boolean; boxMaterialCoefs: getBoxMaterialCoefsType; doorFinish: string; premiumCoef: number; door_finish_material: string; doorPriceMultiplier: number; leatherType: string | undefined; category: "" | "Kitchen" | "Vanity" | "Build In Closet" | "Leather Closet" | "Standard Door"; basePriceType: 1 | 2 | 3 } => {
    const {
        box_material,
        door_finish_material,
        category,
        leather,
        drawer,
        drawer_type,
        drawer_color,
        door_type,
        door_grain,
    } = room
    const basePriceType: pricesTypings = getBasePriceType(door_type, door_finish_material);
    const baseCoef = basePriceType === 3 ? getPremiumCoef(door_type, door_finish_material) : 1;
    const grainCoef = door_grain ? getGrainCoef(door_grain) : 1;
    const premiumCoef = +(baseCoef * grainCoef).toFixed(3)
    const boxMaterialCoefs = getBoxMaterialCoefs(box_material, door_finish_material)
    const doorPriceMultiplier = getDoorPriceMultiplier(door_type, door_finish_material);
    const isAcrylic = door_finish_material === 'Ultrapan Acrylic';

    return {
        category,
        basePriceType,
        baseCoef,
        grainCoef,
        premiumCoef,
        boxMaterialCoefs,
        doorPriceMultiplier,
        isAcrylic,
        door_type,
        door_finish_material,
        drawer: {
            drawerType: drawer_type,
            drawerColor: drawer_color,
            drawerBrand: drawer
        },
        doorType: door_type,
        doorFinish: door_finish_material,
        leatherType: leather,
    }
}


export const getProductDataToCalculatePrice = (product: ProductType | productChangeMaterialType, drawerBrand: string, image_active_number: productTypings = 1): productDataToCalculatePriceType => {
    const {
        attributes,
        options,
        category,
        isBlind
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
    const blindArr = isBlind ? getBlindArr(category) : undefined;
    const filteredOptions = options.filter(option => (option !== 'PTO for drawers' || drawerBrand !== 'Milino'));
    const shelfsQty = getShelfsQty(attrArr);
    const hasLedBlock = isHasLedBlock(category);

    return {
        doorValues,
        drawersQty,
        rolloutsQty,
        blindArr,
        filteredOptions,
        shelfsQty,
        hasLedBlock
    }
}

// export const getStandardProductPriceData = (product: ProductType, materialData: StandardMaterialDataType) => {
//     const {category, attributes, isBlind, image_active_number, options} = product;
//     const {drawer: {drawerBrand}} = materialData;
//     const attrArr = getAttributes(attributes, image_active_number);
//     const doorValues = attributes.find(el => el.name === 'Door')?.values;
//     const drawersQty = attrArr.reduce((acc, current) => {
//         const qty = current.name.includes('Drawer') ? current.value : 0
//         return acc + qty;
//     }, 0);
//     const rolloutsQty = attrArr.reduce((acc, current) => {
//         const qty = current.name.includes('Rollout') ? current.value : 0
//         return acc + qty;
//     }, 0);
//     const blindArr = isBlind ? getBlindArr(category) : undefined;
//     const filteredOptions = options.filter(option => (option !== 'PTO for drawers' || drawerBrand !== 'Milino'));
//     const shelfsQty = getShelfsQty(attrArr);
//
//     return {
//         doorValues,
//         blindArr,
//         filteredOptions,
//         shelfsQty,
//         drawersQty,
//         rolloutsQty
//     }
// }

export const getBaseProductPrice = (id: number, isStandardCabinet:boolean = false,type: pricesTypings = 1): MaybeUndefined<pricePart[]> => {
    if (isStandardCabinet) return standardProductsPrices.find(el => el.id === id)?.prices;
    const data = productPrices.find(el => el.id === id)?.prices as priceItem[];
    return data ? data.find(i => i.type === type)?.data : undefined
}


export const getCustomPartPrice = (name: string, width: number, height: number, depth: number, doorFinish: string): number => {
    const area = width * height / 144;
    switch (name) {
        case "Open Cabinet":
            switch (doorFinish) {
                case "Milino":
                    return (width * height * depth / 100) + 120;
                case "Plywood":
                    return (width * height * depth / 80) + 120;
                case "Syncron":
                case "Cleaf":
                    return (width * height * depth / 50) + 120;
                case "Luxe":
                case "OneSkin":
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
        case "Floating Shelf":
            const opetCabinetCoef = (width * height + width * depth + height * depth) / 144 * 2 * 2.3
            switch (doorFinish) {
                case "Milino":
                    return opetCabinetCoef * 20
                case "Syncron":
                case "Cleaf":
                    return opetCabinetCoef * 22
                case "Luxe":
                case "OneSkin":
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
        case "Panel, Filler, Wood Toe Kick":
        case "Wood Gola Trims":
            const k = area > 1 ? 1 : 1.8;
            switch (doorFinish) {
                case "Milino":
                    return area * k * 8;
                case "Plywood":
                    return area * k * 10;
                case "Syncron":
                case "Cleaf":
                    return area * k * 18;
                case "Luxe":
                case "OneSkin":
                case "Ultrapan PET":
                    return area * k * 24;
                case "Ultrapan Acrilic":
                    return area * k * 24 * 1.1;
                case "Zenit":
                    return area * k * 24 * 1.03;
                case "Stone":
                    return area * k * 31.2 * 2;
                case "Painted":
                    return area * k * 31.2 * 1.3;
                default:
                    return 0;
            }
        case "Double Panel":
            switch (doorFinish) {
                case "Milino":
                    return area * 36;
                case "Plywood":
                    return area * 40;
                case "Syncron":
                case "Cleaf":
                    return area * 48;
                case "Luxe":
                case "OneSkin":
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
        case "L Shape":
            const lSHapeArea = (width + depth) * height / 144
            switch (doorFinish) {
                case "Milino":
                    return lSHapeArea * 19;
                case "Plywood":
                    return lSHapeArea * 21;
                case "Syncron":
                case "Cleaf":
                    return lSHapeArea * 39;
                case "Luxe":
                case "OneSkin":
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
        case "Column":
            const columnArea = (width * height + width * depth + height * depth) / 144 * 2 * 2.3;
            switch (doorFinish) {
                case "Milino":
                    return columnArea * 15.2;
                case "Syncron":
                case "Cleaf":
                    return columnArea * 16.8;
                case "Luxe":
                case "OneSkin":
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
        case "Shaker Panel":
            switch (doorFinish) {
                case "Milino":
                    return area * 36;
                case "Syncron":
                case "Cleaf":
                    return area * 48;
                case "Luxe":
                case "OneSkin":
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
                case "Micro Shaker":
                    return area * 60
                default:
                    return 0;
            }
        case "Slatted Panel":
            return area * 48;
        case "Decor Panel":
            let decorPrice = area > 4 ? area * 64 : 240;
            return doorFinish === 'Ultrapan Acrilic' ? decorPrice * 1.1 : decorPrice
        default:
            return 0
    }
}

export const getGlassDoorPrice = (name: string, width: number, height: number, doorFinish: string, profile?: number): number => {
    const area = width * height / 144;
    switch (name) {
        case "Shaker Glass Door":
            let shakerDoorPrice = area * 80 > 240 ? area * 80 : 240;
            return doorFinish === 'Ultrapan Acrilic' ? shakerDoorPrice * 1.1 : shakerDoorPrice
        case "Glass Aluminum Door":
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
        default:
            return 0
    }
}

export const getShelfsQty = (attrArr: { name: string, value: number }[]): number => {
    const val = attrArr.find(el => el.name === 'Adjustable Shelf')?.value;
    return val ?? 0;
}

export const getValidHeightRange = (realWidth: number, heightRange: number[], baseProductPrice: pricePart[]): number[] => {
    if (!baseProductPrice[0].height) return heightRange;
    const filtered = baseProductPrice.filter(pricePart => pricePart.width === realWidth).map(el => el.height);
    return filtered.filter(notEmpty)
}

function notEmpty<TValue>(value: TValue | undefined): value is TValue {
    return value !== null && value !== undefined;
}


export const checkCartData = (cart: CartItemType[], values: OrderFormType, dispatch: Function) => {
    cart.forEach(product => {
        const {id, category, productExtra} = product;
        switch (category) {
            case "Standard Base Cabinets":
            case "Standard Wall Cabinets":
            case "Standard Tall Cabinets": {
                const materialData = getStandardMaterialData(values);
                const {boxMaterialCoef} = materialData
                if (!productExtra) return null;
                const {width, height, depth, cartExtras} = productExtra;
                const {
                    glassDoor,
                    ledPrice,
                    glassShelf,
                    ptoDrawers,
                    ptoDoors,
                    ptoTrashBins,
                    coefExtra,
                } = cartExtras;

                const sizeLimit: sizeLimitsType | undefined = sizes.find(size => size.productIds.includes(product.id))?.limits;
                if (!sizeLimit) return null;

                const baseProductPrice = getBaseProductPrice(id);
                if (!baseProductPrice) return null;
                const productRange = getProductRange(baseProductPrice, category, height, depth);
                const initialPrice = getInitialPrice(baseProductPrice, productRange, category, boxMaterialCoef);
                if (!initialPrice) return null;
                const tablePrice = getStandardTablePrice(width, height, depth, baseProductPrice);
                const startPrice: number = getStandardStartPrice(depth, boxMaterialCoef, sizeLimit, tablePrice);
                const totalPrice = +(startPrice * coefExtra + ptoDoors + ptoDrawers + ptoTrashBins + glassShelf + glassDoor + ledPrice).toFixed(1)
                dispatch(updateCartItemPrice({uuid: product.uuid, price: totalPrice}))
                break;
            }
            case "Base Cabinets":
            case "Wall Cabinets":
            case "Tall Cabinets":
            case "Gola Base Cabinets":
            case "Gola Wall Cabinets":
            case "Gola Tall Cabinets":
            case "Regular Vanities":
            case "Gola Vanities":
            case "Leather":
            case "Build In": {
                const materialData = getMaterialData(values)
                const {
                    basePriceType,
                    premiumCoef,
                    doorPriceMultiplier,
                    doorFinish,
                    doorType,
                    isAcrylic,
                    drawer,
                    boxMaterialCoefs
                } = materialData;
                if (!productExtra) return null;
                const {width, blindWidth, height, depth, cartExtras, legsHeight, type} = productExtra;
                const {
                    glassDoor,
                    ledPrice,
                    glassShelf,
                    ptoDrawers,
                    ptoDoors,
                    ptoTrashBins,
                    coefExtra,
                    attributes,
                    boxFromFinishMaterial
                } = cartExtras;
                const {boxMaterialCoef, boxMaterialFinishCoef} = boxMaterialCoefs
                const tablePriceData = getPriceData(id, category, basePriceType);
                if (!tablePriceData) return null;
                const sizeLimit: sizeLimitsType | undefined = sizes.find(size => size.productIds.includes(product.id))?.limits;
                if (!sizeLimit) return null;
                const doorHeight: number = height ? height - legsHeight : 0;
                const frontSquare = getSquare(width, doorHeight);
                const boxCoef = boxFromFinishMaterial ? boxMaterialFinishCoef : boxMaterialCoef;
                const attrArr = getAttributes(attributes, type);
                const drawersQty = attrArr.reduce((acc, current) => {
                    const qty = current.name.includes('Drawer') ? current.value : 0
                    return acc + qty;
                }, 0);
                const rolloutsQty = attrArr.reduce((acc, current) => {
                    const qty = current.name.includes('Rollout') ? current.value : 0
                    return acc + qty;
                }, 0);
                const allCoefs = boxCoef * premiumCoef;
                const tablePrice = getTablePrice(width, height, depth, tablePriceData, category);
                const startPrice = getStartPrice(width, height, depth, allCoefs, sizeLimit, tablePrice);

                const pvcPrice = getPvcPrice(width, blindWidth, doorHeight, isAcrylic, doorType, doorFinish);
                const doorPrice = getDoorPrice(frontSquare, doorPriceMultiplier);
                const drawerPrice = getDrawerPrice(drawersQty + rolloutsQty, drawer, width, category);
                const totalPrice = +(startPrice * coefExtra + ptoDoors + ptoDrawers + glassShelf + glassDoor + ptoTrashBins + pvcPrice + doorPrice + drawerPrice + ledPrice).toFixed(1);
                dispatch(updateCartItemPrice({uuid: product.uuid, price: totalPrice}))
                break;
            }
            case "Custom Parts":
                break;
        }
    })
}


// export const calculateCart = (cartResponse: CartFront[]): CartItemType[] => {
//     const cart = cartResponse.map(item => {
//         const productAPI = getProductById(item.product_id);
//         if (!productAPI) return null;
//         const price = 0;
//         const type = 1;
//         const isStandardSize = false;
//
//         const product: CartItemType = {
//             id: item.product_id,
//             amount: item.amount,
//             note: item.note,
//             img: productAPI.images[0].value,
//             name: productAPI.name,
//             category: productAPI.category,
//             uuid: item._id,
//             price,
//         }
//         switch (item.product_type) {
//             case "cabinet":
//                 product.productExtra = {
//                     width: item.width,
//                     height: item.height,
//                     depth: item.depth,
//                     options: item.options,
//
//                     doorProfile: item.door_option[0],
//                     doorGlassType: item.door_option[1],
//                     doorGlassColor: item.door_option[2],
//                     shelfProfile: item.shelf_option[0],
//                     shelfGlassType: item.shelf_option[1],
//                     shelfGlassColor: item.shelf_option[2],
//                     middleSection: item.middle_section,
//                     led: {
//                         border: item.led_border,
//                         alignment: item.led_alignment,
//                         indent: item.led_indent
//                     },
//                     leather: item.leather,
//                     type,
//                     hinge: item.hinge,
//                     isStandardSize,
//                     legsHeight: productAPI.legsHeight,
//                     corner: item.corner,
//                     blindWidth: item.blind_width,
//                     cartExtras: initialCartExtras
//                 }
//                 return product;
//                 break
//             default:
//                 return product
//         }
//     })
//     return cart.filter((element): element is CartItemType => element !== null)
// }