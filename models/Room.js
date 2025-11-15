import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  purchase_order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PurchaseOrder'
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
  groove: {
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
  },
  leather: {
    type: String
  },
  leather_note: {
    type: String
  },
  rod: {
    type: String
  },
  is_deleted: {
    type: Boolean
  }
},{timestamps: true})

export default mongoose.model('Room', RoomSchema);