import RoomModel from "../models/Room.js";

export const addToCart = async (req, res) => {
  try {
    const roomId = req.params.roomId;

    const doc = await RoomModel.findByIdAndUpdate(roomId, {
        $push: {cart: {...req.body}}
      },
      {
        returnDocument: "after",
      });

    if (!doc) {
      return res.status(404).json({
        message: 'Process Order not found'
      })
    }


    res.json(doc.cart);
  } catch (e) {
    res.status(500).json({
      message: 'Cannot create Cart'
    })
  }
}

export const remove = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const cartId = req.params.cartId;
    const doc = await RoomModel.findByIdAndUpdate(roomId, {
      $pull: {cart: {_id: cartId}}
    }, {
      returnDocument: "after",
    })

    if (!doc) {
      return res.status(404).json({
        message: 'Cart Item not found'
      })
    }
    return res.json(doc.cart);


  } catch (e) {
    res.status(500).json({
      message: 'Cannot remove cart item'
    })
  }
}

export const update = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const cartId = req.params.cartId;

    const doc = await RoomModel.findByIdAndUpdate(roomId,
      {
        $set: {"cart.$[cartId].amount": req.body.amount},
      }, {
        returnDocument: "after",
        arrayFilters: [{
          "cartId._id": cartId
        }]
      })

    if (!doc) {
      return res.status(404).json({
        message: 'Cart Item not found'
      })
    }
    return res.json(doc.cart);


  } catch (e) {
    res.status(500).json({
      message: 'Cannot update Cart'
    })
  }
}