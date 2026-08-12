import mongoose from "mongoose";

const PurchaseOrderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    is_archived: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    },
    versionKey: false
})

export default mongoose.model('PurchaseOrders', PurchaseOrderSchema);