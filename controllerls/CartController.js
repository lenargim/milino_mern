import CartModel from './../models/Cart.js'

export const getCart = async (req, res) => {
  try {
    const roomId = req.params.id;
    if (!roomId) {
      return res.status(404).json({
        message: 'Cart not found Room'
      })
    }
    const cart = await CartModel.find({room_id: roomId});
    const response = {
      cart: cart,
      room_id: roomId
    }
    res.json(response)
  } catch (e) {
    res.status(500).json({
      message: 'Cannot get Rooms'
    })
  }
}


export const addToCart = async (req, res, next) => {
  try {
    const room_id = req.body.room_id;
    const doc = new CartModel(req.body)
    await doc.save();
    req.params.id = room_id;
    next();
  } catch (e) {
    res.status(500).json({
      message: 'Cannot create Cart'
    })
  }
}

export const removeFromCart = async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const cartId = req.params.cartId;
    const doc = await CartModel.findByIdAndDelete(cartId, {
      returnDocument: "after",
    })

    if (!doc) {
      return res.status(404).json({
        message: 'Cart Item not found'
      })
    }
    req.params.id = roomId;
    next()

  } catch (e) {
    res.status(500).json({
      message: 'Cannot remove cart item'
    })
  }
}

export const removeAllFromCart = async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const doc = await CartModel.deleteMany({room_id: roomId});

    if (!doc) {
      return res.status(404).json({
        message: 'Room not found'
      })
    }
    req.params.id = roomId;
    next()

  } catch (e) {
    res.status(500).json({
      message: 'Cannot remove cart'
    })
  }
}

export const updateCart = async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const cartId = req.params.cartId;

    const doc = await CartModel.findByIdAndUpdate(cartId,
      {
        amount: req.body.amount
      }, {
        returnDocument: "after",
      })

    if (!doc) {
      return res.status(404).json({
        message: 'Cart Item not found'
      })
    }
    req.params.id = roomId;
    next()


  } catch (e) {
    res.status(500).json({
      message: 'Cannot update Cart'
    })
  }
}