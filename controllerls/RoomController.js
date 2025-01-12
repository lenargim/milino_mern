import RoomModel from "../models/Room.js";
import CartModel from '../models/Cart.js'

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

export const getAll = async (req, res) => {
  try {
    const userId = req.userId;
    const rooms = await RoomModel.find({user: userId});
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
