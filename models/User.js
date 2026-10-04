import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
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
        unique: true,
        trim: true,
        lowercase: true
    },
    additional_emails: {
        type: [String],
    },
    phone: {
        type: String,
        required: true,
    },
    website: {
        type: String,
    },
    is_active: {
        type: Boolean,
    },
    is_active_in_constructor: {
        type: Boolean,
    },
    constructor_id: {
        type: String,
    },
    user_type: {
        type: String,
        enum: ['manager', 'designer', 'admin'],
        required: true
    },
    passwordHash: {
        type: String,
        required: true,
    },
    manager_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    },
    versionKey: false,
})


export default model('User', UserSchema);