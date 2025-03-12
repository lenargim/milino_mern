import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
  },
  is_signed_in_constructor: {
    type: Boolean,
  },
  is_active_in_constructor: {
    type: Boolean,
  },
  is_super_user: {
    type: Boolean,
  },
  passwordHash: {
    type: String,
    required: true,
  }
}, {timestamps: true})


export default mongoose.model('User', UserSchema);