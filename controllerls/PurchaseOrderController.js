import PurchaseOrder from "../models/PurchaseOrder.js";
import RoomModel from "../models/Room.js";

export const create = async (req, res) => {
  try {
    const doc = new PurchaseOrder({
      ...req.body
    })
    const post = await doc.save()
      .catch(err => {
        console.log(err)
      });
    res.json(post);
  } catch (e) {
    res.status(500).json({
      message: 'Cannot create Process Order'
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const name = req.params.name;
    const doc = await PurchaseOrder.findOne({name: name});
    if (!doc) {
      return res.status(404).json({
        message: 'Process order not found'
      })
    }
    res.json(doc)
  } catch (e) {
    res.status(500).json({
      message: 'Cannot get Process order'
    })
  }
}

export const getAllPO = async (req, res) => {
  try {
    const PurchaseOrders = await PurchaseOrder.find({user_id: req.params.userId});

    if (!PurchaseOrders) {
      return res.status(404).json({
        message: 'Purchase orders not found'
      })
    }
    res.json(PurchaseOrders)

  } catch (e) {
    res.status(500).json({
      message: 'Cannot get Purchase orders'
    })
  }
}

export const remove = async (req, res) => {
  try {
    const PurchaseOrderId = req.params.id;
    PurchaseOrder.findByIdAndDelete(PurchaseOrderId).then((resPO) => {
      if (!resPO) {
        return res.status(404).json({
          message: 'Purchase orders not found'
        })
      }
      return res.json(resPO);
    });
  } catch (e) {
    res.status(500).json({
      message: 'Cannot get Purchase orders'
    })
  }
}

export const updatePO = async (req, res) => {
  try {
    const PurchaseOrderId = req.params.id;
    await PurchaseOrder.findByIdAndUpdate(PurchaseOrderId, {
      ...req.body
    }, {
      returnDocument: "after",
    }).then(doc => {
      if (!doc) {
        return res.status(404).json({
          message: 'Purchase orders not found'
        })
      }
      return res.json(doc);
    });

  } catch (e) {
    res.status(500).json({
      message: 'Cannot update Purchase orders'
    })
  }
}


export const getPORooms = async (req, res) => {
  try {
    const po_id = req.params.id;
    const rooms = await RoomModel.find({purchase_order_id: po_id});
    if (!rooms) {
      return res.status(404).json({
        message: 'Rooms not found'
      })
    }

    const data = rooms.map(room => {
      const {_doc} = room
      const {cart, ...rest} = _doc;
      return rest;
    })

    res.json(data)
  } catch (e) {
    res.status(500).json({
      message: 'Cannot get rooms'
    })
  }
}