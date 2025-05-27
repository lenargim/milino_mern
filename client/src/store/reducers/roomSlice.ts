import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MaybeNull, MaybeUndefined, productCategory} from "../../helpers/productTypes";
import {RoomFront, RoomType} from "../../helpers/roomTypes";
import {convertRoomAPIToFront, me} from "../../helpers/helpers";
import {roomsAPI} from "../../api/api";
import {withRetry} from "../../utils/withRetry";

export interface RoomsState {
    rooms: RoomFront[],
    loading: boolean;
    error: MaybeNull<string>;
}

const initialState: RoomsState = {
    rooms: [],
    loading: false,
    error: null
}


// export const fetchRooms = createAsyncThunk(
//     'room/fetchRooms',
//     async (_id: string, thunkAPI) => {
//         const response = await roomsAPI.getRooms(_id)
//         return response.data
//     },
// )

export const fetchRooms = createAsyncThunk<
    RoomType[], // ✅ This is now correct
    { _id: string }
    >(
    'room/fetchRooms',
    async ({ _id }, thunkAPI) => {
        return await withRetry(
            roomsAPI.getRooms,
            [_id],
            'Unable to fetch rooms',
            thunkAPI
        );
    }
);


export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        // setRooms: (state, action: PayloadAction<RoomType[]>) => {
        //     state.rooms = action.payload.map(room => convertRoomAPIToFront(room))
        // },
        addRoom: (state, action: PayloadAction<RoomType>) => {
            state.rooms.push(convertRoomAPIToFront(action.payload))
        },
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                console.log(action.payload)
                state.rooms = action.payload.map(room => convertRoomAPIToFront(room));
                state.loading = false;
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
})

export const {
    addRoom,
    editRoom,
    deleteRoom,
    roomSetActiveCategory
} = roomSlice.actions

export default roomSlice.reducer