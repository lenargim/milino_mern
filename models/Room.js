import mongoose from "mongoose";


// export interface IRoom extends mongoose.Document {
//     room_name: string;
//     user: string,
//     category: string,
//     door_type?: string,
//     door_finish_material?: string,
//     door_frame_width?: string,
//     door_color?: string,
//     door_grain?: string,
//     box_material: string,
//     drawer: string
//     drawer_type: string
//     drawer_color: string
//     leather?: string
// }

const RoomSchema = new mongoose.Schema({
    room_name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    },
    category: {
        type: String,
        required: true,
    },
    gola: {
      type: String
    },
    door_type: {
        type: String,
    },
    door_finish_material: {
        type: String,
    },
    door_frame_width: {
        type: String
    },
    door_color: {
        type: String
    },
    door_grain: {
        type: String
    },
    box_material: {
        type: String,
        required: true,
    },
    box_color: {
        type: String,
    },
    drawer_brand: {
        type: String,
        required: true,
    },
    drawer_type: {
        type: String,
        required: true,
    },
    drawer_color: {
        type: String,
        required: true,
    },
    leather: {
        type: String
    }
})

export default mongoose.model('Room', RoomSchema);