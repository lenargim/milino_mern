import RoomModel from "../models/Room.js";


export const getRooms = async (req, res) => {
  try {
    const rooms = await RoomModel.find({purchase_order_id: req.params.id, is_deleted: false});
    if (!rooms) {
      return res.status(404).json({
        message: 'Rooms not found'
      })
    }
    res.json(rooms)
  } catch (e) {
    res.status(500).json({
      message: 'Cannot get Rooms'
    })
  }
}

export const create = async (req, res) => {
  try {

    const doc = new RoomModel({
      ...req.body,
      is_deleted: false
    })

    // Проверяем, есть ли в бд PO с таким именем (без учета регистра и из неудаленных);
    const Room = await RoomModel.findOne({
      name: { $regex: `^${req.body.name}$`, $options: 'i' },
      is_deleted: false
    }).exec();

    if (Room) {
      console.log('1')
      res.status(409).json({ message: 'Room name occupied' });
    } else {
      console.log('2')
      const post = await doc.save()
        .catch(err => {
          console.log(err)
        });
      console.log('3')
      res.status(201).json(post);
    }
  } catch (e) {
    res.status(500).json({
      message: 'Cannot create room'
    })
  }
}

export const remove = async (req, res, next) => {
  try {
    RoomModel.findByIdAndUpdate(req.body.room_id,
      {is_deleted: true},
      {returnDocument: "after"},
    ).then((roomRes) => {
      if (!roomRes) {
        return res.status(404).json({
          message: 'Room not found'
        })
      }
      req.params.id = req.body.purchase_order_id;
      next();
    });
  } catch (e) {
    res.status(500).json({
      message: 'Cannot get Room'
    })
  }
}

export const updateRoom = async (req, res) => {
  try {
    await RoomModel.findByIdAndUpdate(req.params.id,
      {...req.body},
      {returnDocument: "after"}
    ).then(doc => {
      if (!doc) {
        return res.status(404).json({
          message: 'Room not found'
        })
      }
      return res.json(doc);
    });
  } catch (e) {
    res.status(500).json({
      message: 'Cannot update Room'
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
        message: 'Room not found'
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