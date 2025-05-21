import RoomModel from "../models/Room.js";

export const create = async (req, res) => {
  try {
    const doc = new RoomModel({
      ...req.body,
      user: req.userId,
      cart: []
    })

    const post = await doc.save()
      .catch(err => {
        console.log(err)
      });

    res.json(post);
  } catch (e) {
    res.status(500).json({
      message: 'Cannot create room'
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const roomId = req.params.id;
    const doc = await RoomModel.findOne({_id: roomId});
    if (!doc) {
      return res.status(404).json({
        message: 'purchase order not found'
      })
    }
    res.json(doc)
  } catch (e) {
    res.status(500).json({
      message: 'Cannot get purchase order'
    })
  }
}

export const remove = async (req, res) => {
  try {
    const roomId = req.params.id;
    RoomModel.findByIdAndDelete(roomId).then((roomRes) => {
      if (!roomRes) {
        return res.status(404).json({
          message: 'purchase order not found'
        })
      }
      return res.json(roomRes);
    });
  } catch (e) {
    res.status(500).json({
      message: 'Cannot get purchase order'
    })
  }
}

export const updateRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    await RoomModel.findByIdAndUpdate(roomId, {
      ...req.body
    }, {
      returnDocument: "after",
    }).then(doc => {
      if (!doc) {
        return res.status(404).json({
          message: 'purchase order not found'
        })
      }
      return res.json(doc);
    });

  } catch (e) {
    res.status(500).json({
      message: 'Cannot update purchase order'
    })
  }
}


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
        message: 'purchase order not found'
      })
    }


    res.json(doc.cart);
  } catch (e) {
    res.status(500).json({
      message: 'Cannot create Cart'
    })
  }
}

export const removeFromCart = async (req, res) => {
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

export const updateCart = async (req, res) => {
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