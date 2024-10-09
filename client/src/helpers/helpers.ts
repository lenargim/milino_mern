import {AppDispatch, RootState} from "../store/store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import noImg from './../assets/img/noPhoto.png'
import {
    attrItem, CartExtrasType, cornerTypes, customPartDataType, DefaultProductType, hingeTypes,
    itemImg,
    productCategory,
    productRangeType, ProductType,
    productTypings, valueItemType
} from "./productTypes";
import {optionType, optionTypeDoor} from "../common/SelectField";
import {
    CartItemType,
    fillCart,
    productExtraType,
} from "../store/reducers/generalSlice";
import cabinets from '../api/cabinets.json';
import customParts from '../api/customPart.json';
import StandardBaseProducts from '../api/standartProducts.json'
import {v4 as uuidv4} from "uuid";
import {FormikValues} from "formik";
import {LEDFormValuesType} from "../Components/CustomPart/LEDForm";
import {DoorAccessoiresValuesType} from "../Components/CustomPart/DoorAccessoiresForm";
import {GlassDoorFormValuesType} from "../Components/CustomPart/GlassDoorForm";
import {PVCFormValuesType} from "../Components/CustomPart/PVCForm";
import {GlassShelfFormValuesType} from "../Components/CustomPart/GlassShelfForm";
import {StandardDoorFormValuesType} from "../Components/CustomPart/StandardDoorForm";
import {RoomType} from "./categoriesTypes";
import {colorType, doorType, finishType, materialsData} from "./materialsTypes";
import {getDoorMinMaxValuesArr} from "./calculatePrice";
import {OrderFormType} from "./types";
import {ledAlignmentType} from "../Components/Product/LED";
import {MaybeNull, MaybeUndefined} from "../Components/Profile/RoomForm";

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

export function getSelectValfromVal(val: string | undefined, options: optionType[]): optionType | null {
    const option = options.find(el => el.value === val)
    return option || null
}

export function getSelectDoorVal(val: string | undefined, options: optionTypeDoor[]): optionTypeDoor | null {
    const option = options.find(el => el.label === val)
    return option ?? null
}

export const getCartTotal = (cart: CartItemType[]): number => {
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


export const getProductsByCategory = (category: productCategory):ProductType[] => {
    const products = cabinets as ProductType[]
    return  products.filter(product => product.category === category);
}


export const getProductById = (id:number):MaybeNull<ProductType> => {
    const product = cabinets.find(product => product.id === id) as ProductType;
    if (!product) return null;
    return {
        ...DefaultProductType,
        ...product
    }
}

export const getcustomParts = (room: RoomType): customPartDataType[] => {
    if (room === 'Standard Door') {
        const StandardDoorCustomParts = customParts.filter(el => el.name !== 'Standard Door' && el.name !== 'Glass Door')
        return StandardDoorCustomParts as customPartDataType[];
    }
    return customParts as customPartDataType[];
}

type initialStandardValues = {
    Width: number,
    isBlind: boolean,
    "Blind Width": number,
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
    'LED alignment': ledAlignmentType,
    'LED indent': string,
    'Note': string,
    price: number,
    image_active_number: productTypings
}

export interface productValuesType extends initialStandardValues {
    "Custom Width": number | '',
    'Custom Blind Width': number | '',
    'Custom Height': number | '',
    "Custom Width Number": number | '',
    'Custom Blind Width Number': number | '',
    'Custom Height Number': number | '',
    'Custom Depth Number': number | '',
    'Middle Section Number': number | '',
    'Door Profile': string,
    'Door Glass Type': string,
    'Door Glass Color': string,
    'Shelf Profile': string,
    'Shelf Glass Type': string,
    'Shelf Glass Color': string,
    cartExtras: CartExtrasType
}

export interface standardProductValuesType extends initialStandardValues {
    'Custom Depth Number': number | '',
    'Door Profile': string,
    'Door Glass Type': string,
    'Door Glass Color': string,
    'Shelf Profile': string,
    'Shelf Glass Type': string,
    'Shelf Glass Color': string,
}


export const getInitialProductValues = (productRange: productRangeType, isBlind: boolean, blindArr: number[] | undefined, doorValues: valueItemType[] | undefined, isCornerChoose?: boolean): productValuesType => {
    const {widthRange, heightRange, depthRange} = productRange
    return {
        'Width': widthRange[0],
        isBlind: isBlind,
        'Blind Width': blindArr ? blindArr[0] : 0,
        'Height': heightRange[0],
        'Depth': depthRange[0],
        'Custom Width': '',
        'Custom Blind Width': '',
        'Custom Height': '',
        'Custom Depth': '',
        'Custom Width Number': '',
        'Custom Blind Width Number': '',
        'Custom Height Number': '',
        'Custom Depth Number': '',
        'Middle Section Number': '',
        'Doors': doorValues && doorValues[0]?.value || 0,
        'Hinge opening': doorValues ? 'Left' : '',
        'Corner': isCornerChoose ? 'Left' : '',
        'Options': [],
        'Profile': '',
        'Glass Type': '',
        'Glass Color': '',
        'Glass Shelf': '',
        'Middle Section': '',
        'LED borders': [],
        'LED alignment': 'Center',
        'LED indent': '',
        'Note': '',
        cartExtras: {
            ptoDoors: 0,
            ptoDrawers: 0,
            glassShelf: 0,
            glassDoor: 0,
            ptoTrashBins: 0,
            ledPrice: 0,
            coefExtra: 1,
            attributes: [],
            boxFromFinishMaterial: false
        },
        price: 0,
        image_active_number: 1,


        'Door Profile': '',
        'Door Glass Type': '',
        'Door Glass Color': '',
        'Shelf Profile': '',
        'Shelf Glass Type': '',
        'Shelf Glass Color': '',
    };
}

export const getInitialStandardProductValues = (productRange: productRangeType, doorValues: valueItemType[] | undefined, category: productCategory, depth: number, isBlind: boolean, blindArr: number[] | undefined, isAngle: boolean, isCornerChoose?: boolean): standardProductValuesType => {
    const initialDepth = getInitialDepth(productRange, isAngle, depth);
    const {widthRange, heightRange} = productRange
    const doorArr = getDoorMinMaxValuesArr(widthRange[0], doorValues);
    return {
        'Width': widthRange[0],
        isBlind: isBlind,
        'Blind Width': blindArr ? blindArr[0] : 0,
        'Height': heightRange[0],
        'Depth': initialDepth,
        'Custom Depth': '',
        'Custom Depth Number': '',
        'Doors': doorArr && doorArr[0] || 0,
        'Hinge opening': doorArr ? 'Left' : '',
        'Corner': isCornerChoose ? 'Left' : '',
        'Options': [],
        'Profile': '',
        'Glass Type': '',
        'Glass Color': '',
        'Glass Shelf': '',
        'Middle Section': '',
        'LED borders': [],
        'LED alignment': 'Center',
        'LED indent': '',
        'Note': '',
        price: 0,
        image_active_number: 1,

        'Door Profile': '',
        'Door Glass Type': '',
        'Door Glass Color': '',
        'Shelf Profile': '',
        'Shelf Glass Type': '',
        'Shelf Glass Color': '',
    };
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

export const addToCartProduct = (product: ProductType, values: productValuesType, productRange:productRangeType) => {
    const {images, id, category, name, legsHeight,isBlind, hasMiddleSection} = product
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
        image_active_number,
        price,
        cartExtras,

        // Excluded in standard cabinet
        'Custom Width Number': customWidth,
        'Custom Height Number': customHeight,
        'Custom Blind Width Number': customBlindWidth,
        'Middle Section Number': middleSection,
    } = values;

    const img = images[image_active_number - 1].value || ''
    const cartData: CartItemType = {
        id,
        uuid: uuidv4(),
        category,
        name,
        img: img,
        amount: 1,
        price: price,
        note,
    }

    const realW = width || customWidth || 0;
    const realH = height || customHeight || 0;
    const realD = depth || customDepth || 0;

    let extra: productExtraType = {
        width: realW,
        height: realH,
        depth: realD,
        isStandard: getIsProductStandard(productRange, realW, realH, realD),
        type: image_active_number,
        hinge: hinge,
        options: chosenOptions,
        legsHeight,
        cartExtras
    };

    if (isBlind) {
        extra.blindWidth = blindWidth || customBlindWidth || 0;
    }

    if (chosenOptions.includes('Glass Door')) {
        extra.doorProfile = doorProfile;
        extra.doorGlassType = doorGlassType;
        extra.doorGlassColor = doorGlassColor;
    }

    if (chosenOptions.includes('Glass Shelf')) {
        extra.shelfProfile = shelfProfile;
        extra.shelfGlassType = shelfGlassType;
        extra.shelfGlassColor = shelfGlassColor;
    }

    if (hasMiddleSection && middleSection) {
        extra.middleSection = middleSection
    }

    if (ledBorders.length) {
        extra.led = {
            border: ledBorders,
            alignment: ledAlignment,
            indent: ledIndent
        }
    }

    if (corner) {
        extra.corner = corner
    }
    cartData.productExtra = extra;

    return cartData
}

// export const addToCartStandardProduct = (values: standardProductValuesType, type: productTypings, id: number, isBlind: boolean, images: itemImg[], name: string, hasMiddleSection: true | undefined, category: productCategory, price: number, cartExtras: CartExtrasType, legsHeight: number, productRange: productRangeType) => {
//     const {
//         'Width': width,
//         'Blind Width': blindWidth,
//         'Height': height,
//         'Depth': depth,
//         'Custom Depth Number': customDepth,
//         'Hinge opening': hinge,
//         'Corner': corner,
//         Options: chosenOptions,
//         'Door Profile': doorProfile,
//         'Door Glass Type': doorGlassType,
//         'Door Glass Color': doorGlassColor,
//         'Shelf Profile': shelfProfile,
//         'Shelf Glass Type': shelfGlassType,
//         'Shelf Glass Color': shelfGlassColor,
//         'Note': note,
//         'LED borders': ledBorders,
//         'LED alignment': ledAlignment,
//         'LED indent': ledIndent
//     } = values;
//
//     const img = images[type - 1].value || ''
//     const cartData: CartItemType = {
//         id: id,
//         uuid: uuidv4(),
//         category,
//         name,
//         img: img,
//         amount: 1,
//         price: price,
//         note,
//     }
//
//     const realD = depth || customDepth || 0;
//
//     let extra: productExtraType = {
//         width: width,
//         height: height,
//         depth: depth || customDepth || 0,
//         isStandard: getIsProductStandard(productRange, width, height, realD),
//         type: type,
//         hinge: hinge,
//         options: chosenOptions,
//         legsHeight,
//         cartExtras
//     };
//
//     if (isBlind) {
//         extra.blindWidth = blindWidth;
//     }
//
//     if (chosenOptions.includes('Glass Door')) {
//         extra.doorProfile = doorProfile;
//         extra.doorGlassType = doorGlassType;
//         extra.doorGlassColor = doorGlassColor;
//     }
//
//     if (chosenOptions.includes('Glass Shelf')) {
//         extra.shelfProfile = shelfProfile;
//         extra.shelfGlassType = shelfGlassType;
//         extra.shelfGlassColor = shelfGlassColor;
//     }
//
//     if (ledBorders.length) {
//         extra.led = {
//             border: ledBorders,
//             alignment: ledAlignment,
//             indent: ledIndent
//         }
//     }
//
//     if (corner) {
//         extra.corner = corner
//     }
//     cartData.productExtra = extra;
//
//     return cartData
// }


export const addToCartCustomPart = (values: FormikValues, id: number, price: number | undefined, image: string, name: string, category: productCategory) => {
    const {
        ['Width Number']: width,
        ['Height Number']: height,
        ['Depth Number']: depth,
        ['Material']: material,
        ['Note']: note,
    } = values;


    const cartData: CartItemType = {
        id: id,
        uuid: uuidv4(),
        category,
        name,
        img: image || '',
        amount: 1,
        price: price ? price : 0,
        note,
        customPartExtra: {
            material,
            width: width || 0,
            height: height || 0,
            depth: depth || 0,
        }
    }

    return cartData
}

export const addToCartGlassDoor = (values: GlassDoorFormValuesType, id: number, image: string, name: string, category: productCategory) => {
    const {
        ['Width Number']: width,
        ['Height Number']: height,
        ['Depth']: depth,
        ['Material']: material,
        Profile: doorProfile,
        Type: doorType,
        Color: doorColor,
        ['Note']: note,
        price
    } = values;


    const cartData: CartItemType = {
        id: id,
        uuid: uuidv4(),
        category,
        name,
        img: image || '',
        amount: 1,
        price: price,
        note,
        customPartExtra: {
            width: width || 0,
            height: height || 0,
            depth: depth || 0,
        },
        glassDoorExtra: {
            material: material,
            Profile: doorProfile,
            Type: doorType,
            Color: doorColor
        }
    }

    return cartData
}

export const addToCartGlassShelf = (values: GlassShelfFormValuesType, id: number, image: string, name: string, category: productCategory) => {
    const {
        ['Width Number']: width,
        ['Height Number']: height,
        ['Depth']: depth,
        Color: shelfColor,
        ['Note']: note,
        price
    } = values;


    const cartData: CartItemType = {
        id: id,
        uuid: uuidv4(),
        category,
        name,
        img: image || '',
        amount: 1,
        price: price,
        note,
        customPartExtra: {
            material: 'Glass 1/4"',
            width: width || 0,
            height: height || 0,
            depth: depth || 0,
        },
    }

    if (shelfColor) cartData.glassShelfExtra = shelfColor;

    return cartData
}

export const addToCartPVC = (values: PVCFormValuesType, id: number, image: string, name: string, category: productCategory) => {
    const {
        ['Width Number']: pvcFeet,
        ['Material']: material,
        ['Note']: note,
        price

    } = values;


    const cartData: CartItemType = {
        id: id,
        uuid: uuidv4(),
        category,
        name,
        img: image || '',
        amount: 1,
        price: price,
        note,
        PVCExtra: {pvcFeet, material}
    }
    return cartData
}

export const addToCartLed = (values: LEDFormValuesType, id: number, image: string, name: string, category: productCategory) => {
    const cartData: CartItemType = {
        id: id,
        uuid: uuidv4(),
        category,
        name,
        img: image ?? '',
        price: values.price,
        amount: 1,
        note: values.Note,
        LEDAccessories: {
            "LED Aluminum Profiles": values["LED Aluminum Profiles"],
            "LED Gola Profiles": values["LED Gola Profiles"],
            "Door Sensor": values["Door Sensor"],
            "Dimmable Remote": values["Dimmable Remote"],
            Transformer: values["Transformer"]
        }
    }
    return cartData
}

export const addToCartDoorAccessories = (values: DoorAccessoiresValuesType, id: number, image: string, name: string, category: productCategory) => {
    const cartData: CartItemType = {
        id: id,
        uuid: uuidv4(),
        category,
        name,
        img: image ?? '',
        price: values.price,
        amount: 1,
        note: values.Note,
        DoorAccessories: {
            aventos: values.aventos,
            ["Door Hinge"]: values["Door Hinge"],
            "Hinge Holes": values["Hinge Holes"],
            PTO: values.PTO,
            servo: values.servo
        }
    }
    return cartData
}

export const isHasLedBlock = (category: productCategory): boolean => {
    const ledCategoryArr = ['Wall Cabinets', 'Gola Wall Cabinets'];
    return ledCategoryArr.includes(category)
}

export const addToCartDoor = (values: StandardDoorFormValuesType, id: number, image: string, name: string, category: productCategory) => {
    const cartData: CartItemType = {
        id: id,
        uuid: uuidv4(),
        category,
        name,
        img: image ?? '',
        price: values.price,
        amount: 1,
        note: values.Note,
        DoorExtra: {
            Doors: values['Doors'],
            Color: values['Color']
        }
    }
    return cartData
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
export const getDoorColorsArr = (doorFinishMaterial: string, room: RoomType | '', doors: doorType[], doorType: string): colorType[] | undefined => {
    const finishArr: finishType[] | undefined = doors.find(el => el.value === doorType)?.finish;
    if (!room) return undefined;
    if (room === 'Standard Door') {
        return doors.find(el => el.value === 'Painted')?.finish[0].colors;
    }
    return finishArr?.find(el => el.value === doorFinishMaterial)?.colors
}

export const getBoxMaterialArr = (isLeather: boolean, boxMaterial: materialsData[], leatherBoxMaterialArr: materialsData[]): materialsData[] => {
    if (isLeather) {
        return leatherBoxMaterialArr
    }
    return boxMaterial;
}

export const isLeatherType = (drawerColor: string | undefined, isLeather: boolean, leatherTypeArr: materialsData[]): boolean => {
    if (!leatherTypeArr.length || !drawerColor) return false
    return isLeather
}


export const checkDoors = (doors: number, doorArr: number[] | null, hingeOpening: string):number => {
    if (!doorArr && doors) return 0;
    if (doorArr?.length === 1 && doors !== doorArr[0]) return doorArr[0];
    if (doors === 1 && doorArr?.includes(2) && hingeOpening === 'Double Door') return 2
    if (doors === 2 && doorArr?.includes(1) && ['Left', 'Right'].includes(hingeOpening)) return 1
    return doors
}

// export const checkHingeOpening = (hingeOpening: string, hingeArr: string[], doors: number, setFieldValue: Function) => {
//     if (doors && !hingeArr.includes(hingeOpening)) setFieldValue('Hinge opening', hingeArr[0]);
// }


// export const checkProduct = (price: number, totalPrice: number, type: productTypings, newType: productTypings, cartExtras: CartExtrasType, dispatch: Function, roomId: MaybeUndefined<string>) => {
//     if (price !== totalPrice || type !== newType) {
//         roomId
//             ? dispatch(updateProductInRoom({
//                 _id: roomId,
//                 type: newType,
//                 price: totalPrice,
//                 cartExtras
//             })) :
//             dispatch(updateProduct({
//                 type: newType,
//                 price: totalPrice,
//                 cartExtras
//             }))
//     }
// }

export const getInitialMaterialInPVCForm = (materialArr: string[], doorFinish: string, doorType: string): string => {
    const curMaterial = materialArr.find(el => doorFinish.includes(el)) ?? doorType;
    return materialArr.includes(curMaterial) ? curMaterial : materialArr[0];
}

export const getCustomPartPVCPrice = (width: number, material: string): number => {
    return material === 'Ultrapan Acrilic' ? Math.ceil(width * 1.1) : Math.ceil(width);
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


export const getInitialMaterials = (): OrderFormType => {
    const storageMaterials = localStorage.getItem('materials');
    return storageMaterials ? JSON.parse(storageMaterials) : {
        'Category': '',
        'Door Type': '',
        'Door Finish Material': '',
        'Door Frame Width': '',
        'Door Color': '',
        'Door Grain': '',
        'Box Material': '',
        'Drawer': '',
        'Drawer Type': '',
        'Drawer Color': '',
        'Leather': ''
    };
}

export const getDoorStr = (choosenMaterials: [string, string][]): string | null => {
    const doorArr = choosenMaterials.filter(el => el[0].includes('Door'));
    if (!doorArr.length) return null;
    let str: string = '';
    doorArr.forEach(([key, val]) => {
        let part = `, ${val}`;
        if (key === 'Door Type') part = val;
        if (key === 'Door Frame Width') part = ` ${val}"`;
        str += part;
    })
    return str;
}

export const getSingleStr = (choosenMaterials: [string, string][], single: string): string | null => {
    const box = choosenMaterials.find(el => el[0].includes(single));
    if (!box) return null;
    return box[1];
}

export const getDrawerStr = (choosenMaterials: [string, string][]): string | null => {
    const drawerArr = choosenMaterials.filter(el => el[0].includes('Drawer'));
    if (!drawerArr.length) return null;
    let str: string = '';
    drawerArr.forEach(([key, val]) => {
        let part = `, ${val}`;
        if (key === 'Drawer') part = val;
        str += part;
    })
    return str;
}

export const getLeatherStr = (choosenMaterials: [string, string][]): string | null => {
    const leatherArr = choosenMaterials.filter(el => el[0].includes('Leather'));
    if (!leatherArr.length) return null;
    return leatherArr.map(el => el[1]).join(', ');
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