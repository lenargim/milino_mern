import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  },
  product_id: {
    type: Number,
    required: true,
  },
  product_type: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  depth: {
    type: Number,
    required: true,
  },
  blind_width: {
    type: Number,
  },
  middle_section: {
    type: Number,
  },
  hinge: {
    type: String,
  },
  corner: {
    type: String,
  },
  options: {
    type: Array,
    default: [],
  },
  door_option: {
    type: Array,
    default: [],
  },
  shelf_option: {
    type: Array,
    default: [],
  },
  led_border: {
    type: Array,
    default: [],
  } ,
  led_alignment: {
    type: String,
  },
  led_indent: {
    type: String,
  },
  leather: {
    type: String,
  },
  note: {
    type: String,
  }
},{timestamps: true})

export default mongoose.model('Cart', CartSchema);