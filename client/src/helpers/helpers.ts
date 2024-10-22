import {AppDispatch, RootState} from "../store/store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import noImg from './../assets/img/noPhoto.png'
import {
    attrItem, cornerTypes, CustomPart, customPartDataType, hingeTypes,
    itemImg, materialDataType, materialsCustomPart, MaybeEmpty, MaybeNull, MaybeUndefined, ProductApiType,
    productCategory,
    productRangeType, ProductType,
    productTypings, sizeLimitsType, valueItemType
} from "./productTypes";
import {optionType, optionTypeDoor} from "../common/SelectField";
import {
    fillCart,
} from "../store/reducers/generalSlice";
import cabinets from '../api/cabinets.json';
import standardCabinets from '../api/standartProducts.json'
import customParts from '../api/customPart.json';
import {RoomType} from "./categoriesTypes";
import {colorType, doorType, finishType, materialsData} from "./materialsTypes";
import {
    getAttributesProductPrices,
    getBlindArr, getCustomPartPrice,
    getDoorMinMaxValuesArr,
    getMaterialData, getProductCoef,
    getProductDataToCalculatePrice, getProductPriceRange, getProductRange,
    getStartPrice,
    getTablePrice,
    getType
} from "./calculatePrice";
import {v4 as uuidv4} from "uuid";
import {ledAlignmentType} from "../Components/Product/LED";
import {CabinetItemType, CartAPIResponse, CartItemType} from "../api/apiFunctions";
import {RoomFront, RoomTypeAPI} from "../store/reducers/roomSlice";
import sizes from "../api/sizes.json";
import {materialsFormInitial, MaterialsFormType} from "../common/MaterialsForm";
import {MaterialStringsType} from "../common/Materials";
import {
    CustomPartFormValuesType, DoorAccessoireAPIType, DoorAccessoireType,
} from "../Components/CustomPart/CustomPart";
import {LEDAccessoriesType} from "../Components/CustomPart/LEDForm";
import {addToCartAccessories} from "../Components/CustomPart/DoorAccessoiresForm";
import {getCustomPartStandardDoorPrice} from "../Components/CustomPart/StandardDoorForm";

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

export const getFraction = (number: number): string => {
    if (Number.isInteger(number)) return number.toString();
    const floor = Math.floor(number);
    const reminder = +(number - floor).toFixed(3);
    const quarters = {
        0.125: '1/8',
        0.250: '1/4',
        0.375: '3/8',
        0.500: '1/2',
        0.625: '5/8',
        0.750: '3/4',
        0.875: '7/8',
        0.333: '1/3',
        0.667: '2/3',
        0.200: '1/5',
        0.400: '2/5',
        0.600: '3/5',
        0.800: '4/5',
        0.167: '1/6',
        0.833: '5/6',
        0.143: '1/7',
        0.286: '2/7',
        0.429: '3/7',
        0.571: '4/7',
        0.714: '5/7',
        0.857: '6/7',
        0.111: '1/9',
        0.222: '2/9',
        0.444: '4/9',
        0.556: '5/9',
        0.778: '7/9',
        0.889: '8/9',
        0.100: '1/10',
        0.300: '3/10',
        0.700: '7/10',
        0.900: '9/10',
        0.091: '1/11',
        0.182: '2/11',
        0.273: '3/11',
        0.364: '4/11',
        0.455: '5/11',
        0.545: '6/11',
        0.636: '7/11',
        0.727: '8/11',
        0.818: '9/11',
        0.909: '10/11',
        0.083: '1/12',
        0.417: '5/12',
        0.583: '7/12',
        0.917: '11/12',
    };
    const currQ = Object.entries(quarters).find((el) => el[0] === reminder.toString());
    return currQ ? `${floor > 0 ? floor : ''} ${currQ[1]}` : number.toFixed(3);
}

export const getDivider = (fraction: string): number => {
    const beforeFraction = Number(fraction.substring(0, fraction.indexOf('/')));
    const afterFraction = Number(fraction.substring(fraction.indexOf('/') + 1));
    if (beforeFraction < afterFraction) return beforeFraction / afterFraction;
    return 0;
}

export const getSizeNumberRegex = (sizeString: string): number => {
    if (sizeString) {
        const trimLetters = sizeString.replace(/[^0-9\s//]/g, '');
        const template = trimLetters.match(/\d{1,}\s\d{1,}\/\d{1,}|\d{1,}\/\d{1,}|\d{1,}/);
        if (!template) return 0;
        if (template[0].match(/\d{1,}\s\d{1,}\/\d{1,}/)) {
            const spaceIndex = template[0].indexOf(" ");
            const main = Number(template[0].substring(0, spaceIndex));
            return main + getDivider(template[0].substring(spaceIndex + 1));
        } else if (template[0].match(/\d{1,}\/\d{1,}/)) {
            return getDivider(template[0])
        } else {
            return Number(template[0])
        }
    }
    return 0
}

export const getProductsByCategory = (room: RoomType, category: productCategory): ProductType[] => {
    const isProductStandard = room === 'Standard Door';
    const products = (isProductStandard ? standardCabinets : cabinets) as ProductType[]
    return products.filter(product => product.category === category);
}

export const getProductById = (id: number, isProductStandard: boolean): MaybeNull<ProductType> => {
    const product = (isProductStandard ? standardCabinets : cabinets).find(product => product.id === id) as ProductType;
    if (!product) return null;
    const {category, isBlind} = product;
    const hasLedBlock = isHasLedBlock(category);
    const product_type = getProductApiType(product.category, isProductStandard)
    return {
        ...product,
        isProductStandard,
        hasLedBlock,
        blindArr: isBlind ? getBlindArr(category) : undefined,
        product_type: product_type
    }
}

export const getCustomParts = (room: RoomType): customPartDataType[] => {
    if (room === 'Standard Door') {
        const standardDoorCustomParts = customParts.filter(el => el.name !== 'Standard Door' && el.name !== 'Glass Door')
        return standardDoorCustomParts as customPartDataType[];
    }
    return customParts as customPartDataType[];
}

export const getCustomPartById = (id: number): MaybeNull<CustomPart> => {
    const arr = customParts as CustomPart[];
    const product = arr.find(part => +part.id === id);
    return product ? product : null;
}


export const getInitialMaterialData = (custom: CustomPart, materials: MaterialsFormType): MaybeNull<materialsCustomPart> => {
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
    Corner: cornerTypes,
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

export const getInitialDepth = (productRange: productRangeType, isAngle: boolean, depth: number): number => {
    const tableDepth = productRange?.depthRange[0];
    if (tableDepth) return tableDepth;
    return !isAngle ? depth : productRange.widthRange[0]
}

export const getLimit = (d: number[] | undefined): number => {
    return d ? d[0] : 0
}

export const getIsProductStandard = (productRange: productRangeType, width: number, height: number, depth: number): boolean => {
    if (!productRange.widthRange.includes(width)) return false;
    if (!productRange.heightRange.includes(height)) return false;
    return productRange.depthRange.includes(depth);
}

export const addProductToCart = (product: ProductType, values: productValuesType, productRange: productRangeType, roomId: MaybeUndefined<string>, materialData: materialDataType): CartItemType => {
    const {id, product_type, category} = product
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
        isStandardSize: getIsProductStandard(productRange, realW, realH, realD),
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

export const addToCartCustomPart = (values: CustomPartFormValuesType, product: CustomPart, roomId: MaybeUndefined<string>,) => {
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
        isStandardSize: true,
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

export const isDoorTypeShown = (room: RoomType | ''): boolean => {
    return (!!room && room !== 'Standard Door')
}

export const isDoorFinishShown = (room: RoomType | '', doorType: string, finishArr?: finishType[]): boolean => {
    if (!room || room === 'Standard Door') return false
    return !!(doorType && finishArr?.length)
}

export const isDoorColorShown = (room: RoomType | '', doorFinishMaterial: string, finishArr?: finishType[], colorArr?: colorType[]): boolean => {
    if (room === 'Standard Door') return true;
    return !!(doorFinishMaterial && colorArr?.length)
}

export const isDoorFrameWidth = (doorType: string, doorFinishMaterial: string, frameArr: materialsData[] | undefined): boolean => {
    if (!frameArr) return false
    if (doorType !== 'Micro Shaker') return false
    return !!doorFinishMaterial
}

export const isDoorGrain = (doorFinishMaterial: string, colorArr: colorType[], doorColor?: string): boolean => {
    if (!doorFinishMaterial) return false;
    return !!colorArr.find(el => el.value === doorColor)?.isGrain
}

export const isBoxMaterial = (doorFinishMaterial: string, doorColor: string | undefined, boxMaterialVal: string): boolean => {
    return !!(doorFinishMaterial === 'No Doors No Hinges' || doorColor || boxMaterialVal)
}
export const getDoorColorsArr = (doorFinishMaterial: string, room: MaybeEmpty<RoomType>, doors: doorType[], doorType: string): MaybeUndefined<colorType[]> => {
    const finishArr: MaybeUndefined<finishType[]> = doors.find(el => el.value === doorType)?.finish;
    if (!room) return undefined;
    if (room === 'Standard Door') {
        return doors.find(el => el.value === 'Painted')?.finish[0].colors;
    }
    return finishArr?.find(el => el.value === doorFinishMaterial)?.colors
}

export const getBoxMaterialArr = (isLeather: boolean, boxMaterial: materialsData[], leatherBoxMaterialArr: materialsData[]): materialsData[] => {
    return isLeather ? leatherBoxMaterialArr : boxMaterial
}

export const isLeatherType = (drawerColor: string | undefined, isLeather: boolean, leatherTypeArr: materialsData[]): boolean => {
    if (!leatherTypeArr.length || !drawerColor) return false
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
        door_type,
        door_finish_material,
        door_grain,
        door_frame_width,
        door_color,
        box_material,
        drawer_brand,
        drawer_type,
        drawer_color,
        leather
    } = data;
    const doorString = materialsStringify([door_type, door_finish_material, door_color, door_grain, door_frame_width])
    const drawerString = materialsStringify([drawer_brand, drawer_type, drawer_color]);
    return {
        category,
        box_material,
        doorString,
        drawerString,
        leather
    }
}

const materialsStringify = (materialsArr: string[]): string => {
    return materialsArr.filter(el => !!el).join(', ')
}

export const getSquare = (realWidth: number, realHeight: number): number => {
    return +(realWidth * realHeight / 144).toFixed(2)
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
        product_type
    } = item;

    const product = getProductById(product_id, product_type === 'standard')
    if (!product) return null;
    const {
        category,
        widthDivider,
        attributes,
        customHeight,
        customDepth
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
    const totalPrice = +(startPrice * productCoef + attrPrice).toFixed(1);

    return {
        ...item,
        subcategory: category,
        price: totalPrice,
        image_active_number,
        isStandardSize: getIsProductStandard(productRange, width, height, depth),
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
    const {_id: roomId} = room
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
        price = +(getCustomPartPrice(product_id, width, height, depth, material, profileNumber)).toFixed(1);
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

    const cartData: CartItemType = {
        _id: _id,
        subcategory: type,
        room: roomId,
        isStandardSize: true,
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

export const getCartItemImg = (product: ProductType | CustomPart, image_active_number: productTypings): string => {
    const {product_type, images} = product;
    if (product_type === 'custom') {
        return getImg('products/custom', images[0].value)
    }

    return getImg('products', images[image_active_number - 1].value)
}

export const convertDoorAccessories = (el: DoorAccessoireAPIType): DoorAccessoireType => {
    switch (el.value) {
        case 'HF':
            return {
                id: 0,
                value: 'HF',
                label: 'Aventos HF',
                filter: 'aventos',
                qty: el.qty,
                price: 280
            };
        case 'HK':
            return {
                id: 1,
                value: 'HK',
                label: 'Aventos HK',
                filter: 'aventos',
                qty: el.qty,
                price: 210
            };
        case 'HL':
            return {
                id: 2,
                value: 'HL',
                label: 'Aventos HL',
                filter: 'aventos',
                qty: el.qty,
                price: 350
            };
        case 'door_hinge':
            return {
                id: 3,
                value: 'door_hinge',
                filter: 'hinge',
                qty: el.qty,
                price: 10,
                label: 'Door Hinge'
            };
        case 'hinge_holes':
            return {
                id: 4,
                value: 'hinge_holes',
                filter: 'hinge',
                qty: el.qty,
                price: 6,
                label: 'Hinge Holes'
            };
        case 'PTO_door':
            return {
                id: 5,
                value: 'PTO_door',
                filter: 'PTO',
                label: 'For Doors',
                qty: el.qty,
                price: 30
            };
        case 'PTO_drawer':
            return {
                id: 6,
                value: 'PTO_drawer',
                filter: 'PTO',
                label: 'For Drawers',
                qty: el.qty,
                price: 80
            };
        case 'PTO_trashbin':
            return {
                id: 7,
                value: 'PTO_trashbin',
                filter: 'PTO',
                label: 'For Trash Bins',
                qty: el.qty,
                price: 350
            };
        case 'WBA':
            return {
                id: 8,
                value: 'WBA',
                filter: 'servo',
                label: 'For WBA Cab',
                qty: el.qty,
                price: 1000
            };
        case 'WBL':
            return {
                id: 9,
                value: 'WBL',
                filter: 'servo',
                label: 'For WBL Cab',
                qty: el.qty,
                price: 1000
            };
        case 'WDA':
            return {
                id: 10,
                value: 'WDA',
                filter: 'servo',
                label: 'For WDA Cab',
                qty: el.qty,
                price: 1000
            };
        default:
            return {
                id: 11,
                value: 'BG',
                filter: 'servo',
                label: 'For BG Cab',
                qty: el.qty,
                price: 600
            }
    }
}