import UserModel from "../models/User.js";
import PurchaseOrder from "../models/PurchaseOrder.js";
import Room from "../models/Room.js";
import Cart from "../models/Cart.js";

export const getUsers = async (req, res) => {
    try {
        const sort = req.body.sort;
        const page = req.body.page;
        let resultsPerPage = 50;

        const doc = await UserModel
            .find({is_super_user: {$ne: true}})
            .skip((page - 1) * resultsPerPage)
            .limit(resultsPerPage + 1)
            .sort(sort)
            .collation({caseLevel: false, locale: 'en'});

        if (!doc) {
            return res.status(400).json({
                message: "No users"
            })
        }


        let hasNextPage = false;
        if (doc.length > resultsPerPage) {
            hasNextPage = true;
            doc.pop();
        }
        const users = doc.map(user => ({
            _id: user._doc._id,
            email: user._doc.email,
            name: user._doc.name,
            company: user._doc.company,
            is_active: user._doc.is_active,
            is_active_in_constructor: user._doc.is_active_in_constructor || false,
            createdAt: user._doc.createdAt
        }));


        const usersWithCartFilled = await Promise.all(
            doc.map(async user => {
                const user_public_fields = {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    company: user.company,
                    is_active: user.is_active,
                    is_active_in_constructor: user.is_active_in_constructor || false,
                    createdAt: user.createdAt,
                    is_cart_filled: false,
                };
                if (!user.is_active) return user_public_fields;

                const purchaseOrders = await PurchaseOrder.find(
                    {user_id: user._id},
                    {_id: 1}
                ).lean();

                if (purchaseOrders.length === 0) return user_public_fields;

                const rooms = await Room.find(
                    {
                        purchase_order_id: {
                            $in: purchaseOrders.map(po => po._id),
                        },
                    },
                    {_id: 1}
                ).lean();

                if (rooms.length === 0) return user_public_fields;

                const hasCart = await Cart.exists({
                    room_id: {
                        $in: rooms.map(room => room._id),
                    },
                });

                return {
                    ...user_public_fields,
                    is_cart_filled: !!hasCart,
                };
            })
        );

        res.status(200).json({
            users: usersWithCartFilled,
            hasNextPage,
            sort,
            page
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Getting users failed"
        })
    }
}

export const toggleUserEnabled = async (req, res) => {
    try {

        const doc = await UserModel.findByIdAndUpdate(req.params.userId, {
            $set: {
                "is_active": req.body.is_active,
                "is_active_in_constructor": req.body.is_active_in_constructor
            },
        }, {
            returnDocument: "after"
        })
        if (!doc) {
            return res.status(400).json({
                message: "No user"
            })
        }
        res.status(200).json(doc._doc)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Toggle user failed"
        })
    }
}
