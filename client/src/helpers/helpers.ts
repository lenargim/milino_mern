import {AppDispatch, RootState} from "../store/store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import noImg from './../assets/img/noPhoto.png'
import Fraction from "fraction.js";
import {
    AngleType,
    attrItem,
    customPartDataType,
    CustomPartType,
    hingeArr,
    itemImg,
    materialsCustomPart,
    MaybeEmpty,
    MaybeNull,
    MaybeUndefined,
    pricePart,
    priceStandardPanel,
    ProductApiType,
    productCategory,
    productRangeType,
    ProductType,
    productTypings,
    ProductFormType,
    RoomCategories,
    sizeLimitsType,
    valueItemType, ProductOrCustomType
} from "./productTypes";
import {optionType, optionTypeDoor} from "../common/SelectField";
import cabinets from '../api/cabinets.json';
import customParts from '../api/customPart.json';
import {colorType, doorType, drawer, finishType, materialsData} from "./materialsTypes";
import {
    calculateProduct,
    getCustomPartPrice,
    getDoorMinMaxValuesArr,
    getMaterialData,
    getProductDataToCalculatePrice,
    getProductPriceRange,
    getProductRange,
    getType
} from "./calculatePrice";
import {v4 as uuidv4} from "uuid";
import sizes from "../api/sizes.json";
import {MaterialStringsType} from "../common/Materials";
import {
    CustomPartFormType,
    DoorAccessoryAPIType,
    DoorAccessoryFront,
    DoorAccessoryType,
} from "../Components/CustomPart/CustomPart";
import {addToCartAccessories} from "../Components/CustomPart/CustomPartDoorAccessoiresForm";
import {getCustomPartStandardDoorPrice} from "../Components/CustomPart/CustomPartStandardDoorForm";
import {useEffect, useRef} from "react";
import standardColors from '../api/standardColors.json'
import {SliderCategoriesItemType, SliderCategoriesType} from './categoriesTypes';
import categoriesData from "../api/categories.json";
import DA from '../api/doorAccessories.json'
import standardProductsPrices from "../api/standartProductsPrices.json";
import {getStandardPanelsPrice, PanelsFormType} from "../Components/CustomPart/CustomPartStandardPanel";
import settings from "../api/settings.json";
import {
    CartAPI,
    CartAPIImagedType,
    CartItemFrontType,
    CartNewType, CartOrder,
    CustomAccessoriesType,
    IsStandardOptionsType
} from "./cartTypes";
import {RoomCategoriesType, RoomFront, RoomMaterialsFormType, RoomOrderType, RoomType} from "./roomTypes";
import {PurchaseOrderType} from "../store/reducers/purchaseOrderSlice";
import {alertError, isTokenValid, refreshTokenAPI} from "../api/apiFunctions";
import {usersAPI} from "../api/api";
import {CheckoutFormValues} from "../Components/Checkout/CheckoutForm";
import {pdf} from "@react-pdf/renderer";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch;

export const getImg = (folder: string, img: string = ''): string => {
    if (!folder || !img) return noImg;
    try {
        return require(`./../assets/img/${folder}/${img}`)
    } catch (e) {
        return noImg
    }
}

export const getImgSize = (category: string): 's' | 'm' | 'l' => {
    let imgSize: 's' | 'm' | 'l';
    switch (category) {
        case "Tall Cabinets":
        case "Gola Tall Cabinets":
        case "Standard Tall Cabinets":
            imgSize = 'm';
            break;
        default:
            imgSize = 's';
            break;
    }
    return imgSize
}

export const getAttributes = (attributes: attrItem[], type: productTypings = 1) => {
    return attributes.map(attribute => {
        const val: valueItemType = attribute.values.find(v => v.type === type) || attribute.values[0]
        return {
            name: attribute.name,
            value: val.value
        }
    })
}

export const getProductImage = (images: itemImg[], type: productTypings = 1): string => {
    const img = images.find(img => img.type === type)
    return img ? img.value.toString() : ''
}

export function getSelectValfromVal(val: string | undefined, options: optionType[]): MaybeNull<optionType> {
    const option = options.find(el => el.value === val)
    return option || null
}

export function getSelectDoorVal(val: string | undefined, options: optionTypeDoor[]): optionTypeDoor | null {
    const option = options.find(el => el.label === val)
    return option ?? null
}

export const getCartTotal = (cart: MaybeNull<CartItemFrontType[]>): number => {
    if (!cart) return 0;
    return +(cart.reduce(
        (acc, currentVal) => acc + (currentVal.price * currentVal.amount), 0
    )).toFixed(1)
}

export const getFraction = (numberFraction: number): string => {
    return new Fraction(numberFraction).simplify(0.001).toFraction(true);
}

function getBlindArr(category: string, product_id: number, isBlind: boolean): MaybeUndefined<number[]> {
    if (!isBlind) return undefined;
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

export const getProductById = (id: MaybeUndefined<number>, isProductStandard: boolean): MaybeNull<ProductType | CustomPartType> => {
    if (!id) return null;
    let product_or_custom = cabinets.find(product => product.id === id && product.product_type !== (isProductStandard ? "cabinet" : "standard"));

    if (!product_or_custom) return null;
    const {product_type} = product_or_custom as ProductOrCustomType;
    switch (product_type) {
        case "cabinet":
        case "standard": {
            const product = product_or_custom as ProductType;
            const {category, isBlind} = product;
            return {
                ...product,
                hasLedBlock: isHasLedBlock(category),
                blindArr: getBlindArr(category, product.id, isBlind),
            }
        }
        case "custom": {
            return product_or_custom as CustomPartType;
        }
    }
}

export const getProductsByCategory = (category: productCategory, isStandardCabinet: boolean): ProductType[] => {
    const products = cabinets as ProductType[];
    if (isStandardCabinet) {
        return products.filter(el => el.category === category && el.product_type === "standard");
    }
    return products.filter(el => el.category === category && el.product_type !== "standard");
}

export const getCustomParts = (room: RoomType, isStandardCabinet: boolean): customPartDataType[] => {
    let exceptionIds: number[] = [];
    exceptionIds = isStandardCabinet ? [910, 913] : [919, 920, 921];
    const standardDoorCustomParts = customParts.filter(el => !exceptionIds.includes(el.id))
    return standardDoorCustomParts as customPartDataType[];
}

export const getInitialMaterialData = (custom: CustomPartType, materials: RoomMaterialsFormType, isStandardCabinet: boolean): MaybeNull<materialsCustomPart> => {
    const {materials_array, id} = custom;
    const {door_finish_material, door_type} = materials
    const filtered_materials_array = filterCustomPartsMaterialsArray(materials_array, id, isStandardCabinet)
    if (!filtered_materials_array) return null;
    return filtered_materials_array.find(el => door_finish_material.includes(el.name))
        ?? filtered_materials_array.find(el => door_type === el.name)
        ?? filtered_materials_array[0];
}

export const filterCustomPartsMaterialsArray = (materials_array: MaybeUndefined<materialsCustomPart[]>, custom_part_id: number, is_standard: boolean): MaybeNull<materialsCustomPart[]> => {
    if (!materials_array) return null;
    // Standard shaker Catalog -> Custom parts exceptions for materials list(in detailed page)
    const id_exceptions_arr: number[] = [903, 905, 901, 900, 906, 907];
    if (!is_standard || !id_exceptions_arr.includes(custom_part_id)) return materials_array;

    const materials_filter_names: string[] = ['Ultrapan PET', 'Painted']
    return materials_array.filter(el => materials_filter_names.includes(el.name))
}

export const getInitialDepth = (productRange: productRangeType, isAngle: AngleType, depth: number): number => {
    const tableDepth = productRange?.depthRange[0];
    if (tableDepth) return tableDepth;
    return !isAngle ? depth : productRange.widthRange[0]
}

export const getLimit = (d: MaybeUndefined<number[]>): number => {
    return d ? d[0] : 0
}

export const getIsProductStandard = (productRange: productRangeType, width: number, height: number, depth: number, blind_width: number, middle_section: number, options: string[], led_border: string[], product: ProductType): boolean => {
    const {isAngle, isBlind, blindArr, middleSectionDefault, hasMiddleSection} = product;
    return checkDimensionsStandard(productRange, width, height, depth, isAngle)
        && checkBlindStandard(isBlind, blind_width, blindArr)
        && checkMiddleSectionStandard(hasMiddleSection, middleSectionDefault, middle_section)
        && checkOptionsSelected(options)
        && checkLedSelected(led_border)
}

export const checkDimensionsStandard = (productRange: productRangeType, width: number, height: number, depth: number, isAngle: AngleType): boolean => {
    return checkWidthStandard(productRange, width)
        && checkHeightStandard(productRange, height)
        && checkDepthStandard(productRange, depth, isAngle)
}

export const checkWidthStandard = (productRange: productRangeType, width: number): boolean => {
    return productRange.widthRange.includes(width)
}
export const checkHeightStandard = (productRange: productRangeType, height: number): boolean => {
    return productRange.heightRange.includes(height)
}
export const checkDepthStandard = (productRange: productRangeType, depth: number, isAngle: AngleType): boolean => {
    return !isAngle ? productRange.depthRange.includes(depth) : true;
}
export const checkBlindStandard = (isBlind: boolean, blind_width: number, blindArr?: number[]): boolean => {
    if (!isBlind) return true;
    return blindArr ? blindArr.includes(blind_width) : false;
}
export const checkMiddleSectionStandard = (hasMiddleSection: MaybeUndefined<true>, middleSectionDefault: MaybeUndefined<number>, middle_section: number): boolean => {
    if (!hasMiddleSection) return true;
    return middle_section === middleSectionDefault;
}
export const checkOptionsSelected = (options: string[]): boolean => {
    return !options.length
}
export const checkLedSelected = (led: string[]): boolean => {
    return !led.length
}

export const getCustomCabinetString = (isStandard: IsStandardOptionsType): string => {
    return Object.values(isStandard).includes(false) ? 'Custom' : '';
}

export const addProductToCart = (product: ProductType, values: ProductFormType, productRange: productRangeType, roomId: string): CartNewType => {
    const {id, product_type} = product
    const {
        'Width': width,
        'Blind Width': blindWidth,
        'Height': height,
        'Depth': depth,
        'Custom Depth Number': customDepth,
        'Hinge opening': hinge,
        'Corner': corner,
        Options: chosenOptions,
        glass_door,
        glass_shelf,
        'Note': note,
        'LED borders': ledBorders,
        'LED alignment': ledAlignment,
        'LED indent': ledIndent,

        // Excluded in standard cabinet
        'Custom Width Number': customWidth,
        'Custom Height Number': customHeight,
        'Custom Blind Width Number': customBlindWidth,
        'Middle Section Number': middleSection,
    } = values;

    const realW = width || customWidth || 0;
    const realH = height || customHeight || 0;
    const realD = depth || customDepth || 0;
    const realMiddle = middleSection || 0
    const realBlind = blindWidth || customBlindWidth || 0;

    return {
        room_id: roomId,
        product_id: id,
        product_type: product_type,
        amount: 1,
        width: realW,
        height: realH,
        depth: realD,
        blind_width: realBlind,
        middle_section: realMiddle,
        hinge: hinge,
        corner: corner,
        options: chosenOptions,
        glass: {
            door: glass_door,
            shelf: glass_shelf,
        },
        led: {
            border: ledBorders,
            alignment: ledAlignment,
            indent: ledIndent,
        },
        note: note,
        custom: undefined
    }
}

export const addToCartCustomPart = (values: CustomPartFormType, product: CustomPartType, roomId: string): CartNewType => {
    const {
        'Width Number': width,
        'Height Number': height,
        'Depth Number': depth,
        'Material': material,
        'Note': note,
        glass_door,
        glass_shelf,
        door_accessories,
        led_accessories,
        standard_door,
        standard_panels,
    } = values;

    const {id, product_type} = product;
    const {
        led_alum_profiles,
        led_gola_profiles,
        led_transformer,
        led_door_sensor,
        led_dimmable_remote
    } = led_accessories;

    const led_alum_profiles_api = led_alum_profiles.map(el => ({
        length: el["length Number"],
        qty: el.qty
    }));

    const led_gola_profiles_api = led_gola_profiles.map(el => ({
        length: el["length Number"],
        qty: el.qty,
        color: el.color
    }));

    const {standard_panel, shape_panel, wtk, crown_molding} = standard_panels;
    const {doors, color} = standard_door
    const standard_panel_api = standard_panel.map(el => ({qty: el.qty, name: el.name}));
    const shape_panel_api = shape_panel.map(el => ({qty: el.qty, name: el.name}));
    const wtk_api = wtk.map(el => ({qty: el.qty, name: el.name}));

    return {
        room_id: roomId,
        product_id: id,
        product_type: product_type,
        amount: 1,
        width: width,
        height: height,
        depth: depth,
        blind_width: 0,
        middle_section: 0,
        hinge: "",
        corner: "",
        options: [],
        glass: {
            door: glass_door,
            shelf: glass_shelf,
        },
        led: {
            border: [],
            alignment: '',
            indent: '',
        },
        custom: {
            material: material,
            accessories: {
                led_alum_profiles: led_alum_profiles_api,
                led_gola_profiles: led_gola_profiles_api,
                led_dimmable_remote: led_dimmable_remote,
                led_door_sensor: led_door_sensor,
                led_transformer: led_transformer,
                door: door_accessories.filter(el => el.qty > 0),
            },
            standard_panels: {
                standard_panel: standard_panel_api,
                shape_panel: shape_panel_api,
                wtk: wtk_api,
                crown_molding
            },
            standard_door: {
                doors,
                color
            }
        },
        note: note
    }
}

const isHasLedBlock = (category: productCategory): boolean => {
    const ledCategoryArr = ['Wall Cabinets', 'Gola Wall Cabinets'];
    return ledCategoryArr.includes(category)
}

export const isGolaShown = (category: MaybeEmpty<RoomCategoriesType>, hasGola: boolean): boolean => {
    if (!category) return false;
    return hasGola
}

export const isDoorTypeShown = (category: MaybeEmpty<RoomCategoriesType>, gola: string, showGola: boolean): boolean => {
    if (!category) return false;
    return !(showGola && !gola);
}

export const isDoorFinishShown = (category: MaybeEmpty<RoomCategoriesType>, doorType: string, finishArr?: finishType[]): boolean => {
    if (!category || doorType === 'Standard White Shaker') return false
    return !!(doorType && finishArr?.length)
}

export const isDoorColorShown = (doorType: string, doorFinishMaterial: string, finishArr?: finishType[], colorArr?: colorType[]): boolean => {
    if (doorType === 'Standard White Shaker') return true;
    return !!(doorFinishMaterial && colorArr?.length)
}

export const isDoorFrameWidth = (doorType: string, doorFinishMaterial: string, frameArr: MaybeUndefined<materialsData[]>): boolean => {
    if (!frameArr || doorType !== 'Micro Shaker') return false
    return !!doorFinishMaterial
}

export const isDoorGrain = (doorFinishMaterial: string, grainArr: MaybeNull<materialsData[]>): boolean => {
    return !(!doorFinishMaterial || !grainArr)
}

export const isBoxMaterial = (doorFinishMaterial: string, doorColor: string | undefined, boxMaterialVal: string, boxMaterialArr: materialsData[], showDoorGrain: boolean, door_grain: string): boolean => {
    if (!boxMaterialArr.length) return false;
    if (showDoorGrain && !door_grain) return false;
    return !!(doorFinishMaterial === 'No Doors No Hinges' || doorColor || boxMaterialVal)
}
export const isBoxColor = (box_material: string, isLeather: boolean, boxMaterial: finishType[]): boolean => {
    return !!(isLeather && box_material && boxMaterial.length)
}

export const isDrawerBrand = (box_material: string, box_color: string, isLeather: boolean): boolean => {
    if (!box_material) return false;
    return !(isLeather && !box_color);
}

export const isDrawerType = (drawer_brand: string, drawerTypesArr: materialsData[]): boolean => {
    return !(!drawer_brand || !drawerTypesArr.length);
}

export const isDrawerColor = (drawer_type: string, drawerColorsArr: materialsData[]): boolean => {
    return !(!drawer_type || drawer_type === 'Undermount' || !drawerColorsArr.length);
}

export const getDoorColorsArr = (doorFinishMaterial: string, isStandardDoor: boolean, doors: doorType[], doorType: string): MaybeUndefined<colorType[]> => {
    const finishArr: MaybeUndefined<finishType[]> = doors.find(el => el.value === doorType)?.finish;
    return isStandardDoor ?
        standardColors.colors as colorType[] :
        finishArr?.find(el => el.value === doorFinishMaterial)?.colors
}

export const getDrawerBrandArr = (drawers: drawer[]): materialsData[] => {
    return drawers.map(el => ({value: el.value, img: el.img})) as materialsData[];
}

export const getDrawerTypeArr = (drawers: drawer[], drawer_brand: string): materialsData[] => {
    const drawerTypesArrFilter = drawers.find(el => el.value === drawer_brand)?.types;
    if (!drawerTypesArrFilter) return [];
    return drawerTypesArrFilter.map(el => ({
        value: el.value,
        img: el.img
    })) as materialsData[];
}

export const getDrawerColorArr = (drawers: drawer[], drawer_brand: string, drawer_type: string): materialsData[] => {
    const drawerTypesArrFilter = drawers.find(el => el.value === drawer_brand)?.types;
    if (!drawerTypesArrFilter) return [];
    return drawerTypesArrFilter.find(el => el.value === drawer_type)?.colors as materialsData[];

}

export const getDoorTypeArr = (doors: doorType[], gola: string, isLeather: boolean): doorType[] => {
    let arr = doors;
    const noGola = gola === '' || gola === 'No Gola'
    if (!noGola) {
        arr = arr.filter(el => el.value !== 'Standard White Shaker');
    }
    if (isLeather) {
        const exceptions = ["No Doors", "Three Piece Door", "Finger Pull", "Standard White Shaker"]
        arr = arr.filter(el => !exceptions.includes(el.value));
    }
    return arr;
}

export const getBoxMaterialArr = <T, U>(category: MaybeEmpty<RoomCategories>, boxMaterial: T[], leatherBoxMaterialArr: U[]): (T | U)[] => {
    if (!category) return [];
    return category === 'Leather Closet' ? leatherBoxMaterialArr : boxMaterial
}


export const getBoxMaterialColorsArr = (isLeather: boolean, boxMaterialType: string, boxMaterialsArr: finishType[]): MaybeUndefined<colorType[]> => {
    if (!isLeather) return undefined;
    return boxMaterialsArr?.find(el => el.value === boxMaterialType)?.colors
}

export const getGrainArr = (grain: materialsData[], colorArr: colorType[], door_color: string): MaybeNull<materialsData[]> => {
    const grainType = colorArr.find(el => el.value === door_color)?.isGrain;

    switch (grainType) {
        case true:
            return grain;
        case 1:
            return grain.filter(el => el.value === 'Horizontal (Upcharge)')
        default:
            return null
    }
}

export const isLeatherType = (drawerColor: string | undefined, drawerType: string | undefined, isLeather: boolean, leatherTypeArr: materialsData[]): boolean => {
    if (!drawerType) return false;
    if (!leatherTypeArr.length || (!drawerColor && drawerType !== 'Undermount')) return false
    return isLeather
}

export const isLeatherNote = (showLeatherType: boolean, leather: string) => {
    return showLeatherType && leather === 'Other';
}

export const checkDoors = (doors: number, doorArr: number[] | null, hingeOpening: string): number => {
    if (!doorArr && doors) return 0;
    if (doorArr?.length === 1 && doors !== doorArr[0]) return doorArr[0];
    if (doors === 1 && doorArr?.includes(2) && hingeOpening === 'Double Door') return 2
    if (doors === 2 && doorArr?.includes(1) && ['Left', 'Right'].includes(hingeOpening)) return 1
    return doors
}

export const getMaterialStrings = (materials: RoomMaterialsFormType): MaterialStringsType => {
    const {name, ...data} = materials;
    const {
        category,
        gola,
        door_type,
        door_finish_material,
        door_grain,
        door_frame_width,
        door_color,
        box_material,
        box_color,
        drawer_brand,
        drawer_type,
        drawer_color,
        leather,
        leather_note
    } = data;

    const categoryString = materialsStringify([category, gola])
    const doorString = materialsStringify([door_type, door_finish_material, door_color, door_grain, door_frame_width])
    const boxString = materialsStringify([box_material, box_color])
    const drawerString = materialsStringify([drawer_brand, drawer_type, drawer_color]);
    const leatherString = materialsStringify([leather, leather_note]);
    return {
        categoryString,
        boxString,
        doorString,
        drawerString,
        leatherString
    }
}

const materialsStringify = (materialsArr: (string | number | null)[]): string => {
    return materialsArr.filter(el => !!el).join(', ')
}

export const getSquare = (doorWidth: number, doorHeight: number, product_id: number, is_leather_closet: boolean): number => {
    if (is_leather_closet) {
        // Door exceptions for leather closet
        if (product_id === 413) return +((doorWidth * 26) / 144).toFixed(2)
        if (product_id === 414) return +((doorWidth * 38) / 144).toFixed(2)
        if (product_id === 415) return +((doorWidth * 29) / 144).toFixed(2)
        return 0;
    }
    return +((doorWidth * doorHeight) / 144).toFixed(2)
}

export const getWidthToCalculateDoor = (realWidth: number, blind_width: number, isAngle: AngleType, isWallCab: boolean): number => {
    if (!isAngle) return realWidth - blind_width;
    // 24 is a standard blind with for corner base cabinets; 13 for wall cabines
    const blindCorner = isWallCab ? 13.5 : 24;
    const a = realWidth - blindCorner;
    if (a <= 0) return +(Math.sqrt(2 * Math.pow(realWidth, 2))).toFixed(2);
    switch (isAngle) {
        case "flat":
            return +(Math.sqrt(2 * Math.pow(a, 2))).toFixed(2)
        case "corner":
            return a * 2;
    }
    return 0
}

export const convertCartAPIToFront = (cart: CartAPI[], room: MaybeUndefined<RoomMaterialsFormType>): CartItemFrontType[] => {
    if (!room) return []
    const CartFrontItems = cart.map(cart_item => {
        return getCartItemProduct(cart_item, room);
    })
    return CartFrontItems.filter((element): element is CartItemFrontType => element !== null)
}


export const convertRoomAPIToFront = (room: RoomType): RoomFront => {
    return {
        ...room,
        activeProductCategory: ''
    }
}

const getCartItemProduct = (item: CartAPI, room: RoomMaterialsFormType): MaybeNull<CartItemFrontType> => {
    const {door_type, door_color} = room;
    const {
        product_id,
        width,
        height,
        depth,
        options,
        hinge,
        product_type,
        blind_width,
        middle_section,
        led,
        glass,
        custom,
    } = item;
    const materialData = getMaterialData(room, product_id);
    const {
        is_standard_cabinet,
        drawer_brand,
        base_price_type,
    } = materialData;

    const product_or_custom = getProductById(product_id, product_type === 'standard')
    if (!product_or_custom) return null;
    switch (product_type) {
        case "cabinet":
        case "standard": {
            const product = product_or_custom as ProductType;
            const {
                category,
                widthDivider,
                attributes,
                customHeight,
                customDepth,
                hasMiddleSection,
                isAngle,
                isBlind,
                middleSectionDefault,
                blindArr
            } = product

            const {border} = led

            const tablePriceData = getProductPriceRange(product_id, is_standard_cabinet, base_price_type);
            if (!tablePriceData) return null;

            const productPriceData = getProductDataToCalculatePrice(product, drawer_brand);
            const {doorValues} = productPriceData;
            const doorArr = getDoorMinMaxValuesArr(width, doorValues);
            const doors = checkDoors(0, doorArr, hinge)
            const sizeLimit: MaybeUndefined<sizeLimitsType> = sizes.find(size => size.productIds.includes(product_id))?.limits;
            if (!sizeLimit) return null;
            const image_active_number = getType(width, height, widthDivider, doors, category, attributes);
            const cabinetItem: CartAPIImagedType = {
                ...item,
                image_active_number,
            }
            const totalPrice = calculateProduct(cabinetItem, materialData, tablePriceData, sizeLimit, product)
            const productRange = getProductRange(tablePriceData, category, customHeight, customDepth);

            return {
                ...cabinetItem,
                subcategory: category,
                price: totalPrice,
                isStandard: {
                    dimensions: checkDimensionsStandard(productRange, width, height, depth, isAngle),
                    blind: checkBlindStandard(isBlind, blind_width, blindArr),
                    led: checkLedSelected(border),
                    options: checkOptionsSelected(options),
                    middle: checkMiddleSectionStandard(hasMiddleSection, middleSectionDefault, middle_section)
                }
            }
        }
        case "custom": {
            const customPart = product_or_custom as CustomPartType;
            const {type, standard_price} = customPart;
            const {accessories, standard_door, standard_panels, material} = custom!;
            const {door: glass_door_val} = glass;
            const isCabinetLayout = ["custom", "pvc", "backing", "glass-door", "glass-shelf"].includes(type);
            const isStandardPanel = ["standard-panel"].includes(type);
            let price: number = 0;

            if (isCabinetLayout) {
                const finishColorCoef = getFinishColorCoefCustomPart(product_id, material, door_color);
                const profileName = glass_door_val ? glass_door_val[0] : '';
                price = +(getCustomPartPrice(product_id, width, height, depth, material, profileName) * finishColorCoef).toFixed(1);
            }

            if (type === 'led-accessories' && accessories) {
                price = getLEDProductCartPrice(accessories);
            }

            if (type === 'door-accessories' && accessories && accessories.door) {
                price = addToCartAccessories(accessories.door)
            }
            if ((type === 'standard-door' || type === 'standard-glass-door') && standard_door) {
                price = getCustomPartStandardDoorPrice(standard_door, type)
            }

            if (isStandardPanel && standard_panels) {
                const is_price_type_default = door_type === 'Standard White Shaker' && door_color === 'Default White';
                const apiPanelData = standardProductsPrices.find(el => el.id === product_id) as priceStandardPanel;
                const standard_panels_front: PanelsFormType = {
                    standard_panel: standard_panels.standard_panel.map(el => ({...el, _id: uuidv4()})),
                    shape_panel: standard_panels.shape_panel.map(el => ({...el, _id: uuidv4()})),
                    wtk: standard_panels.wtk.map(el => ({...el, _id: uuidv4()})),
                    crown_molding: standard_panels.crown_molding
                };
                price = getStandardPanelsPrice(standard_panels_front, is_price_type_default, apiPanelData);
            }
            if (type === "plastic_toe" && standard_price) {
                price = standard_price
            }
            return {
                ...item,
                image_active_number: 1,
                subcategory: type,
                price: price,
                isStandard: {
                    dimensions: true,
                    led: true,
                    blind: true,
                    middle: true,
                    options: true
                }
            }
        }
    }
};

const getLEDProductCartPrice = (accessories: CustomAccessoriesType): number => {
    const {
        led_alum_profiles,
        led_gola_profiles,
        led_door_sensor,
        led_dimmable_remote,
        led_transformer,
    } = accessories;
    const alumProfPrice = led_alum_profiles.reduce((acc, profile) => acc + (profile.length * 2.55 * profile.qty), 0);
    const golaProfPrice = led_gola_profiles.reduce((acc, profile) => acc + (profile.length * 5.5 * profile.qty), 0);
    const dimRemotePrice = led_dimmable_remote * 100 || 0;
    const doorSensorPrice = led_door_sensor * 150 || 0;
    const transformerPrice = led_transformer * 50 || 0;

    return +(alumProfPrice + golaProfPrice + dimRemotePrice + doorSensorPrice + transformerPrice).toFixed(1)
}

export const getFinishColorCoefCustomPart = (id: number, material: MaybeUndefined<string>, door_color: string): number => {
    // Choose Panels only
    if (![900, 901, 903, 905, 906].includes(id)) return 1;
    // Choose Material (In Product Page)
    if (material !== 'Milino') return 1;
    // Door Color from Materials page
    if (['Brown Oak', 'Grey Woodline', 'Ivory Woodline'].includes(door_color)) return 1.1;
    if (door_color.includes('Ultra Matte')) return 1.2;
    return 1;
}

export const getCartItemImg = (product: ProductType | CustomPartType, image_active_number: productTypings): string => {
    const {product_type, images} = product;
    if (product_type === 'custom') {
        return getImg('products/custom', images[0].value)
    }
    return getImg('products', images[image_active_number - 1].value)
}

export const getCartItemImgPDF = (product: ProductType | CustomPartType, image_active_number: productTypings): string => {
    const {product_type, images} = product;
    if (product_type === 'custom') {
        const val = images[0].value.replace('webp', 'jpg');
        return getImg('products-checkout/custom', val)
    }
    const val = images[image_active_number - 1].value.replace('webp', 'jpg');
    return getImg('products-checkout', val)
}

export const convertDoorAccessories = (el: DoorAccessoryAPIType): DoorAccessoryType => {
    const doorAccessories = DA as DoorAccessoryFront[];
    const item = doorAccessories.find(ac => ac.value === el.value);
    if (!item) return {...doorAccessories[0], qty: el.qty}
    return {...item, qty: el.qty}
}

export const usePrevious = (data: string) => {
    const prev = useRef<string>()
    useEffect(() => {
        if (data) prev.current = data;
    }, [data])
    return prev.current
}

export const getdimensionsRow = (width: number, height: number, depth: number): string => {
    const widthPart = width ? `${getFraction(width)}"W x` : '';
    const heightPart = height ? ` ${getFraction(height)}"H` : '';
    const depthPart = depth && depth > 1 ? ` x ${getFraction(depth)}"D` : '';
    return `${widthPart}${heightPart}${depthPart}`
}

export const isShowBlindWidthBlock = (blindArr: MaybeUndefined<number[]>, product_type: ProductApiType): boolean => {
    return (!(product_type === 'standard' || !blindArr || !blindArr.length));
}

export const isShowMiddleSectionBlock = (hasMiddleSection: MaybeUndefined<true>, middleSectionDefault: MaybeUndefined<number>, isProductStandard: boolean): boolean => {
    return !!(hasMiddleSection && !isProductStandard && middleSectionDefault)
}

export const getSliderCategories = (room: RoomType): SliderCategoriesItemType => {
    const API = categoriesData as SliderCategoriesType;
    const {category, gola, door_type} = room;
    const no_gola = !gola || gola === 'No Gola';
    if (door_type === 'Standard White Shaker') return API['Standard Door'] as SliderCategoriesItemType;
    switch (category) {
        case "Kitchen":
            return no_gola ? API['Kitchen'] : API['Kitchen Gola'] as SliderCategoriesItemType;
        case "Vanity":
            return no_gola ? API['Vanity'] : API['Vanity Gola'] as SliderCategoriesItemType;
        case "Leather Closet":
            return API['Leather Closet'] as SliderCategoriesItemType;
        case "Build In Closet":
            return API['Build In Closet'] as SliderCategoriesItemType;
    }
}

export const formatDateToTextShort = (dateApi: Date): string => {
    const date = new Date(dateApi);
    const options: Intl.DateTimeFormatOptions = {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
    };
    return new Intl.DateTimeFormat('ru-RU', options).format(date);
}

export function prepareToSelectField(arr: string[]): optionType[] {
    return arr.map(el => ({
            value: el,
            label: el
        }))
}

export const getProfileList = (is_custom: boolean): optionType[] => {
    const profile = settings['Glass']['Profile'];
    const profileFiltered = is_custom ? profile.filter(el => el.value !== 'Wood Shaker') : profile;
    return prepareToSelectField(profileFiltered.map(el => el.value));
}

export const getGlassTypeList = (): optionType[] => {
    return prepareToSelectField(['Glass', 'Mirror', 'Colored']);
}

export const getColorsList = (glassType: string): optionType[] => {
    switch (glassType) {
        case 'Glass':
            return prepareToSelectField(settings.Glass.Glass);
        case 'Mirror':
            return prepareToSelectField(settings.Glass.Mirror);
        case 'Colored':
            return prepareToSelectField(settings.Glass.Colored);
        default:
            return []
    }
}

export const getHeightRange = (heightRange: number[], isProductStandard: boolean, width: number, tablePriceData: pricePart[], category: productCategory, customHeight: MaybeUndefined<number>) => {
    if (!isProductStandard) return heightRange.concat([0]);
    if (customHeight) return [customHeight];
    const isHeightData = tablePriceData.find((el) => el.height);
    if (isHeightData) return getHeightRangeBasedOnCurrentWidth(tablePriceData, width, category)
    return getCabinetHeightRangeBasedOnCategory(category)
}

export const getHeightRangeBasedOnCurrentWidth = (tablePriceData: pricePart[], width: number, category: productCategory): number[] => {
    const isHeightData = tablePriceData.find((el) => el.height);
    if (isHeightData) {
        let arr: number[] = []
        tablePriceData.forEach((el) => {
            if (el.height && el.width === width) arr.push(el.height);
            arr.sort((a, b) => a - b)
        })
        return [...new Set<number>(arr)];
    }
    return getCabinetHeightRangeBasedOnCategory(category)

}

export const getCabinetHeightRangeBasedOnCategory = (category: productCategory): number[] => {
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

export function textToLink(text: string) {
    // Transliterate using Intl (works well for many non-Latin scripts)
    const transliterated = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Convert to lowercase and replace non-alphanumeric characters with hyphens
    return transliterated
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanum with hyphen
        .replace(/^-+|-+$/g, '')     // Remove leading/trailing hyphens
        .replace(/-+/g, '-');        // Replace multiple hyphens with one
}

export const checkoutCartItemWithImg = (cart: MaybeNull<CartItemFrontType[]>) => {
    if (!cart) return [];
    return cart.map(el => {
        const {product_id, product_type, image_active_number} = el
        const product = getProductById(product_id, product_type === 'standard');
        if (!product) return el;
        const img = getCartItemImg(product, image_active_number)
        return ({...el, img: img.replace('webp', 'jpg')})
    })
}

export const findIsProductStandard = (materials: RoomMaterialsFormType): boolean => {
    return materials.door_type === 'Standard White Shaker'
}

export const findHasGolaByCategory = (category: string): boolean => {
    return ['Kitchen', 'Vanity'].includes(category)
}

export const getUniqueNames = (array_of_objects_with_name_field: PurchaseOrderType[] | RoomFront[], exclude?: string): string[] => {
    const converted = array_of_objects_with_name_field.map(el => {
        return el.name.trim().toLowerCase()
    });
    return exclude ? converted.filter(el => textToLink(el) !== exclude) : converted
}

export const me = async (token: MaybeNull<string>) => {
    if (!token) return null;
    if (!isTokenValid(token)) {
        token = await refreshTokenAPI() || null;
        if (!token) return null;
        localStorage.setItem('token', token);
    }
    try {
        return (await usersAPI.me()).data;
    } catch (error) {
        return alertError(error);
    }
}

export const createOrderFormData = async (po_rooms_api:RoomOrderType[], po_blob:Blob, values: CheckoutFormValues, fileName: string, date: string): Promise<FormData> => {
    const rooms = po_rooms_api.map(room => {
        const {_id, purchase_order_id, carts, ...materials} = room;
        const cartFront = convertCartAPIToFront(carts, materials);
        const cart_orders: CartOrder[] = cartFront.map((el) => {
            const {subcategory, isStandard, image_active_number, _id, room_id, ...cart_order_item} = el;
            return cart_order_item;
        })
        return {
            materials,
            orders: cart_orders
        }
    })
    const dataToJSON = {
        date,
        contact: values,
        rooms
    };
    const formData = new FormData();
    const pdfFile = new File([po_blob], `${fileName}.pdf`, {type: "application/pdf"});
    const jsonBlob = new Blob([JSON.stringify(dataToJSON)]);
    const jsonFile = new File([jsonBlob], `${fileName}.json`, {type: 'application/json'});

    formData.append("pdf", pdfFile);
    formData.append("json", jsonFile);
    formData.append("client_email", values.email);
    formData.append("client_name", values.name);
    formData.append("client_purchase_order", values.purchase_order);
    formData.append("client_room_name", values.room_name);
    return formData
}