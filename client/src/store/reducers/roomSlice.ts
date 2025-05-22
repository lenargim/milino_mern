import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MaybeEmpty, MaybeNull, productCategory, ProductType,} from "../../helpers/productTypes";
import {CartAPI, CartItemFrontType} from "../../api/apiFunctions";
import {
    getCartArrFront,
    getRoomFront,
} from "../../helpers/helpers";
import {MaterialsFormType} from "../../Components/Room/RoomMaterialsForm";

export interface RoomTypeAPI extends MaterialsFormType {
    _id: string,
    purchase_order_id: string,
    cart: CartAPI[]
}

export interface RoomFront extends MaterialsFormType {
    _id: string,
    purchase_order_id: string,
    productPage: MaybeNull<ProductType>,
    activeProductCategory: MaybeEmpty<productCategory>,
    cart: CartItemFrontType[]
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
        setRoom: (state, action: PayloadAction<RoomTypeAPI>) => {
            state.rooms = state.rooms.map(room => {
                return room._id === action.payload._id ? {...getRoomFront(action.payload)} : room;
            })
        },
        editRoom: (state, action: PayloadAction<RoomTypeAPI>) => {
            state.rooms = state.rooms.map(room => {
                return room._id === action.payload._id ?
                    {...getRoomFront(action.payload)}
                    : room;
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
        updateCartInRoom: (state, action: PayloadAction<{ cart: CartAPI[] }>) => {
            state.rooms = state.rooms.map(room => {
                const room_id = action.payload.cart[0].room_id;
                return room._id === room_id ? {
                    ...room,
                    cart: getCartArrFront(action.payload.cart, room)
                } : room;
            })
        },
        updateCartAfterMaterialsChange: (state, action: PayloadAction<{ room: string, cart: CartItemFrontType[] }>) => {
            state.rooms = state.rooms.map(room => {
                return room._id === action.payload.room ?
                    {...room, cart: action.payload.cart}
                    : room;
            })
        }
    }
})

export const {
    addRoom,
    setRoom,
    getRooms,
    editRoom,
    deleteRoom,
    roomSetActiveCategory,
    updateCartInRoom,
    updateCartAfterMaterialsChange
} = roomSlice.actions

export default roomSlice.reducer