import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MaybeEmpty, MaybeNull, RoomInitialType} from "../../Components/Profile/RoomForm";
import {
    CartExtrasType,
    productCategory,
    ProductType,
    productTypings,
} from "../../helpers/productTypes";
import {CartItemType} from "./generalSlice";

export interface RoomTypeAPI extends RoomInitialType {
    _id: string,
    activeProductCategory: MaybeEmpty<productCategory>,
    productPage: MaybeNull<ProductType>,
    cart: CartItemType[]
}

interface RoomsState {
    rooms: RoomTypeAPI[],
}

const initialState: RoomsState = {
    rooms: []
}

type updateProductType = {
    _id: string,
    type: productTypings,
    price: number,
    cartExtras: CartExtrasType,
}

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        getRooms: (state, action: PayloadAction<RoomTypeAPI[]>) => {
            state.rooms = action.payload
        },
        addRoom: (state, action: PayloadAction<RoomTypeAPI>) => {
            state.rooms.push(action.payload)
        },
        editRoom: (state, action: PayloadAction<RoomTypeAPI>) => {
            state.rooms = state.rooms.map(room => {
                return room._id === action.payload._id ? action.payload : room;
            })
        },
        deleteRoom: (state, action: PayloadAction<RoomTypeAPI>) => {
            state.rooms = state.rooms.filter(room => room._id !== action.payload._id);
        },
        roomSetActiveCategory: (state, action: PayloadAction<{ _id: string, category: productCategory }>) => {
            state.rooms = state.rooms.map(room => {
                return room._id === action.payload._id ? {
                    ...room,
                    activeProductCategory: action.payload.category
                } : room;
            })
        },
        updateCartInRoom: (state, action: PayloadAction<{cart:CartItemType[],_id:string}>) => {
            state.rooms = state.rooms.map(room => {
                return room._id === action.payload._id ? {
                    ...room,
                    cart: action.payload.cart
                } : room;
            })
        }
        // setProduct: (state, action: PayloadAction<{ product: productDataType | null, roomId: string }>) => {
        //     const prod: productType | standardProductType | null = action.payload.product ?
        //         {
        //             ...action.payload.product,
        //             type: 1,
        //             price: 0,
        //             cartExtras: initialCartExtras
        //
        //         }
        //         : null;
        //     state.rooms = state.rooms.map(room => {
        //         return room._id === action.payload.roomId
        //             ? {
        //                 ...room, productPage: prod
        //             }
        //             : room;
        //     })
        // },
        // addToCartInRoom: (state, action: PayloadAction<{ product: CartItemType, _id: string }>) => {
        //     state.rooms = state.rooms.map(room => {
        //         return room._id === action.payload._id ? {
        //             ...room, cart: [action.payload.product]
        //         } : room;
        //     })
        // },
        // updateProductInRoom: (state, action: PayloadAction<updateProductType>) => {
        //     const {_id, type, price, cartExtras} = action.payload
        //     state.rooms = state.rooms.map(room => {
        //         const {productPage} = room
        //         const newPage:productType | standardProductType|null = productPage ? JSON.parse(JSON.stringify(productPage)):null;
        //         return newPage && room._id === _id ? {
        //             ...room, productPage: {
        //                 ...newPage,
        //                 type,
        //                 price,
        //                 cartExtras
        //             }
        //         } : room;
        //     })
        // },
    }
})

export const {
    addRoom,
    getRooms,
    editRoom,
    deleteRoom,
    roomSetActiveCategory,
    updateCartInRoom,
} = roomSlice.actions

export default roomSlice.reducer