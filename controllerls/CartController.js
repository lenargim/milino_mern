import CartModel from '../models/Cart.js'

export const addToCart = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const doc = new CartModel({
      ...req.body,
      room: roomId,
    })

    await doc.save()
      .catch(err => {
        console.log(err)
      });

    const cart = await CartModel.find({room: roomId});

    res.json(cart);
  } catch (e) {
    res.status(500).json({
      message: 'Cannot create Cart'
    })
  }
}


export const remove = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    await CartModel.findByIdAndDelete(cartId).then(async doc => {
      if (!doc) {
        return res.status(404).json({
          message: 'Product not found'
        })
      }
      return res.status(200).json({
        message: 'ok'
      });
    });

  } catch (e) {
    res.status(500).json({
      message: 'Cannot get room'
    })
  }
}


export const update = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    await CartModel.findByIdAndUpdate(cartId, {
      amount: req.body.amount
    }, {
      returnDocument: "after",
    }).then(doc => {
      if (!doc) {
        return res.status(404).json({
          message: 'Cart Item not found'
        })
      }
      return res.json(doc);
    });

  } catch (e) {
    res.status(500).json({
      message: 'Cannot update Cart'
    })
  }
}