import {AppDispatch, RootState} from "../store/store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import noImg from './../assets/img/noPhoto.png'
import Fraction from "fraction.js";
import {
    AngleType,
    attrItem,
    CustomPartDataType,
    CustomPartType,
    hingeArr,
    materialsCustomPart,
    MaybeEmpty,
    MaybeNull,
    MaybeUndefined,
    pricePart,
    ProductApiType,
    productCategory,
    productRangeType,
    ProductType,
    productTypings,
    ProductFormType,
    sizeLimitsType,
    valueItemType,
    ProductOrCustomType,
    ProductTableDataType,
    CustomPartTableDataType,
    InitialSizesType, LedAccessoriesFormType, hingeTypes
} from "./productTypes";
import {optionType, optionTypeDoor} from "../common/SelectField";
import cabinets from '../api/cabinets.json';
import {
    calculateProduct,
    getCustomPartPrice,
    getDoorMinMaxValuesArr,
    getMaterialData,
    getProductDataToCalculatePrice,
    getProductPriceRange,
    getProductRange,
    getType, isTexturedColor
} from "./calculatePrice";
import sizes from "../api/sizes.json";
import {MaterialStringsType} from "../common/Materials";
import {
    CustomPartFormType,
    DoorAccessoryAPIType,
    DoorAccessoryFront,
    DoorAccessoryType, RTAClosetAPIType, RTAPartCustomType,
} from "../Components/CustomPart/CustomPart";
import {initialDoorAccessories} from "../Components/CustomPart/CustomPartDoorAccessoiresForm";
import {
    DoorSizesArrType,
    DoorType,
} from "../Components/CustomPart/CustomPartStandardDoorForm";
import {useEffect, useRef} from "react";
import standardColors from '../api/standardColors.json'
import {SliderCategoriesItemType, SliderCategoriesType} from './categoriesTypes';
import categoriesData from "../api/categories.json";
import DA from '../api/doorAccessories.json'
import {initialStandardPanels} from "../Components/CustomPart/CustomPartStandardPanel";
import settings from "../api/settings.json";
import {
    CartAPI,
    CartAPIImagedType,
    CartItemFrontType,
    CartOrder,
    IsStandardOptionsType, LEDAccessoriesType
} from "./cartTypes";
import {
    colorType, doorType, DoorTypesType, drawer, finishType,
    GolaType,
    GolaTypesType, materialsData,
    RoomCategoriesType,
    RoomFront,
    RoomMaterialsFormType,
    RoomOrderType,
    RoomType
} from "./roomTypes";
import {PurchaseOrderType} from "../store/reducers/purchaseOrderSlice";
import {CheckoutFormValues} from "../Components/Checkout/CheckoutForm";
import {initialLEDAccessories} from "../Components/CustomPart/CustomPartLEDForm";

export const urlRegex = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch;

export const getImg = (folder: string, img: MaybeUndefined<string>): string => {
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
    return attributes.filter(el => el.name !== 'Door').map(attribute => {
        const val: valueItemType = attribute.values.find(v => v.type === type) || attribute.values[0]
        return {
            name: attribute.name,
            value: val.value
        }
    })
}

export const getProductImage = (images: MaybeUndefined<string[]>, imgType: productTypings = 1): string => {
    if (!images) return noImg;
    for (let i = imgType; i >= 0; i--) {
        const imgLink = images[i - 1];
        if (imgLink) return getImg('products', imgLink);
    }
    return noImg
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

export function getHingeArr(doorArr: number[], product_id: number, width: number, height: number, product_type: ProductApiType): string[] {
    const [left, right, double, left_2, right_2, single_left, single_right, four] = hingeArr;
    let arr: string[] = [];
    const no_hinge: number[] = [5, 6, 7, 42, 43, 44, 104, 105, 108, 208, 211, 216];
    const tall_type_1: number[] = [201, 202, 203, 204, 214, 215];
    const tall_type_2: number[] = [212, 213];
    const tall_type_3: number[] = [205, 206];
    const tall_type_4: number[] = [217, 218, 219, 220];
    const any_tall_type = tall_type_1.concat(tall_type_2, tall_type_3, tall_type_4);
    const isStandard = product_type === 'standard';

    if (no_hinge.includes(product_id)) return arr;
    // exceptions in standard products
    if (isStandard) {
        if (product_id === 101 && width === 24 && height >= 36) return [double];
        if ([106, 107].includes(product_id) && width <= 21) arr.push(left, right);
    }
    // Tall Cabinets
    if (any_tall_type.includes(product_id)) {
        let tallArr = []
        if (tall_type_1.includes(product_id)) {
            if (doorArr.includes(2)) tallArr.push(left_2, right_2, single_left, single_right);
            if (doorArr.includes(4)) tallArr.push(double, four)
        } else if (tall_type_2.includes(product_id)) {
            tallArr.push(left, right, double)
        } else if (tall_type_3.includes(product_id)) {
            tallArr.push(left_2, right_2, single_left, single_right)
        } else if (tall_type_4.includes(product_id)) {
            tallArr.push(left, right)
        }
        if (isStandard) {
            tallArr = tallArr.filter(el => el !== single_left && el !== single_right);
            if (width >= 24) return [four]
        }
        return tallArr;
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
            const {category, isBlind = false} = product;
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


export const getCustomParts = (category: RoomCategoriesType, isStandardCabinet: boolean, customPartType: "Standard Parts" | "Custom Parts"): CustomPartDataType[] => {
    const customParts = cabinets.filter(el => el.product_type === 'custom') as ProductOrCustomType[];
    const standardIds = [919, 920, 921, 924, 925];
    switch (customPartType) {
        case 'Standard Parts':
            return customParts.filter(el => standardIds.includes(el.id)) as CustomPartDataType[];
        case "Custom Parts":
            let exceptionIds = standardIds;
            if (isStandardCabinet) exceptionIds.push(910, 913)
            if (category !== 'RTA Closet') exceptionIds.push(923)
            return customParts.filter(el => !exceptionIds.includes(el.id)) as CustomPartDataType[];
    }
}

export const getInitialMaterialData = (custom: CustomPartType, materials: RoomMaterialsFormType, isStandardRoom: boolean): MaybeNull<materialsCustomPart> => {
    const {materials_array, id} = custom;
    const {door_finish_material, door_type} = materials
    const filtered_materials_array = filterCustomPartsMaterialsArray(materials_array, id, isStandardRoom)
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
    const {isAngle, isBlind = false, blindArr, middleSectionDefault} = product;
    return checkDimensionsStandard(productRange, width, height, depth, isAngle)
        && checkBlindStandard(isBlind, blind_width, blindArr)
        && checkMiddleSectionStandard(middleSectionDefault, middle_section)
        && checkOptionsSelected(options)
        && checkLedSelected(led_border)
}

export const checkDimensionsStandard = (productRange: productRangeType, width: number, height: number, depth: number, isAngle: MaybeUndefined<AngleType>): boolean => {
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
export const checkDepthStandard = (productRange: productRangeType, depth: number, isAngle: MaybeUndefined<AngleType>): boolean => {
    return !isAngle ? productRange.depthRange.includes(depth) : true;
}
export const checkBlindStandard = (isBlind: boolean, blind_width: number, blindArr?: number[]): boolean => {
    if (!isBlind) return true;
    return blindArr ? blindArr.includes(blind_width) : false;
}
export const checkMiddleSectionStandard = (middleSectionDefault: MaybeUndefined<number>, middle_section: number): boolean => {
    if (!middleSectionDefault) return true;
    return middle_section === middleSectionDefault;
}
export const checkOptionsSelected = (options: string[]): boolean => {
    return !options.length
}
export const checkLedSelected = (led: MaybeUndefined<string[]>): boolean => {
    return !led?.length
}

export const getCustomCabinetString = (isStandard: IsStandardOptionsType): string => {
    return Object.values(isStandard).includes(false) ? 'Custom' : '';
}

export const addProductToCart = (product: ProductType, values: ProductFormType, roomId: string, productEditId: MaybeUndefined<string>): CartAPI => {
    const {id, product_type} = product
    const {
        width,
        blind_width,
        height,
        depth,
        custom_depth,
        hinge_opening,
        corner,
        options: chosenOptions,
        glass_door,
        glass_shelf,
        note,
        led_borders,
        led_alignment,
        led_indent_string,
        custom,

        // Excluded in standard cabinet
        custom_width,
        custom_height,
        custom_blind_width,
        middle_section,
        amount
    } = values;

    const realW = width || +custom_width || 0;
    const realH = height || +custom_height || 0;
    const realD = depth || +custom_depth || 0;
    const realMiddle = +middle_section || 0
    const realBlind = +blind_width || +custom_blind_width || 0;

    return {
        _id: productEditId ?? '',
        room_id: roomId,
        product_id: id,
        product_type: product_type,
        amount,
        width: realW,
        height: realH,
        depth: realD,
        blind_width: realBlind,
        middle_section: realMiddle,
        hinge: hinge_opening,
        corner: corner,
        options: chosenOptions,
        glass: {
            door: glass_door,
            shelf: glass_shelf,
        },
        led: {
            border: led_borders,
            alignment: led_alignment,
            indent: led_indent_string,
        },
        note,
        custom: {
            accessories: {
                closet: custom?.closet_accessories
            },
            jewelery_inserts: custom?.jewelery_inserts,
            mechanism:custom?.mechanism
        }
    }
}

export const addToCartCustomPart = (values: CustomPartFormType, product: CustomPartType, roomId: string, productEditId: MaybeUndefined<string>): CartAPI => {
    let {
        width,
        height,
        depth,
        material,
        note,
        glass_door,
        glass_shelf,
        door_accessories,
        led_accessories,
        standard_doors,
        standard_panels,
        rta_closet_custom,
        groove,
        drawer_inserts
    } = values;

    const {id, product_type, name} = product;

    // Update L-Shape
    if (name === 'L Shape') {
        const min = Math.min(width, height);
        const max = Math.max(width, height);
        width = min;
        height = max;
    }

    let preparedProduct: CartAPI = {
        _id: productEditId ?? '',
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
        custom: {},
        note: note
    }

    function forceSetPath<T extends object>(
        obj: T,
        path: string,
        value: any
    ): void {
        const keys = path.split('.');
        let current: any = obj;

        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];

            if (current[key] === undefined || typeof current[key] !== 'object') {
                current[key] = {};
            }

            current = current[key];
        }

        current[keys[keys.length - 1]] = value;
    }

    if (material) forceSetPath(preparedProduct, 'custom.material', material);

    // LED Accessories
    if (led_accessories) {
        const {
            alum_profiles,
            gola_profiles,
            transformer_60_W,
            transformer_100_W,
            remote_control,
            door_sensor_single,
            door_sensor_double
        } = led_accessories;

        const alum_profiles_api = alum_profiles.map(el => ({
            length: el.length,
            qty: el.qty
        }));
        const gola_profiles_api = gola_profiles.map(el => ({
            length: el.length,
            qty: el.qty,
            color: el.color
        }));

        if (alum_profiles_api.length) forceSetPath(preparedProduct, 'custom.accessories.led.alum_profiles', alum_profiles_api);
        if (gola_profiles_api.length) forceSetPath(preparedProduct, 'custom.accessories.led.gola_profiles', gola_profiles_api);
        if (transformer_60_W) forceSetPath(preparedProduct, 'custom.accessories.led.transformer_60_W', transformer_60_W);
        if (transformer_100_W) forceSetPath(preparedProduct, 'custom.accessories.led.transformer_100_W', transformer_100_W);
        if (remote_control) forceSetPath(preparedProduct, 'custom.accessories.led.remote_control', remote_control);
        if (door_sensor_single) forceSetPath(preparedProduct, 'custom.accessories.led.door_sensor_single', door_sensor_single);
        if (door_sensor_double) forceSetPath(preparedProduct, 'custom.accessories.led.door_sensor_double', door_sensor_double);
    }

    //Door Accessories
    if (door_accessories) forceSetPath(preparedProduct, 'custom.accessories.door', door_accessories.filter(el => el.qty > 0));

    // Standard panels
    if (standard_panels) {
        const {standard_panel, shape_panel, wtk, crown_molding} = standard_panels;
        const standard_panel_api = standard_panel.map(el => ({qty: el.qty, name: el.name}));
        const shape_panel_api = shape_panel.map(el => ({qty: el.qty, name: el.name}));
        const wtk_api = wtk.map(el => ({qty: el.qty, name: el.name}));
        if (standard_panel_api.length) forceSetPath(preparedProduct, 'custom.standard_panels.standard_panel', standard_panel_api);
        if (shape_panel_api.length) forceSetPath(preparedProduct, 'custom.standard_panels.shape_panel', shape_panel_api);
        if (wtk_api.length) forceSetPath(preparedProduct, 'custom.standard_panels.wtk', wtk_api);
        if (crown_molding) forceSetPath(preparedProduct, 'custom.standard_panels.crown_molding', crown_molding);
    }

    if (standard_doors) forceSetPath(preparedProduct, 'custom.standard_doors', standard_doors.filter(el => el.qty > 0 && el.name));


    // RTA
    if (rta_closet_custom) {
        const rta_closet_custom_api: RTAClosetAPIType[] = rta_closet_custom.map(el => ({
            qty: el.qty,
            name: el.name,
            width: el.width
        }))
        if (rta_closet_custom_api.length) forceSetPath(preparedProduct, 'custom.rta_closet', rta_closet_custom_api)
    }

    //Groove
    if (groove) {
        forceSetPath(preparedProduct, 'custom.groove', groove);
    }

    //Drawer Inserts
    if (drawer_inserts) {
        forceSetPath(preparedProduct, 'custom.drawer_inserts', drawer_inserts);
    }

    return preparedProduct;
}

const isHasLedBlock = (category: productCategory): boolean => {
    const ledCategoryArr = ['Wall Cabinets', 'Gola Wall Cabinets'];
    return ledCategoryArr.includes(category)
}

export const isGolaTypeShown = (category: MaybeEmpty<RoomCategoriesType>, hasGola: boolean): boolean => {
    if (!category) return false;
    return hasGola
}

export const isGolaShown = (category_gola_type: MaybeEmpty<GolaTypesType>): boolean => {
    if (!category_gola_type) return false
    return category_gola_type.includes('Gola')
}

export const isDoorTypeShown = (values: RoomMaterialsFormType, showGola: boolean): boolean => {
    const {category, category_gola_type, gola} = values;
    if (!category) return false;
    switch (category as RoomCategoriesType) {
        case "RTA Closet":
            return false;
        case "Kitchen":
        case "Vanity": {
            if (!category_gola_type) return false;
            return showGola ? !!gola : true
        }
        default: {
            return true
        }
    }
}

export const isGrooveShown = (door_type: MaybeEmpty<DoorTypesType>) => {
    if (door_type === 'Wood ribbed doors') return true;
    return false;
}

export const isDoorFinishShown = (values: RoomMaterialsFormType, finishArr: finishType[], showGroove: boolean): boolean => {
    const {category, door_type, groove} = values
    if (!category) return false;
    if (category === 'RTA Closet') return false;
    if (door_type === 'Standard Size White Shaker') return false;
    if (showGroove && !groove) return false;
    return !!(door_type && finishArr.length)
}

export const isDoorColorShown = (values: RoomMaterialsFormType, colorArr: colorType[], showDoorFrameWidth: boolean): boolean => {
    const {category, door_type, door_finish_material, door_frame_width} = values
    if (!category) return false;
    if (category === 'RTA Closet') return false;
    if (door_type === 'Standard Size White Shaker') return true;
    if (showDoorFrameWidth && !door_frame_width) return false;
    return !!(door_finish_material && colorArr.length)
}

export const isDoorFrameWidth = (values: RoomMaterialsFormType, frameArr: MaybeUndefined<materialsData[]>): boolean => {
    const {category, door_type, door_finish_material} = values;
    if (!category) return false;
    if (category === 'RTA Closet') return false;
    if (!frameArr || door_type !== 'Micro Shaker') return false
    return !!door_finish_material
}

export const isDoorGrain = (category:string, door_finish_material:string , grainArr: MaybeNull<materialsData[]>): boolean => {
    if (!category || category === 'RTA Closet' || !door_finish_material) return false;
    return !!grainArr?.length
}

export const isBoxMaterial = (values: RoomMaterialsFormType, boxMaterialArr: finishType[], showDoorFinish: boolean, showDoorColor: boolean, showDoorGrain: boolean): boolean => {
    const {category, door_grain, door_finish_material, door_color, door_type} = values;
    if (!category || !boxMaterialArr.length) return false;
    switch (category as RoomCategoriesType) {
        case "RTA Closet":
            return true;
        default:
            switch (door_type as DoorTypesType) {
                case "No Doors":
                    return true;
                case "Wood ribbed doors":
                    return !!door_finish_material;
                default:
                    if (showDoorFinish && !door_finish_material) return false;
                    if (showDoorColor && !door_color) return false;
                    if (showDoorGrain && !door_grain) return false;
                    return !!door_color
            }
    }

}

export const isBoxColor = (box_material: string,isCloset: boolean): boolean => {
    if (!box_material) return false;
    return isCloset
}

export const isDrawerBrand = (box_material: string, box_color: string, isCloset: boolean): boolean => {
    if (!box_material) return false;
    return !(isCloset && !box_color);
}

export const isDrawerType = (showDrawerBrand: boolean, drawer_brand: string, drawerTypesArr: materialsData[]): boolean => {
    if (!showDrawerBrand) return false;
    return !(!drawer_brand || !drawerTypesArr.length);
}

export const isDrawerColor = (showDrawerType: boolean, drawer_type: string, drawerColorsArr: materialsData[]): boolean => {
    if (!showDrawerType) return false;
    return !(!drawer_type || drawer_type === 'Undermount' || !drawerColorsArr.length);
}

export const getDrawerBrandArr = (drawers: drawer[]): materialsData[] => {
    return drawers.map(el => ({value: el.value, img: el.img})) as materialsData[] ?? [];
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
    return drawerTypesArrFilter.find(el => el.value === drawer_type)?.colors as materialsData[] ?? [];

}

export const getDoorTypeArr = (doors: doorType[], gola: MaybeEmpty<GolaType>, isLeather: boolean): doorType[] => {
    let arr = doors;
    if (gola) {
        arr = arr.filter(el => el.value !== 'Standard Size White Shaker');
    }
    if (isLeather) {
        const exceptions = ["No Doors", "Three Piece Door", "Finger Pull", "Standard Size White Shaker"]
        arr = arr.filter(el => !exceptions.includes(el.value));
    }
    return arr;
}

export const getDoorFinishArr = (doors: doorType[], door_type: MaybeEmpty<DoorTypesType>): finishType[] => {
    return doors.find(el => el.value === door_type)?.finish ?? [];
}

export const getDoorColorsArr = (doorFinishMaterial: string, doorType: MaybeEmpty<DoorTypesType>, finishArr: finishType[]): colorType[] => {
    const isStandardDoor = findIsRoomStandard(doorType);
    if (isStandardDoor) return standardColors.colors as colorType[] || [];
    if (doorType === 'Custom Painted Shaker') return finishArr?.[0].colors || [];
    return finishArr?.find(el => el.value === doorFinishMaterial)?.colors || [];
}

export const getBoxMaterialArr = <T, U>(isCloset: boolean, boxMaterial: T[], leatherBoxMaterialArr: U[]): (T | U)[] => {
    return isCloset ? leatherBoxMaterialArr : boxMaterial
}


export const getBoxMaterialColorsArr = (isLeather: boolean, isRTACloset: boolean, boxMaterialType: string, boxMaterialsArr: finishType[], boxMaterialAPI: materialsData[]): colorType[] => {
    const colorsArr: MaybeUndefined<colorType[]> = boxMaterialsArr.find(el => el.value === boxMaterialType)?.colors;
    if (!colorsArr) return [];
    if (isLeather) return colorsArr;
    if (isRTACloset) return boxMaterialType === 'Milino' ? boxMaterialAPI : colorsArr;
    return [];
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

export const checkDoors = (hingeOpening: hingeTypes): number => {
    // if (!doorArr && doors) return 0;
    // if (doorArr?.length === 1 && doors !== doorArr[0]) return doorArr[0];
    // if (doors === 1 && doorArr?.includes(2) && hingeOpening === 'Double Door') return 2
    // if (doors === 2 && doorArr?.includes(1) && ['Left', 'Right'].includes(hingeOpening)) return 1
    // if (['Left', 'Right'].includes(hingeOpening)) return 1
    if (!hingeOpening) return 0;
    if (hingeOpening === 'Left' || hingeOpening === 'Right' || hingeOpening === 'Single left door' || hingeOpening === 'Single right door') return 1;
    if (hingeOpening === 'Double Doors' || hingeOpening === 'Two left doors' || hingeOpening === 'Two right doors') return 2
    if (hingeOpening === 'Four doors') return 4;
    return 0
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
    // Exceptions
    const noDoorsArr: number[] = [28];
    if (noDoorsArr.includes(product_id)) return 0;
    return +((doorWidth * doorHeight) / 144).toFixed(2)
}

export const getWidthToCalculateDoor = (realWidth: number, blind_width: number, isAngle: MaybeUndefined<AngleType>, isWallCab: boolean): number => {
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
        led
    } = item;
    const materialData = getMaterialData(room, product_id);
    const {
        is_standard_room,
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
                isAngle,
                isBlind = false,
                middleSectionDefault,
                blindArr
            } = product

            const tablePriceData = getProductPriceRange(product_id, is_standard_room, base_price_type);
            if (!tablePriceData) return null;

            const productPriceData = getProductDataToCalculatePrice(product, drawer_brand);
            const {doorValues} = productPriceData;
            const doorArr = getDoorMinMaxValuesArr(width, doorValues);
            const doors = checkDoors(hinge)
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
                    led: checkLedSelected(led?.border),
                    options: checkOptionsSelected(options),
                    middle: checkMiddleSectionStandard(middleSectionDefault, middle_section)
                }
            }
        }
        case "custom": {
            const customPart = product_or_custom as CustomPartType;
            const {type} = customPart;
            let price: number = getCustomPartPrice(customPart, room, item);

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

export const getLEDProductCartPrice = (led: LEDAccessoriesType): number => {
    const {
        alum_profiles = [],
        gola_profiles = [],
        transformer_60_W = 0,
        transformer_100_W = 0,
        remote_control = 0,
        door_sensor_single = 0,
        door_sensor_double = 0,
    } = led;
    const pricesAPI = settings.led_custom_part;
    const alumProfPrice = alum_profiles.reduce((acc, profile) => acc + (profile.length * pricesAPI.alum_profiles * profile.qty), 0);
    const golaProfPrice = gola_profiles.reduce((acc, profile) => acc + (profile.length * pricesAPI.gola_profiles * profile.qty), 0);
    const transformer60Price = transformer_60_W * pricesAPI.transformer_60_W || 0;
    const transformer100Price = transformer_100_W * pricesAPI.transformer_100_W || 0;
    const remoteControlPrice = remote_control * pricesAPI.remote_control || 0;
    const doorSensorSinglePrice = door_sensor_single * pricesAPI.door_sensor_single || 0;
    const doorSensorDoublePrice = door_sensor_double * pricesAPI.door_sensor_double || 0;
    return alumProfPrice + golaProfPrice + transformer60Price + transformer100Price + remoteControlPrice + doorSensorSinglePrice + doorSensorDoublePrice
}

export const getFinishColorCoefCustomPart = (id: number, material: MaybeUndefined<string>, door_color: string): number => {
    // Choose Panels only
    if (![903].includes(id)) return 1;
    // Choose Material (In Product Page)
    if (material !== 'Milino') return 1;
    // Door Color from Materials page
    if (isTexturedColor(door_color)) return 1.1;
    if (door_color.includes('Ultra Matte')) return 1.2;
    return 1;
}

export const getCartItemImgPDF = (images: string[], image_active_number: productTypings): string => {
    for (let i = image_active_number; i >= 0; i--) {
        const imgLink = images[i - 1];
        if (imgLink) return getImg('products-checkout', imgLink.replace('webp', 'jpg'));
    }
    return noImg
}

export const convertDoorAccessories = (el: DoorAccessoryAPIType): DoorAccessoryType => {
    const doorAccessories = DA as DoorAccessoryFront[];
    const item = doorAccessories.find(ac => ac.value === el.value);
    if (!item) return {...doorAccessories[0], qty: el.qty}
    return {...item, qty: el.qty}
}

export function usePrevious<T>(data: T) {
    const prev = useRef<T>()
    useEffect(() => {
        if (data) prev.current = data;
    }, [data])
    return prev.current
}

export const getdimensionsRow = (width: number, height: number, depth: number): string => {
    // if (width && !height && !depth) return `${getFraction(width)}"Width`
    const widthPart = width ? `${getFraction(width)}"W x` : '';
    const heightPart = height ? ` ${getFraction(height)}"H` : '';
    const depthPart = depth && depth > 1 ? ` x ${getFraction(depth)}"D` : '';
    return `${widthPart}${heightPart}${depthPart}`
}

export const isShowBlindWidthBlock = (blindArr: MaybeUndefined<number[]>, product_type: ProductApiType): boolean => {
    return (!(product_type === 'standard' || !blindArr || !blindArr.length));
}

export const isShowMiddleSectionBlock = (middleSectionDefault: MaybeUndefined<number>, isProductStandard: boolean): boolean => {
    return !!(!isProductStandard && middleSectionDefault)
}

export const isShowHingeBlock = (hingeArr: string[]): boolean => {
    if (hingeArr.length < 2) return false;
    return true
}

export const getSliderCategories = (room: RoomType): SliderCategoriesItemType => {
    const API = categoriesData as SliderCategoriesType;
    const {category, gola, door_type} = room;
    if (door_type === 'Standard Size White Shaker') return API['Standard Door'] as SliderCategoriesItemType;
    switch (category) {
        case "Kitchen":
            return !gola ? API['Kitchen'] : API['Kitchen Gola'] as SliderCategoriesItemType;
        case "Vanity":
            return !gola ? API['Vanity'] : API['Vanity Gola'] as SliderCategoriesItemType;
        case "Leather Closet":
            return API['Leather Closet'] as SliderCategoriesItemType;
        case "Build In Closet":
            return API['Build In Closet'] as SliderCategoriesItemType;
        case "RTA Closet":
            return API['RTA Closet'] as SliderCategoriesItemType;
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

export function prepareToSelectField(arr: (string|optionType)[]): optionType[] {
    return arr.map(el => {
        if (typeof el !== 'string') return el;
        return {
            value: el,
            label: el
        }
    })
}

export const getProfileList = (is_custom: boolean): optionType[] => {
    const profile = settings['Glass']['Profile'];
    const profileFiltered = is_custom ? profile.filter(el => el.value !== 'Wood Shaker') : profile;
    return prepareToSelectField(profileFiltered.map(el => el.value));
}

export const getGlassTypeList = (): optionType[] => {
    return prepareToSelectField(['Glass', 'Mirror']);
}

export const getColorsList = (glassType: string): optionType[] => {
    switch (glassType) {
        case 'Glass':
            return prepareToSelectField(settings.Glass.Glass);
        case 'Mirror':
            return prepareToSelectField(settings.Glass.Mirror);
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
        case "RTA Closets":
            return [95]
        default:
            return []
    }
}

export function textToLink(text: MaybeUndefined<string>) {
    if (!text) return '';
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
        const img = getProductImage(product.images, image_active_number)
        return ({...el, img: img.replace('webp', 'jpg')})
    })
}

export const findIsRoomStandard = (door_type: MaybeEmpty<DoorTypesType>): boolean => {
    return door_type === 'Standard Size White Shaker'
}

export const findHasGolaTypeByCategory = (category: MaybeEmpty<RoomCategoriesType>): boolean => {
    return ['Kitchen', 'Vanity'].includes(category)
}

export const filterGolaTypeArrByCategory = (category: MaybeEmpty<RoomCategoriesType>, arr: materialsData[]): materialsData[] => {
    if (!category) return [];
    return arr.filter(el => el.value.includes(category)) ?? [];
}

export const getUniqueNames = (array_of_objects_with_name_field: PurchaseOrderType[] | RoomFront[], exclude?: string): string[] => {
    const converted = array_of_objects_with_name_field.map(el => {
        return el.name.trim().toLowerCase()
    });
    return exclude ? converted.filter(el => textToLink(el) !== exclude) : converted
}

export const createOrderFormData = async (po_rooms_api: RoomOrderType[], po_blob: Blob, values: CheckoutFormValues, fileName: string, date: string): Promise<FormData> => {
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

export const createOrderFormRoomData = async (room: RoomFront, cart_items: CartItemFrontType[], room_blob: Blob, values: CheckoutFormValues, fileName: string, date: string): Promise<FormData> => {
    const {_id, purchase_order_id, activeProductCategory, name, ...materials} = room;
    const cart_orders: CartOrder[] = cart_items.map((el) => {
        const {subcategory, isStandard, image_active_number, _id, room_id, ...cart_order_item} = el;
        return cart_order_item;
    })

    const dataToJSON = {
        date,
        contact: values,
        room: {
            materials,
            orders: cart_orders
        }
    };
    const formData = new FormData();
    const pdfFile = new File([room_blob], `${fileName}.pdf`, {type: "application/pdf"});
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


export const getProductInitialTableData = (product: ProductType, materials: RoomMaterialsFormType): MaybeUndefined<ProductTableDataType> => {
    const {
        id: product_id,
        category,
        customHeight,
        customDepth,
        middleSectionDefault,
        blindArr,
        isCornerChoose,
        hasLedBlock,
        isBlind = false
    } = product
    const materialData = getMaterialData(materials, product_id);
    const {base_price_type, is_standard_room} = materialData;
    const tablePriceData = getProductPriceRange(product_id, is_standard_room, base_price_type);
    const productRange = getProductRange(tablePriceData, category as productCategory, customHeight, customDepth);
    const sizeLimit: MaybeUndefined<sizeLimitsType> = sizes.find(size => size.productIds.includes(product_id))?.limits;
    const middleSectionNumber = middleSectionDefault ?? 0;
    const middleSection = middleSectionNumber ? getFraction(middleSectionNumber) : '';
    const blindWidth = blindArr ? blindArr[0] : '';
    const corner = isCornerChoose ? 'Left' : '';
    const ledAlignment = hasLedBlock ? 'Center' : '';
    const productPriceData = getProductDataToCalculatePrice(product, materials.drawer_brand);
    if (!sizeLimit || !tablePriceData || !productRange.widthRange.length) return undefined
    return {
        materialData,
        tablePriceData,
        widthRange: productRange.widthRange,
        heightRange: productRange.heightRange,
        depthRange: productRange.depthRange,
        sizeLimit,
        middleSectionNumber,
        middleSection,
        blindWidth,
        corner,
        ledAlignment,
        isBlind,
        productPriceData
    }
}

export const getProductInitialFormValues = (productData: ProductTableDataType, cartItemValues: MaybeUndefined<CartItemFrontType>, product: ProductType): ProductFormType => {
    const {
        widthRange,
        heightRange,
        depthRange,
        middleSection,
        middleSectionNumber,
        corner: cornerTable,
        ledAlignment,
        isBlind,
        blindWidth,
        tablePriceData,
    } = productData
    if (!cartItemValues) {
        return {
            width: widthRange[0],
            blind_width: blindWidth,
            height: heightRange[0],
            depth: depthRange[0],
            custom_width_string: '',
            custom_blind_width_string: '',
            custom_height_string: '',
            custom_depth_string: '',
            custom_width: '',
            custom_blind_width: '',
            custom_height: '',
            custom_depth: '',
            middle_section_string: middleSection,
            middle_section: middleSectionNumber,
            doors_amount: 0,
            hinge_opening: '',
            corner: cornerTable,
            options: [],
            led_borders: [],
            led_alignment: ledAlignment,
            led_indent_string: '',
            glass_door: ['', '', ''],
            glass_shelf: '',
            image_active_number: 1,
            custom: null,
            note: '',
            price: 0,
            amount: 1
        }
    }
    const {
        width,
        height,
        depth,
        blind_width,
        price,
        note,
        image_active_number,
        corner,
        led,
        glass,
        hinge,
        middle_section,
        options,
        custom,
        amount
    } = cartItemValues;

    const {customHeight, customDepth, category, isAngle, blindArr} = product;
    const productRange = getProductRange(tablePriceData, category, customHeight, customDepth);
    const isStandardWidth = checkWidthStandard(productRange, width)
    const isStandardHeight = checkHeightStandard(productRange, height)
    const isStandardDepth = checkDepthStandard(productRange, depth, isAngle)
    const isBlindStandard = checkBlindStandard(isBlind, blind_width, blindArr)

    // const {doorValues} = productPriceData;
    // const doorArr = getDoorMinMaxValuesArr(width, doorValues);
    const doors = checkDoors(hinge);

    let customVal = null;
    if (custom?.accessories?.closet) customVal = {closet_accessories: custom.accessories.closet};
    if (custom?.mechanism) customVal = {mechanism: custom.mechanism};

    return {
        width: isStandardWidth ? width : 0,
        blind_width: isBlindStandard ? blind_width : "",
        height: isStandardHeight ? height : 0,
        depth: isStandardDepth ? depth : 0,
        custom_width_string: !isStandardWidth ? getFraction(width) : '',
        custom_blind_width_string: !isBlindStandard ? getFraction(blind_width) : "",
        custom_height_string: !isStandardHeight ? getFraction(height) : '',
        custom_depth_string: !isStandardDepth ? getFraction(depth) : '',
        custom_width: !isStandardWidth ? width : '',
        custom_blind_width: !isBlindStandard ? blind_width : "",
        custom_height: !isStandardHeight ? height : '',
        custom_depth: !isStandardDepth ? depth : '',
        middle_section_string: getFraction(middle_section),
        middle_section: middle_section,
        doors_amount: doors,
        hinge_opening: hinge,
        corner,
        options,
        led_borders: led?.border || [],
        led_alignment: led?.alignment || '',
        led_indent_string: led?.indent || '',
        glass_door: glass?.door || [],
        glass_shelf: glass?.shelf || '',
        image_active_number: image_active_number,
        custom: customVal,
        note,
        price,
        amount
    }

}

const getInitialSizes = (customPart: CustomPartType, initialMaterialData: MaybeNull<materialsCustomPart>): InitialSizesType => {
    const {width, height, depth, limits, height_range} = customPart
    const sizeLimitInitial = initialMaterialData?.limits ?? limits ?? {};
    const w = width ?? getLimit(sizeLimitInitial.width);
    const h = height ?? (height_range ? getLimit(height_range) : getLimit(sizeLimitInitial.height));
    const d = initialMaterialData?.depth ?? depth ?? getLimit(sizeLimitInitial.depth);
    return {
        initial_width: w,
        initial_height: h,
        initial_depth: d
    }
}

export const getCustomPartInitialTableData = (custom_part: CustomPartType, materials: RoomMaterialsFormType, isRoomStandard: boolean): CustomPartTableDataType => {
    const initialMaterialData = getInitialMaterialData(custom_part, materials, isRoomStandard);
    const initialSizes = getInitialSizes(custom_part, initialMaterialData);
    const isDoorAccessories = ["door-accessories"].includes(custom_part.type);
    const isStandardPanel = ["standard-panel"].includes(custom_part.type);
    const isLEDAccessories = ["led-accessories"].includes(custom_part.type);
    const isStandardDoor = ['standard-doors', 'standard-glass-doors'].includes(custom_part.type);

    const initialDoorAccessoriesData: MaybeNull<DoorAccessoryType[]> = isDoorAccessories ? initialDoorAccessories : null;
    const initialStandardPanelsData = isStandardPanel ? initialStandardPanels : null;
    const initialLEDAccessoriesData = isLEDAccessories ? initialLEDAccessories : null;

    const standardDoorData = isStandardDoor ?
        custom_part.type === 'standard-doors' ?
            settings.StandardDoorSizes as DoorSizesArrType[] :
            settings.glassDoorSizes as DoorSizesArrType[] :
        null;

    return {
        initialMaterialData,
        initialSizes,
        initialDoorAccessories: initialDoorAccessoriesData,
        initialStandardPanels: initialStandardPanelsData,
        initialLEDAccessories: initialLEDAccessoriesData,
        standardDoorData
    }
}

export const getCustomPartInitialFormValues = (customPartData: CustomPartTableDataType, cartItemValues: MaybeUndefined<CartItemFrontType>): CustomPartFormType => {
    const {
        initialSizes,
        initialMaterialData,
        initialDoorAccessories,
        initialStandardPanels,
        initialLEDAccessories,
        standardDoorData
    } = customPartData;
    const {initial_width, initial_height, initial_depth} = initialSizes

    if (!cartItemValues) {
        return {
            width_string: getFraction(initial_width),
            height_string: getFraction(initial_height),
            depth_string: getFraction(initial_depth),
            width: initial_width,
            height: initial_height,
            depth: initial_depth,
            material: initialMaterialData?.name || '',
            glass_door: ['', '', ''],
            glass_shelf: '',
            led_accessories: initialLEDAccessories,
            door_accessories: initialDoorAccessories,
            standard_doors: null,
            standard_panels: initialStandardPanels,
            rta_closet_custom: [],
            groove: null,
            drawer_inserts: null,
            note: '',
            price: 0,
        }
    } else {
        const {width, height, depth, custom, note, price, glass} = cartItemValues;
        const {standard_doors, standard_panels, material, rta_closet, accessories, groove, drawer_inserts} = custom!;
        const LEDAccessoriesValues: MaybeNull<LedAccessoriesFormType> = accessories?.led ? {
            alum_profiles: accessories.led.alum_profiles.map(el => ({
                qty: el.qty,
                length_string: getFraction(el.length),
                length: el.length
            })),
            gola_profiles: accessories.led.gola_profiles.map(el => ({
                qty: el.qty,
                length_string: getFraction(el.length),
                length: el.length,
                color: el.color
            })),
            transformer_60_W: accessories.led.transformer_60_W,
            transformer_100_W: accessories.led.transformer_100_W,
            remote_control: accessories.led.remote_control,
            door_sensor_single: accessories.led.door_sensor_single,
            door_sensor_double: accessories.led.door_sensor_double
        } : null;

        const doorAccessories = DA as DoorAccessoryFront[]
        let doorAccessoriesValues: MaybeNull<DoorAccessoryType[]> = null;
        if (accessories && accessories.door) {
            doorAccessoriesValues = doorAccessories.map(el => {
                const {value, id, price, label, filter} = el;
                let qty: number = 0;
                if (accessories.door) {
                    qty = accessories.door.find(el => el.value === value)?.qty ?? 0;
                }
                return {
                    id,
                    label,
                    filter,
                    price,
                    value,
                    qty
                }
            })
        }

        const standardDoorValues: MaybeNull<DoorType[]> = standardDoorData && standard_doors ?
            standard_doors.map(el => ({
                ...el, name: standardDoorData.find(d => d.width === el.width && d.height === el.height)?.value || ''
            })) : null;

        const rtaClosetValues: MaybeNull<RTAPartCustomType[]> = rta_closet ? rta_closet.map(el => ({
            ...el,
            width_string: getFraction(el.width)
        })) : null;

        return {
            width_string: getFraction(width),
            height_string: getFraction(height),
            depth_string: getFraction(depth),
            width,
            height,
            depth,
            material: material ?? '',
            glass_door: glass?.door ?? ['', '', ''],
            glass_shelf: glass?.shelf ?? '',
            led_accessories: LEDAccessoriesValues,
            door_accessories: doorAccessoriesValues,
            standard_doors: standardDoorValues,
            standard_panels: standard_panels ?? null,
            rta_closet_custom: rtaClosetValues,
            groove: groove ?? null,
            drawer_inserts: drawer_inserts ?? null,
            note,
            price: price,
        }
    }
}

export const isClosetLeatherOrRTA = (category: MaybeEmpty<RoomCategoriesType>): boolean => {
    if (!category) return false;
    return category === 'Leather Closet' || category === 'RTA Closet'
}