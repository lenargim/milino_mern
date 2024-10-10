import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MaybeEmpty, MaybeNull, RoomInitialType} from "../../Components/Profile/RoomForm";
import {productCategory, ProductType,} from "../../helpers/productTypes";
import {CartAPIResponse, CartFront} from "../../api/apiFunctions";
import {getCartArrFront, getCartFront, getRoomFront} from "../../helpers/helpers";

export interface RoomTypeAPI extends RoomInitialType {
    _id: string,
    activeProductCategory: MaybeEmpty<productCategory>,
    productPage: MaybeNull<ProductType>,
    cart: CartAPIResponse[]
}

export interface RoomFront extends RoomInitialType {
    _id: string,
    activeProductCategory: MaybeEmpty<productCategory>,
    productPage: MaybeNull<ProductType>,
    cart: CartFront[]
}

interface RoomsState {
    rooms: RoomFront[],
}

const initialState: RoomsState = {
    rooms: []
}

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        getRooms: (state, action: PayloadAction<RoomTypeAPI[]>) => {
            state.rooms = action.payload.map(room => {
                return getRoomFront(room)
            })
        },
        addRoom: (state, action: PayloadAction<RoomTypeAPI>) => {
            state.rooms.push(getRoomFront(action.payload))
        },
        editRoom: (state, action: PayloadAction<RoomTypeAPI>) => {
            state.rooms = state.rooms.map(room => {
                return room._id === action.payload._id ? getRoomFront(action.payload) : room;
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
        updateCartInRoom: (state, action: PayloadAction<{ cart: CartAPIResponse[], _id: string }>) => {
            state.rooms = state.rooms.map(room => {

                return room._id === action.payload._id ? {
                    ...room,
                    cart: getCartArrFront(action.payload.cart, room)
                } : room;
            })
        },
        removeFromCartInRoom: (state, action: PayloadAction<{ room: string, _id: string }>) => {
            state.rooms = state.rooms.map(room => {
                return room._id === action.payload.room ?
                    {...room, cart: room.cart.filter(item => item._id !== action.payload._id)}
                    : room;
            })
        },
        updateCartAmountInRoom: (state, action: PayloadAction<CartAPIResponse>) => {
            state.rooms = state.rooms.map(room => {
                const cart = room.cart;
                return room._id === action.payload.room ?
                    {
                        ...room, cart: cart.map((item) => {
                            const newItem = getCartFront(action.payload, room);
                            return item._id === action.payload._id && newItem ? newItem : item
                        })
                    }
                    : room;
            })
        }
    }
})

export const {
    addRoom,
    getRooms,
    editRoom,
    deleteRoom,
    roomSetActiveCategory,
    updateCartInRoom,
    removeFromCartInRoom,
    updateCartAmountInRoom
} = roomSlice.actions

export default roomSlice.reducer