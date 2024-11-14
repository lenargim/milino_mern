import RoomModel from "../models/Room.js";
import CartModel from '../models/Cart.js'

export const create = async (req, res) => {
  try {
    const doc = new RoomModel({
      ...req.body,
      user: req.userId,
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
        message: 'Process Order not found'
      })
    }
    res.json(doc)
  } catch (e) {
    res.status(500).json({
      message: 'Cannot get Process Order'
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const userId = req.userId;
    const rooms = await RoomModel.find({user: userId});
    if (!rooms) {
      return res.status(404).json({
        message: 'Rooms not found'
      })
    }

    const data = await Promise.all(
      rooms.map(async (room) => {
        const cart = await CartModel.find({room: room._id});
        return {...room._doc, cart: cart || []}
      })
    )

    res.json(data)
  } catch (e) {
    res.status(500).json({
      message: 'Cannot get rooms'
    })
  }
}

export const remove = async (req, res) => {
  try {
    const roomId = req.params.id;
    await RoomModel.findByIdAndDelete(roomId).then(doc => {
      if (!doc) {
        return res.status(404).json({
          message: 'Process Order not found'
        })
      }
      return res.json(doc);
    });

  } catch (e) {
    res.status(500).json({
      message: 'Cannot get Process Order'
    })
  }
}

export const update = async (req, res) => {
  try {
    const roomId = req.params.id;
    await RoomModel.findByIdAndUpdate(roomId, {
      ...req.body
    }, {
      returnDocument: "after",
    }).then(doc => {
      if (!doc) {
        return res.status(404).json({
          message: 'Process Order not found'
        })
      }
      return res.json(doc);
    });

  } catch (e) {
    res.status(500).json({
      message: 'Cannot update Process Order'
    })
  }
}
