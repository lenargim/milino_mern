import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {productCategory} from "../../helpers/productTypes";
import {RoomFront, RoomType} from "../../helpers/roomTypes";
import {convertRoomAPIToFront} from "../../helpers/helpers";

export interface RoomsState {
    rooms: RoomFront[],
    // loading: boolean;
    // error: MaybeNull<string>;
}

const initialState: RoomsState = {
    rooms: [],
    // loading: false,
    // error: null
}

// export const fetchRooms = createAsyncThunk<
//     RoomType[],           // Return type
//     {_id:string},           // Argument type (the _id)
//     { state: RoomsState }
//     >(
//     'room/fetchRooms', getRooms(_id)
// );

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRooms: (state, action: PayloadAction<RoomType[]>) => {
            state.rooms = action.payload.map(room => convertRoomAPIToFront(room))
        },
        addRoom: (state, action: PayloadAction<RoomType>) => {
            state.rooms.push(convertRoomAPIToFront(action.payload))
        },
        // setRooms: (state, action: PayloadAction<RoomType[]>) => {
        //     state.rooms = state.rooms.map(room => {
        //         return room._id === action.payload._id ? {...getRoomFront(action.payload)} : room;
        //     })
        // },
        editRoom: (state, action: PayloadAction<RoomType>) => {
            const editable_roo = action.payload
            state.rooms = state.rooms.map(room => {
                return room._id === editable_roo._id ? convertRoomAPIToFront(editable_roo) : room;
            })
        },
        deleteRoom: (state, action: PayloadAction<RoomType>) => {
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
        // updateCartInRoom: (state, action: PayloadAction<CartAPI[]>) => {
        //     state.rooms = state.rooms.map(room => {
        //         const room_id = action.payload.cart[0].room_id;
        //         return room._id === room_id ? {
        //             ...room,
        //             cart: useGetCartArrFront(action.payload.cart, room)
        //         } : room;
        //     })
        // },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchRooms.pending, (state) => {
    //             state.loading = true;
    //             state.error = null;
    //         })
    //         .addCase(fetchRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
    //             state.loading = false;
    //             state.rooms = action.payload;
    //         })
    //         .addCase(fetchRooms.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.error.message || 'Failed to fetch rooms';
    //         });
    // },
})

export const {
    addRoom,
    setRooms,
    editRoom,
    deleteRoom,
    roomSetActiveCategory
} = roomSlice.actions

export default roomSlice.reducer