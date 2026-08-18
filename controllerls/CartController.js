import CartModel from './../models/Cart.js'
import {cleanObject} from "../utils/helpers.js";

export const getCart = async (req, res) => {
  try {
    const room_id = req.params.room_id;

    const cart = await CartModel.find({room_id});
    if (!cart) {
        return res.status(404).json({
            message: 'Cart not found in Room'
        })
    }

    const response = {cart, room_id}
    res.json(response)
  } catch (e) {
    res.status(500).json({
      message: 'Cannot get Rooms'
    })
  }
}


export const addToCart = async (req, res, next) => {
  try {
    const {_id, ...newCart} = req.body
    const cleanedCart = cleanObject(newCart);
    const doc = new CartModel(cleanedCart)
    await doc.save();
    req.params.room_id = newCart.room_id;
    next();
  } catch (e) {
    res.status(500).json({
      message: 'Cannot create Cart'
    })
  }
}

export const removeFromCart = async (req, res, next) => {
  try {
    const room_id = req.params.room_id;
    const cart_id = req.params.cart_id;
    const doc = await CartModel.findByIdAndDelete(cart_id, {
      returnDocument: "after",
    })

    if (!doc) {
      return res.status(404).json({
        message: 'Cart Item not found'
      })
    }
    req.params.room_id = room_id;
    next()

  } catch (e) {
    res.status(500).json({
      message: 'Cannot remove cart item'
    })
  }
}

export const removeAllFromCart = async (req, res, next) => {
  try {
    const room_id = req.params.room_id;
    const doc = await CartModel.deleteMany({room_id: room_id});

    if (!doc) {
      return res.status(404).json({
        message: 'Room not found'
      })
    }
    req.params.room_id = room_id;
    next();

  } catch (e) {
    res.status(500).json({
      message: 'Cannot remove cart'
    })
  }
}

export const updateCartAmount = async (req, res, next) => {
  try {
    const room_id = req.params.room_id;
    const cart_id = req.params.cart_id;

    const doc = await CartModel.findByIdAndUpdate(cart_id,
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
    req.params.room_id = room_id;
    next()

  } catch (e) {
    res.status(500).json({
      message: 'Cannot update Cart'
    })
  }
}

export const updateCartItem = async (req, res, next) => {
  try {
    const cart = req.body;
    const cleanedCart = cleanObject(cart);

    const doc = await CartModel.findByIdAndUpdate(cart._id,
      cleanedCart, {
        returnDocument: "after",
      })

    if (!doc) {
      return res.status(404).json({
        message: 'Cart Item not found'
      })
    }

    req.params.room_id = cart.room_id;
    next()
  } catch (e) {
    res.status(500).json({
      message: 'Cannot update Cart'
    })
  }
}