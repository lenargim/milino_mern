import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    AngleType,
    attrItem, CartExtrasType, cornerTypes,
    customPartDataType, hingeTypes, MaybeNull,
    ProductType,
    productTypings
} from "../../helpers/productTypes";
import {MaterialsFormType} from "../../common/MaterialsForm";
import {CartItemFrontType} from "../../api/apiFunctions";



interface GeneralState {
    materials: MaybeNull<MaterialsFormType>,
    product: MaybeNull<ProductType>,
    customPart: customPartDataType | null,
    cart: CartItemFrontType[]
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

export interface productChangeMaterialType extends CartItemFrontType {
    width: number,
    height: number,
    depth: number,
    image_active_number: productTypings,
    attributes: attrItem[],
    options: string[],
    isBlind: boolean,
    isAngle: AngleType,
    customHeight?: number,
    customDepth?: number,
}

// export const initialCartExtras = {
//     ptoDoors: 0,
//     ptoDrawers: 0,
//     glassShelf: 0,
//     glassDoor: 0,
//     ptoTrashBins: 0,
//     ledPrice: 0,
//     coefExtra:0,
//     attributes: [],
//     boxFromFinishMaterial: false
// }

const initialState: GeneralState = {
    materials: null,
    product: null,
    customPart: null,
    cart: [],
}

// type updateProductType = {
//     type: productTypings,
//     price: number,
//     cartExtras:CartExtrasType
// }
type updateProductAmountType = {
    _id: string,
    amount: number,
}

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setMaterials: (state, action: PayloadAction<MaybeNull<MaterialsFormType>>) => {
            state.materials = action.payload
        },
        setCustomPart: (state, action: PayloadAction<MaybeNull<customPartDataType>>) => {
            state.customPart = action.payload
        },
        // addToCart: (state, action: PayloadAction<CartItemFrontType>) => {
        //     state.cart = [...state.cart, {...action.payload}];
        //     localStorage.setItem('cart', JSON.stringify(state.cart));
        // },
        fillCart: (state, action: PayloadAction<CartItemFrontType[]>) => {
            state.cart = action.payload;
        },
        updateCartItemPrice: (state, action: PayloadAction<{_id:string, price:number}>) => {
            const cartItem = state.cart.find(item => item._id === action.payload._id);
            if (cartItem) {
                cartItem.price = action.payload.price;
                const foundIndex = state.cart.findIndex(x => x._id === cartItem._id);
                state.cart[foundIndex] = cartItem;
            }
        },
        deleteItemFromCart: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter(item => item._id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeCart: (state) => {
            state.cart = [];
            localStorage.removeItem('cart');
        },
        updateProductAmount: (state, action: PayloadAction<updateProductAmountType>) => {
            const product = state.cart.find(el => el._id === action.payload._id);
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
    // addToCart,
    deleteItemFromCart,
    removeCart,
    fillCart,
    updateProductAmount,
    updateCartItemPrice
} = generalSlice.actions

export default generalSlice.reducer