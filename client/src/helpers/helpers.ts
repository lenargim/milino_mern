import {AppDispatch, RootState, store} from "../store/store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import noImg from './../assets/img/noPhoto.png'
import Fraction from "fraction.js";
import {
    AngleType,
    attrItem, cornerTypes, CustomPartType, customPartDataType, hingeTypes,
    itemImg, materialDataType, materialsCustomPart, MaybeEmpty, MaybeNull, MaybeUndefined, ProductApiType,
    productCategory,
    productRangeType, ProductType,
    productTypings, RoomCategories, sizeLimitsType, valueItemType, pricePartStandardPanel
} from "./productTypes";
import {optionType, optionTypeDoor} from "../common/SelectField";
import {
    fillCart,
} from "../store/reducers/generalSlice";
import cabinets from '../api/cabinets.json';
import standardCabinets from '../api/standartProducts.json'
import customParts from '../api/customPart.json';
import {RoomType} from "./categoriesTypes";
import {colorType, doorType, drawer, drawerType, finishType, materialsData} from "./materialsTypes";
import {
    getAttributesProductPrices,
    getBlindArr, getCustomPartPrice,
    getDoorMinMaxValuesArr,
    getMaterialData, getProductCoef,
    getProductDataToCalculatePrice, getProductPriceRange, getProductRange, getStandardPanelPrice,
    getStartPrice,
    getTablePrice,
    getType
} from "./calculatePrice";
import {v4 as uuidv4} from "uuid";
import {ledAlignmentType} from "../Components/Product/LED";
import {CabinetItemType, CartAPIResponse, CartItemType, IsStandardOptionsType} from "../api/apiFunctions";
import {RoomFront, RoomTypeAPI} from "../store/reducers/roomSlice";
import sizes from "../api/sizes.json";
import {materialsFormInitial, MaterialsFormType} from "../common/MaterialsForm";
import {MaterialStringsType} from "../common/Materials";
import {
    CustomPartFormValuesType, DoorAccessoireAPIType, DoorAccessoireFront, DoorAccessoireType,
} from "../Components/CustomPart/CustomPart";
import {LEDAccessoriesType} from "../Components/CustomPart/LEDForm";
import {addToCartAccessories} from "../Components/CustomPart/DoorAccessoiresForm";
import {getCustomPartStandardDoorPrice} from "../Components/CustomPart/StandardDoorForm";
import {useEffect, useRef} from "react";
import standardColors from '../api/standardColors.json'
import {catInfoType} from "../Components/Cabinets/Slider";
import categoriesData from "../api/categories.json";
import DA from '../api/doorAccessories.json'
import {emptyUser, setIsAuth, setUser} from "../store/reducers/userSlice";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const getImg = (folder: string, img: string = ''): string => {
    if (!folder || !img) return noImg;
    try {
        return require(`./../assets/img/${folder}/${img}`)
    } catch (e) {
        return noImg
    }
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

export const getCartTotal = (cart: (CartItemType)[]): number => {
    return +(cart.reduce(
        (acc, currentVal) => acc + (currentVal.price * currentVal.amount), 0
    )).toFixed(1)
}

export const getFraction = (numberFraction: number): string => {
    return new Fraction(numberFraction).simplify(0.001).toFraction(true);
}


export const getProductsByCategory = (room: RoomType, category: productCategory, isStandardCabinet: boolean): ProductType[] => {
    const products = (isStandardCabinet ? standardCabinets : cabinets) as ProductType[]
    return products.filter(product => product.category === category);
}

export const getProductById = (id: number, isProductStandard: boolean): MaybeNull<ProductType> => {
    let product;
    if (isProductStandard) {
        product = standardCabinets.find(product => product.id === id) as ProductType
    } else {
        product = cabinets.find(product => product.id === id) as ProductType
    }

    if (!product) return null;
    const {category, isBlind} = product as ProductType;
    const hasLedBlock = isHasLedBlock(category);
    const product_type = getProductApiType(product.category, isProductStandard)
    return {
        ...product,
        isProductStandard,
        hasLedBlock,
        blindArr: isBlind ? getBlindArr(category, product.id) : undefined,
        product_type: product_type
    }
}

export const getCustomParts = (room: RoomType, isStandardCabinet: boolean): customPartDataType[] => {
    if (!isStandardCabinet) {
        const standardDoorCustomParts = customParts.filter(el => el.name !== 'Standard Door' && el.name !== 'Glass Door')
        return standardDoorCustomParts as customPartDataType[];
    }
    return customParts as customPartDataType[];
}

export const getCustomPartById = (id: number): MaybeNull<CustomPartType> => {
    const arr = customParts as CustomPartType[];
    const product = arr.find(part => +part.id === id);
    return product ? product : null;
}


export const getInitialMaterialData = (custom: CustomPartType, materials: MaterialsFormType): MaybeNull<materialsCustomPart> => {
    const {materials_array} = custom;
    const {door_finish_material, door_type} = materials
    if (!materials_array) return null;
    return materials_array.find(el => door_finish_material.includes(el.name))
        ?? materials_array.find(el => door_type === el.name)
        ?? materials_array[0];
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

export interface productValuesType extends initialStandardValues {
    "Custom Width": MaybeEmpty<number>,
    'Custom Blind Width': MaybeEmpty<number>,
    'Custom Height': MaybeEmpty<number>,
    "Custom Width Number": MaybeEmpty<number>,
    'Custom Blind Width Number': MaybeEmpty<number>,
    'Custom Height Number': MaybeEmpty<number>,
    'Custom Depth Number': MaybeEmpty<number>,
    'Middle Section Number': MaybeEmpty<number>,
    'Door Profile': string,
    'Door Glass Type': string,
    'Door Glass Color': string,
    'Shelf Profile': string,
    'Shelf Glass Type': string,
    'Shelf Glass Color': string,
}

export interface standardProductValuesType extends initialStandardValues {
    'Custom Depth Number': MaybeEmpty<number>,
    'Door Profile': string,
    'Door Glass Type': string,
    'Door Glass Color': string,
    'Shelf Profile': string,
    'Shelf Glass Type': string,
    'Shelf Glass Color': string,
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

export const addProductToCart = (product: ProductType, values: productValuesType, productRange: productRangeType, roomId: MaybeUndefined<string>, materialData: materialDataType): CartItemType => {
    const {id, product_type, category, isAngle, middleSectionDefault, hasMiddleSection, isBlind, blindArr} = product
    const {leather} = materialData
    const {
        'Width': width,
        'Blind Width': blindWidth,
        'Height': height,
        'Depth': depth,
        'Custom Depth Number': customDepth,
        'Hinge opening': hinge,
        'Corner': corner,
        Options: chosenOptions,
        'Door Profile': doorProfile,
        'Door Glass Type': doorGlassType,
        'Door Glass Color': doorGlassColor,
        'Shelf Profile': shelfProfile,
        'Shelf Glass Type': shelfGlassType,
        'Shelf Glass Color': shelfGlassColor,
        'Note': note,
        'LED borders': ledBorders,
        'LED alignment': ledAlignment,
        'LED indent': ledIndent,

        // Excluded in standard cabinet
        'Custom Width Number': customWidth,
        'Custom Height Number': customHeight,
        'Custom Blind Width Number': customBlindWidth,
        'Middle Section Number': middleSection,
        price,
        image_active_number,
    } = values;

    const realW = width || customWidth || 0;
    const realH = height || customHeight || 0;
    const realD = depth || customDepth || 0;
    const realMiddle = middleSection || 0
    const realBlind = blindWidth || customBlindWidth || 0;

    const cartData: CartItemType = {
        _id: uuidv4(),
        product_id: id,
        subcategory: category,
        price,
        image_active_number,
        isStandard: {
            dimensions: checkDimensionsStandard(productRange, width, height, depth, isAngle),
            blind: checkBlindStandard(isBlind, blindWidth || 0, blindArr),
            led: checkLedSelected(ledBorders),
            options: checkOptionsSelected(chosenOptions),
            middle: checkMiddleSectionStandard(hasMiddleSection, middleSectionDefault, middleSection || 0)
        },
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
        door_option: [doorProfile, doorGlassType, doorGlassColor],
        shelf_option: [shelfProfile, shelfGlassType, shelfGlassColor],
        led_border: ledBorders,
        led_alignment: ledAlignment,
        led_indent: ledIndent,
        note: note,
        material: '',
        room: roomId || null,
        leather: leather
    }
    return cartData
}

export const addToCartCustomPart = (values: CustomPartFormValuesType, product: CustomPartType, roomId: MaybeUndefined<string>,) => {
    const {
        'Width Number': width,
        'Height Number': height,
        'Depth Number': depth,
        'Material': material,
        'Note': note,
        glass_door,
        glass_shelf,
        price,
        door_accessories,
        led_accessories,
        standard_door
    } = values;

    const {id, type} = product;

    const cartData: CartItemType = {
        _id: uuidv4(),
        subcategory: type,
        room: roomId || null,
        price,
        isStandard: {
            dimensions: true,
            led: true,
            blind: true,
            middle: true,
            options: true
        },
        image_active_number: 1,
        product_id: id,
        product_type: "custom",
        amount: 1,
        width: width,
        height: height,
        depth: depth,
        blind_width: 0,
        middle_section: 0,
        hinge: "",
        corner: "",
        options: [],
        door_option: [],
        shelf_option: [],
        led_border: [],
        led_alignment: '',
        led_indent: '',
        leather: '',
        material: material,
        note: note,
        glass_door: glass_door,
        glass_shelf: glass_shelf
    }

    if (type === 'led-accessories') {
        const {led_alum_profiles, led_gola_profiles} = led_accessories
        cartData.led_accessories = {
            ...led_accessories,
            led_alum_profiles: led_alum_profiles.map(el => ({length: el["length Number"], qty: el.qty, _id: el._id})),
            led_gola_profiles: led_gola_profiles.map(el => ({
                length: el["length Number"],
                qty: el.qty,
                color: el.color,
                _id: el._id
            })),
        }
    }

    if (type === 'door-accessories') {
        cartData.door_accessories = door_accessories.filter(el => el.qty > 0)
    }

    if (type === 'standard-door' || type === 'standard-glass-door') {
        cartData.standard_door = standard_door
    }

    return cartData
}

export const isHasLedBlock = (category: productCategory): boolean => {
    const ledCategoryArr = ['Wall Cabinets', 'Gola Wall Cabinets'];
    return ledCategoryArr.includes(category)
}

export const isGolaShown = (room: MaybeEmpty<RoomType>, hasGola: boolean): boolean => {
    if (!room) return false;
    return hasGola
}

export const isDoorTypeShown = (room: MaybeEmpty<RoomType>, gola: string, showGola: boolean): boolean => {
    if (!room) return false;
    return !(showGola && !gola);


}

export const isDoorFinishShown = (room: MaybeEmpty<RoomType>, doorType: string, finishArr?: finishType[]): boolean => {
    if (!room || doorType === 'Standard White Shaker') return false
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
    return !(!drawer_brand|| !drawerTypesArr.length);
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


export const getDrawerArr = (drawers: drawer[], drawer_brand: string, drawer_type: string): { drawerBrandArr: materialsData[], drawerTypesArr: materialsData[], drawerColorsArr: materialsData[] } => {
    const drawerBrandArr = drawers.map(el => ({value: el.value, img: el.img})) as materialsData[];
    const drawerTypesArrFilter = drawers.find(el => el.value === drawer_brand)?.types;
    const drawerTypesArr = drawerTypesArrFilter && drawerTypesArrFilter.map(el => ({
        value: el.value,
        img: el.img
    })) || [] as materialsData[];
    const drawerColorsArr = drawerTypesArrFilter && drawerTypesArrFilter.find(el => el.value === drawer_type)?.colors || [] as materialsData[];
    return {
        drawerBrandArr, drawerTypesArr, drawerColorsArr
    }
}

export const getDoorTypeArr = (doors: doorType[], gola: string, isLeather:boolean):doorType[] => {
    let arr = doors;
    const noGola = gola === '' || gola === 'No Gola'
    if (!noGola) {
        arr = arr.filter(el => el.value !== 'Standard White Shaker');
    }
    if (isLeather) {
        const exceptions = ["No Doors","Three Piece Door","Finger Pull","Standard White Shaker"]
        arr = arr.filter(el => !exceptions.includes(el.value));
    }
    return arr;
}

export const getBoxMaterialArr = <T,U>(category: MaybeEmpty<RoomCategories>, boxMaterial: T[], leatherBoxMaterialArr: U[] ): (T|U)[] => {
    if (!category) return [];
    return category === 'Leather Closet' ? leatherBoxMaterialArr : boxMaterial
}


export const getBoxMaterialColorsArr = (isLeather:boolean, boxMaterialType:string, boxMaterialsArr:finishType[]): MaybeUndefined<colorType[]> => {
    if (!isLeather) return undefined;
    return boxMaterialsArr?.find(el => el.value === boxMaterialType)?.colors
}

export const getGrainArr = (grain: materialsData[], colorArr: colorType[], door_color: string): MaybeNull<materialsData[]> => {
    const grainType = colorArr.find(el => el.value === door_color)?.isGrain;

    switch (grainType) {
        case true:
            return grain;
        case 1:
            return grain.filter(el => el.value === 'Horizontal')
        case 2:
            return grain.filter(el => el.value === 'Vertical')
        default:
            return null
    }
}

export const isLeatherType = (drawerColor: string | undefined, drawerType: string | undefined, isLeather: boolean, leatherTypeArr: materialsData[]): boolean => {
    if (!drawerType) return false;
    if (!leatherTypeArr.length || (!drawerColor && drawerType !== 'Undermount')) return false
    return isLeather
}

export const checkDoors = (doors: number, doorArr: number[] | null, hingeOpening: string): number => {
    if (!doorArr && doors) return 0;
    if (doorArr?.length === 1 && doors !== doorArr[0]) return doorArr[0];
    if (doors === 1 && doorArr?.includes(2) && hingeOpening === 'Double Door') return 2
    if (doors === 2 && doorArr?.includes(1) && ['Left', 'Right'].includes(hingeOpening)) return 1
    return doors
}

export const getInitialMaterialInPVCForm = (materialArr: string[], doorFinish: string, doorType: string): string => {
    const curMaterial = materialArr.find(el => doorFinish.includes(el)) ?? doorType;
    return materialArr.includes(curMaterial) ? curMaterial : materialArr[0];
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


export const getInitialMaterials = (): MaterialsFormType => {
    const storageMaterials = localStorage.getItem('materials');
    return storageMaterials ? JSON.parse(storageMaterials) as MaterialsFormType : materialsFormInitial;
}


export const getMaterialStrings = (materials: MaterialsFormType): MaterialStringsType => {
    const {room_name, ...data} = materials;
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
        leather
    } = data;

    const categoryString = materialsStringify([category, gola])
    const doorString = materialsStringify([door_type, door_finish_material, door_color, door_grain, door_frame_width])
    const boxString = materialsStringify([box_material, box_color])
    const drawerString = materialsStringify([drawer_brand, drawer_type, drawer_color]);
    return {
        categoryString,
        boxString,
        doorString,
        drawerString,
        leather
    }
}

const materialsStringify = (materialsArr: (string | number | null)[]): string => {
    return materialsArr.filter(el => !!el).join(', ')
}

export const getSquare = (doorWidth: number, doorHeight: number, product_id:number, is_leather_closet:boolean): number => {
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

export const getCartData = (cartState: CartItemType[], dispatch: (a: any) => void): { cart: CartItemType[], total: number, cartLength: number } => {
    if (cartState.length) return {cart: cartState, total: getCartTotal(cartState), cartLength: cartState.length}
    const storCart = localStorage.getItem('cart');
    const cart = storCart ? JSON.parse(storCart) as CartItemType[] : [] as CartItemType[];
    if (cart.length) dispatch(fillCart(cart))
    const total = getCartTotal(cart);
    return {cart, total, cartLength: cart.length}
}


export const getRoomFront = (room: RoomTypeAPI): RoomFront => {
    const cart = room.cart || [];
    const frontCart = getCartArrFront(cart, room);
    const roomFront: RoomFront = {
        ...room,
        productPage: null,
        activeProductCategory: '',
        cart: frontCart
    }
    return roomFront
}


export const getUpdatedCart = (room: RoomFront): CartItemType[] => {
    const {cart} = room
    return cart
}

export const getCartArrFront = (cart: CartAPIResponse[], room: RoomTypeAPI | RoomFront): CartItemType[] => {
    const CartItem = cart.map(item => {
        return item.product_type === 'custom' ? getCartItemCustomPart(item, room) : getCartItemProduct(item, room)
    })
    return CartItem.filter((element): element is CartItemType => element !== null)
}

export const getCartItemProduct = (item: CartAPIResponse, room: RoomTypeAPI | RoomFront): MaybeNull<CartItemType> => {
    const materialData = getMaterialData(room);

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
        led_border
    } = item;

    const product = getProductById(product_id, product_type === 'standard')
    if (!product) return null;
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

    const {
        is_standard_cabinet,
        drawer_brand,
        premium_coef,
        box_material_finish_coef,
        box_material_coef,
        base_price_type
    } = materialData;

    const tablePriceData = getProductPriceRange(product_id, is_standard_cabinet, base_price_type);
    if (!tablePriceData) return null;

    const productPriceData = getProductDataToCalculatePrice(product, drawer_brand);
    const {doorValues} = productPriceData;
    const doorArr = getDoorMinMaxValuesArr(width, doorValues);
    const doors = checkDoors(0, doorArr, hinge)

    const sizeLimit: MaybeUndefined<sizeLimitsType> = sizes.find(size => size.productIds.includes(product_id))?.limits;
    if (!sizeLimit) return null;
    const image_active_number = getType(width, height, widthDivider, doors, category, attributes);
    const boxFromFinishMaterial = options.includes("Box from finish material");
    const boxCoef = boxFromFinishMaterial ? box_material_finish_coef : box_material_coef;
    const allCoefs = boxCoef * premium_coef;
    const tablePrice = getTablePrice(width, height, depth, tablePriceData, category);
    const startPrice = getStartPrice(width, height, depth, allCoefs, sizeLimit, tablePrice);
    const newType = getType(width, height, widthDivider, doors, category, attributes);

    const cabinet: CabinetItemType = {
        ...item,
        image_active_number: newType,
    }

    const productRange = getProductRange(tablePriceData, category, customHeight, customDepth);

    const coef = getProductCoef(cabinet, tablePriceData, product)
    const productCoef = 1 + (coef.width + coef.height + coef.depth)
    const attributesPrices = getAttributesProductPrices(cabinet, product, materialData);
    const attrPrice = Object.values(attributesPrices).reduce((partialSum, a) => partialSum + a, 0);
    const totalPrice = startPrice ? +(startPrice * productCoef + attrPrice).toFixed(1) : 0;

    return {
        ...item,
        subcategory: category,
        price: totalPrice,
        image_active_number,
        isStandard: {
            dimensions: checkDimensionsStandard(productRange, width, height, depth, isAngle),
            blind: checkBlindStandard(isBlind, blind_width, blindArr),
            led: checkLedSelected(led_border),
            options: checkOptionsSelected(options),
            middle: checkMiddleSectionStandard(hasMiddleSection, middleSectionDefault, middle_section)
        },
        // isStandardSize: getIsProductStandard(productRange, width, height, depth, blind_width, middle_section, options, led_border, product),
    }
};

const getLEDProductCartPrice = (values: LEDAccessoriesType): number => {
    const {
        led_alum_profiles,
        led_gola_profiles,
        door_sensor,
        dimmable_remote,
        transformer,
    } = values;
    const alumProfPrice = led_alum_profiles.reduce((acc, profile) => acc + (profile.length * 2.55 * profile.qty), 0);
    const golaProfPrice = led_gola_profiles.reduce((acc, profile) => acc + (profile.length * 5.5 * profile.qty), 0);
    const dimRemotePrice = dimmable_remote * 100 || 0;
    const doorSensorPrice = door_sensor * 150 || 0;
    const transformerPrice = transformer * 50 || 0;

    return +(alumProfPrice + golaProfPrice + dimRemotePrice + doorSensorPrice + transformerPrice).toFixed(1)
}

export const getCartItemCustomPart = (item: CartAPIResponse, room: RoomTypeAPI | RoomFront): MaybeNull<CartItemType> => {
    const {_id: roomId, door_color, door_type} = room
    const {
        product_id,
        width,
        height,
        depth,
        material,
        note,
        _id,
        glass_door: glass_door_val,
        led_accessories,
        door_accessories,
        standard_door,
        glass_shelf,
        amount,
    } = item;

    const customPart = getCustomPartById(product_id);
    if (!customPart) return null;

    const {type, glass_door} = customPart;
    const isCabinetLayout = ["custom", "pvc", "backing", "glass-door", "glass-shelf"].includes(type);
    const isStandardPanel = ["standard-panel", "shape-panel"].includes(type);
    let price: number = 0;

    if (isCabinetLayout) {
        let profileNumber: MaybeNull<number> = null;
        if (type === "glass-door") {
            if (!glass_door || !glass_door_val) return null;
            const {Profile: doorProfiles} = glass_door;

            if (doorProfiles) {
                let profileCurrent: MaybeUndefined<string> = doorProfiles?.find(el => el.value === glass_door_val[0])?.type;
                if (profileCurrent) profileNumber = +profileCurrent
            }

        }
        const finishColorCoef = getFinishColorCoefCustomPart(product_id,material,door_color)
        price = +(getCustomPartPrice(product_id, width, height, depth, material, profileNumber)*finishColorCoef).toFixed(1);
    }

    if (type === 'led-accessories' && led_accessories) {
        price = getLEDProductCartPrice(led_accessories);
    }

    if (type === 'door-accessories' && door_accessories) {
        price = addToCartAccessories(door_accessories)
    }
    if ((type === 'standard-door' || type === 'standard-glass-door') && standard_door) {
        price = getCustomPartStandardDoorPrice(standard_door, type)
    }


    if (isStandardPanel) {
        const is_price_type_default = door_type === 'Standard White Shaker' && door_color === 'Default White';
        price = getStandardPanelPrice(product_id, width, height, depth,is_price_type_default)
    }

    const cartData: CartItemType = {
        _id: _id,
        subcategory: type,
        room: roomId,
        isStandard: {
            dimensions: true,
            led: true,
            blind: true,
            middle: true,
            options: true
        },
        image_active_number: 1,
        product_id: product_id,
        product_type: "custom",
        amount: amount,
        width: width,
        height: height,
        depth: depth,
        blind_width: 0,
        middle_section: 0,
        hinge: "",
        corner: "",
        options: [],
        door_option: [],
        shelf_option: [],
        led_border: [],
        led_alignment: '',
        led_indent: '',
        leather: '',
        material: material,
        led_accessories: led_accessories,
        door_accessories: door_accessories,
        standard_door: standard_door,
        note: note,
        glass_door: glass_door_val,
        glass_shelf: glass_shelf,
        price: price
    }
    return cartData
}

export const getFinishColorCoefCustomPart = (id:number,material:MaybeUndefined<string>,door_color:string):number => {
    // Choose Panels only
    if (![900,901,903,905,906].includes(id)) return 1;
    // Choose Material (In Product Page)
    if (material !== 'Milino') return 1;
    // Door Color from Materials page
    if (['Brown Oak', 'Grey Woodline', 'Ivory Woodline'].includes(door_color)) return 1.1;
    if (door_color.includes('Ultra Matte')) return 1.2;
    return 1;
}

export const getStorageMaterials = (): MaybeNull<MaterialsFormType> => {
    const materialsString = localStorage.getItem('materials');
    if (!materialsString) return null;
    const materials: MaterialsFormType = JSON.parse(materialsString);
    materials.room_name = null;
    return materials
}


export const getProductApiType = (category: productCategory, isProductStandard: boolean): ProductApiType => {
    if (category === 'Custom Parts') return 'custom'
    return isProductStandard ? 'standard' : 'cabinet'
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

export const convertDoorAccessories = (el: DoorAccessoireAPIType): DoorAccessoireType => {
    const doorAccessoires = DA as DoorAccessoireFront[];
    const item = doorAccessoires.find(ac => ac.value === el.value);
    if (!item) return {...doorAccessoires[0], qty: el.qty}
    return {...item, qty: el.qty}
}

export const usePrevious = (data: string) => {
    const prev = useRef<string>()
    useEffect(() => {
        if (data) prev.current = data;
    }, [data])
    return prev.current
}

export const getDimentionsRow = (width: number, height: number, depth: number): string => {
    const widthPart = width ? `${getFraction(width)}"W x` : '';
    const heightPart = height ? `${getFraction(height)}"H` : '';
    const depthPart = depth && depth > 1 ? `x ${getFraction(depth)}"D` : '';
    return `${widthPart} ${heightPart} ${depthPart}`
}


export const isShowBlindWidthBlock = (blindArr: MaybeUndefined<number[]>, product_type: ProductApiType): boolean => {
    return (!(product_type === 'standard' || !blindArr || !blindArr.length));
}

export const isShowMiddleSectionBlock = (hasMiddleSection: MaybeUndefined<true>, middleSectionDefault: MaybeUndefined<number>, isProductStandard: boolean): boolean => {
    return !!(hasMiddleSection && !isProductStandard && middleSectionDefault)
}

export const getSliderCategories = (room: RoomType, noGola: boolean, isStandardCabinet: boolean): catInfoType => {
    if (isStandardCabinet) return categoriesData['Standard Door'] as catInfoType;
    return noGola
        ? categoriesData[room] as catInfoType
        : categoriesData[`${room} Gola`] as catInfoType
}


export const logout = () => {
    localStorage.removeItem('token')
    store.dispatch(setUser(emptyUser))
    store.dispatch(setIsAuth(false))
}


export const formatDateToText = (dateApi: Date): string => {
    const date = new Date(dateApi);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export const prepareEmailData = <T extends { email: string }>(e: T): T => {
    const {email} = e
    return {...e, email: email.toLowerCase()}
}

export function getNewPriceFromPricePart(is_price_type_default: boolean, pricePart: MaybeUndefined<pricePartStandardPanel>) {
    if (!pricePart) return 0;
    return is_price_type_default ? pricePart.price : pricePart.painted_price;
}