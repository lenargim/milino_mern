import PurchaseOrder from "../models/PurchaseOrder.js";

export const getAllPO = async (req, res) => {
  try {
    const PurchaseOrders = await PurchaseOrder.find({user_id: req.params.userId, is_deleted: false});
    if (!PurchaseOrders) {
      return res.status(404).json({
        message: 'Purchase orders not found'
      })
    }
    // const {is_deleted, ...data} = PurchaseOrders;
    const data = PurchaseOrders.map(po => {
      return {
        _id: po._id,
        name: po.name,
        user_id: po.user_id
      }
    })
    res.status(200).json(data)
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
      is_deleted: false
    })
    // Проверяем, есть ли в бд PO с таким именем (без учета регистра) у конкретного пользователя;
    const PO = await PurchaseOrder.findOne({
      name: { $regex: `^${req.body.name}$`, $options: 'i' },
      user_id: req.body.user_id,
      is_deleted: false
    }).exec();
    if (PO) {
      res.status(409).json({ message: 'Purchase order name occupied' });
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
    await PurchaseOrder.findByIdAndUpdate(req.body.purchase_order_id,
      {is_deleted: true},
      {returnDocument: "after"},
    ).then((resPO) => {
      if (!resPO) {
        return res.status(404).json({
          message: 'Purchase orders not found'
        })
      }
      req.params.userId = req.body.user_id;
      next();
    });
  } catch (e) {
    res.status(500).json({
      message: 'Cannot remove Purchase order'
    })
  }
}

export const update = async (req, res) => {
  try {
    await PurchaseOrder.findByIdAndUpdate(req.params.id,
      {...req.body},
      {returnDocument: "after"}
    ).then(doc => {
      if (!doc) {
        return res.status(404).json({
          message: 'Purchase order not found'
        })
      }
      const data = {
        _id: doc._id,
        name: doc.name,
        user_id: doc.user_id
      }
      return res.status(200).json(data);
    });
  } catch (e) {
    res.status(500).json({
      message: 'Cannot update Purchase order'
    })
  }
}