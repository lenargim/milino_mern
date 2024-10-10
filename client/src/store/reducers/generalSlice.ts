import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OrderFormType} from "../../helpers/types";
import {
    attrItem, CartExtrasType, cornerTypes,
    customPartDataType, hingeTypes,
    productCategory, ProductType,
    productTypings
} from "../../helpers/productTypes";
import {LEDAccessoriesType} from "../../Components/CustomPart/LEDForm";
import {DoorAccessoiresType} from "../../Components/CustomPart/DoorAccessoiresForm";
import {DoorType} from "../../Components/CustomPart/StandardDoorForm";
import {MaybeNull} from "../../Components/Profile/RoomForm";


interface GeneralState {
    materials: OrderFormType | null,
    product: MaybeNull<ProductType>,
    customPart: customPartDataType | null,
    cart: CartItemType[]
}

export type CartItemType = {
    id: number,
    uuid: string,
    name: string,
    category: productCategory,
    amount: number,
    price: number,
    note: string,
    img: string,
    productExtra?: productExtraType,
    customPartExtra?: customPartExtraType,
    glassDoorExtra?: glassDoorExtraType,
    glassShelfExtra?: string,
    PVCExtra?: PVCExtraType,
    DoorExtra?: DoorType
    LEDAccessories?: LEDAccessoriesType,
    DoorAccessories?: DoorAccessoiresType,
}

export type glassDoorExtraType = {
    material?: string,
    Profile?: string,
    Type?: string,
    Color?: string
}

export type PVCExtraType = {
    pvcFeet: number,
    material: string,
}


export type productExtraType = {
    width: number,
    height: number,
    depth: number,
    type: productTypings,
    isStandardSize: boolean,
    blindWidth?: number,
    hinge: hingeTypes,
    corner?: cornerTypes,
    legsHeight: number,
    options: string[],
    doorProfile?: string,
    doorGlassType?: string,
    doorGlassColor?: string,
    shelfProfile?: string,
    shelfGlassType?: string,
    shelfGlassColor?: string,
    middleSection?: number,
    led?: {
        border: string[],
        alignment: string,
        indent?: string
    },
    leather?: string,
    cartExtras: CartExtrasType
}

export type customPartExtraType = {
    width: number,
    height: number,
    depth: number,
    material?: string,
}

export interface productChangeMaterialType extends CartItemType {
    width: number,
    height: number,
    depth: number,
    image_active_number: productTypings,
    attributes: attrItem[],
    options: string[],
    isBlind: boolean,
    isAngle: boolean,
    customHeight?: number,
    customDepth?: number,
}

export const initialCartExtras = {
    ptoDoors: 0,
    ptoDrawers: 0,
    glassShelf: 0,
    glassDoor: 0,
    ptoTrashBins: 0,
    ledPrice: 0,
    coefExtra:0,
    attributes: [],
    boxFromFinishMaterial: false
}

const initialState: GeneralState = {
    materials: null,
    product: null,
    customPart: null,
    cart: [],
}

type updateProductType = {
    type: productTypings,
    price: number,
    cartExtras:CartExtrasType
}
type updateProductAmountType = {
    uuid: string,
    amount: number,
}

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setMaterials: (state, action: PayloadAction<MaybeNull<OrderFormType>>) => {
            state.materials = action.payload
        },
        // setProduct: (state, action: PayloadAction<ProductType | null>) => {
        //     const payload = action.payload;
        //     if (payload) {
        //         state.product = {...payload, image_active_number: 1, price: 0, cartExtras: initialCartExtras}
        //     } else {
        //         state.product = null;
        //     }
        //
        // },
        setCustomPart: (state, action: PayloadAction<customPartDataType | null>) => {
            state.customPart = action.payload
        },
        addToCart: (state, action: PayloadAction<CartItemType>) => {
            state.cart = [...state.cart, action.payload];
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        fillCart: (state, action: PayloadAction<CartItemType[]>) => {
            state.cart = action.payload;
        },
        updateCartItemPrice: (state, action: PayloadAction<{uuid:string, price:number}>) => {
            const cartItem = state.cart.find(itemEl => itemEl.uuid === action.payload.uuid);
            if (cartItem) {
                cartItem.price = action.payload.price;
                const foundIndex = state.cart.findIndex(x => x.uuid === cartItem.uuid);
                state.cart[foundIndex] = cartItem;
            }
        },
        deleteItemFromCart: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter(item => item.uuid !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeCart: (state) => {
            state.cart = [];
            localStorage.removeItem('cart');
        },
        // updateProduct: (state, action: PayloadAction<updateProductType>) => {
        //     if (state.product) {
        //         state.product.price = action.payload.price;
        //         state.product.image_active_number = action.payload.type;
        //         state.product.cartExtras = action.payload.cartExtras;
        //     }
        // },
        updateProductAmount: (state, action: PayloadAction<updateProductAmountType>) => {
            const product = state.cart.find(el => el.uuid === action.payload.uuid);
            if (product) {
                product.amount = action.payload.amount
                localStorage.setItem('cart', JSON.stringify(state.cart));
            }
        }
    }
})

export const {
    setMaterials,
    setCustomPart,
    addToCart,
    deleteItemFromCart,
    removeCart,
    fillCart,
    updateProductAmount,
    updateCartItemPrice
} = generalSlice.actions

export default generalSlice.reducer