import PurchaseOrder from "../models/PurchaseOrder.js";
import RoomModel from "../models/Room.js";
import CartModel from "../models/Cart.js";

export const getAllPO = async (req, res) => {
    try {
        const PurchaseOrders = await PurchaseOrder.find({
            user_id: req.params.user_id,
        });

        if (!PurchaseOrders) {
            return res.status(404).json({
                message: 'Purchase orders not found'
            })
        }

        res.status(200).json(PurchaseOrders)
    } catch (e) {
        res.status(500).json({
            message: 'Cannot get Purchase orders'
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PurchaseOrder({
            ...req.body,
            is_archived: false
        })
        // Проверяем, есть ли в бд PO с таким именем (без учета регистра) у конкретного пользователя;
        const PO = await PurchaseOrder.findOne({
            name: {$regex: `^${req.body.name}$`, $options: 'i'},
            user_id: req.body.user_id
        }).exec();
        if (PO) {
            res.status(409).json({message: 'Purchase order name occupied'});
        } else {
            const post = await doc.save()
                .catch(err => {
                    console.log(err)
                });

            const data = {
                _id: post._id,
                name: post.name,
                user_id: post.user_id
            }
            res.status(201).json(data);
        }
    } catch (e) {
        res.status(500).json({
            message: 'Cannot create Process Order'
        })
    }
}

export const remove = async (req, res, next) => {
    try {
        const purchase_order_id = req.body.purchase_order_id;
        const deletedPO = await PurchaseOrder.findByIdAndDelete(purchase_order_id);
        if (!deletedPO) {
            return res.status(404).json({
                message: 'Purchase orders not found'
            })
        }

        const rooms = await RoomModel.find({ purchase_order_id: purchase_order_id })
            .select('_id')
            .lean();

        const roomIds = rooms.map(room => room._id);
        if (roomIds.length > 0) {
            await CartModel.deleteMany({ room_id: { $in: roomIds } });
        }

        await RoomModel.deleteMany({ purchase_order_id: purchase_order_id });

        req.params.user_id = req.body.user_id;
        next();
    } catch (e) {
        console.error('Error during cascading delete:', e);
        res.status(500).json({
            message: 'Error during cascading delete'
        })
    }
}

export const update = async (req, res) => {
    try {
        const updatedPO = await PurchaseOrder.findByIdAndUpdate(
            req.params.purchase_order_id,
            { $set: req.body },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedPO) {
            return res.status(404).json({
                message: 'Purchase order not found'
            });
        }

        const data = await PurchaseOrder.find({
            user_id: updatedPO.user_id
        });

        return res.status(200).json(data);

    } catch (e) {
        console.error(e);

        return res.status(500).json({
            message: 'Cannot update Purchase order'
        });
    }
};