import mongoose from "mongoose";

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
  drawer: {
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
}, {timestamps: true})
export default mongoose.model('Room', RoomSchema);
