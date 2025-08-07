import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MaybeNull, productCategory} from "../../helpers/productTypes";
import {RoomFront, RoomType} from "../../helpers/roomTypes";
import {convertCartAPIToFront, convertRoomAPIToFront} from "../../helpers/helpers";
import {cartAPI, roomsAPI} from "../../api/api";
import {CartAPIResponse, CartItemFrontType, CartAPI} from "../../helpers/cartTypes";
import {withTryCatch} from "../../utils/withTryCatch";

export interface RoomsState {
    rooms: RoomFront[],
    cart_items: MaybeNull<CartItemFrontType[]>,
    active_room: MaybeNull<string>,
    loading_rooms: boolean;
    loading_cart_items: boolean,
    loading_sidebar: boolean,
    error: MaybeNull<string>;
}

const initialState: RoomsState = {
    rooms: [],
    cart_items: null,
    active_room: null,
    loading_rooms: false,
    loading_cart_items: false,
    loading_sidebar: false,
    error: null
}

export const fetchRooms = createAsyncThunk<RoomType[],                // Returned value
    { _id: string },           // Argument to the thunk
    { rejectValue: string }    // Type of rejected error
    >(
    'room/fetchRooms',
    async ({_id}, thunkAPI) => {
        return await withTryCatch<RoomType[]>(
            () => roomsAPI.getRooms(_id),
            thunkAPI
        );
    }
);


export const removeRoom = createAsyncThunk<RoomType[],
    { purchase_order_id: string, _id: string }>(
    'room/fetchRooms',
    async ({purchase_order_id, _id}, thunkAPI) => {
        return await withTryCatch(() => roomsAPI.deleteRoom(purchase_order_id, _id), thunkAPI);
    }
);

export const editRoom = createAsyncThunk<RoomType[],
    RoomType>(
    'room/fetchRooms',
    async (room, thunkAPI) => {
        return await withTryCatch(() => roomsAPI.editRoom(room), thunkAPI);
    }
);


export const fetchCart = createAsyncThunk<CartAPIResponse,
    { _id: string }>(
    'room/fetchCart',
    async ({_id}, thunkAPI) => {
        return await withTryCatch(() => cartAPI.getCart(_id), thunkAPI);
    }
);

export const updateCartAmount = createAsyncThunk<CartAPIResponse,
    { room_id: string, _id: string, amount: number }>(
    'room/fetchCart',
    async ({room_id, _id, amount}, thunkAPI) => {
        return await withTryCatch(() => cartAPI.updateAmount(room_id, _id, amount), thunkAPI);
    }
)

export const removeFromCart = createAsyncThunk<CartAPIResponse,
    { room_id: string, _id: string }>(
    'room/fetchCart',
    async ({room_id, _id}, thunkAPI) => {
        return await withTryCatch(() => cartAPI.remove(room_id, _id), thunkAPI);
    }
)

export const removeAllFromCart = createAsyncThunk<CartAPIResponse,
    { room_id: string }>(
    'room/fetchCart',
    async ({room_id}, thunkAPI) => {
        return await withTryCatch(() => cartAPI.removeAll(room_id), thunkAPI);
    }
)

export const addProduct = createAsyncThunk<CartAPIResponse,
    { product: CartAPI }>(
    'room/fetchCart',
    async ({product}, thunkAPI) => {
        return await withTryCatch(() => cartAPI.addToCart(product), thunkAPI);
    }
)

export const updateProduct = createAsyncThunk<CartAPIResponse,
    { product: CartAPI }>(
    'room/fetchCart',
    async ({product}, thunkAPI) => {
        return await withTryCatch(() => cartAPI.updateProduct(product), thunkAPI);
    }
)


export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        addRoom: (state, action: PayloadAction<RoomType>) => {
            state.rooms.push(convertRoomAPIToFront(action.payload))
        },
        roomSetActiveCategory: (state, action: PayloadAction<{ _id: string, category: productCategory }>) => {
            state.rooms = state.rooms.map(room => {
                return room._id === action.payload._id ? {
                    ...room,
                    activeProductCategory: action.payload.category
                } : room;
            })
        },
        setCart: (state, action: PayloadAction<CartAPIResponse>) => {
            const cart = action.payload.cart;
            const room = state.rooms.find(el => el._id === action.payload.room_id);
            state.cart_items = convertCartAPIToFront(cart, room)
        },
        updateCartAfterMaterialsChange: (state, action: PayloadAction<CartItemFrontType[]>) => {
            state.cart_items = action.payload
        },
        setActiveRoom: (state, action: PayloadAction<string>) => {
            state.active_room = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.pending, (state) => {
                state.loading_rooms = true;
                state.error = null;
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.rooms = action.payload.map(room => convertRoomAPIToFront(room));
                state.loading_rooms = false;
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.loading_rooms = false;
                state.error = action.payload as string;
            })

            .addCase(fetchCart.pending, (state) => {
                state.loading_cart_items = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                const cart = action.payload.cart;
                const room = state.rooms.find(el => el._id === action.payload.room_id);
                state.cart_items = convertCartAPIToFront(cart, room)
                state.loading_cart_items = false;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading_cart_items = false;
                state.error = action.payload as string;
            });
    },
})

export const {
    addRoom,
    setCart,
    updateCartAfterMaterialsChange,
    roomSetActiveCategory,
    setActiveRoom
} = roomSlice.actions

export default roomSlice.reducer