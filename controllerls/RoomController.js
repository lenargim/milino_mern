import RoomModel from "../models/Room.js";


export const getRooms = async (req, res) => {
  try {
    const rooms = await RoomModel.find({purchase_order_id: req.params.id, is_deleted: false});
    if (!rooms) {
      return res.status(404).json({
        message: 'Rooms not found'
      })
    }
    const frontData = rooms.map(el => {
      const {is_deleted, createdAt, updatedAt, ...front} = el._doc;
      return front
    })
    res.json(frontData)
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

    // Проверяем, есть ли в бд у PO комната с таким именем (без учета регистра и из неудаленных);
    const Room = await RoomModel.findOne({
      purchase_order_id: req.body.purchase_order_id,
      name: { $regex: `^${req.body.name}$`, $options: 'i' },
      is_deleted: false
    }).exec();

    if (Room) {
      res.status(409).json({ message: 'Room name occupied' });
    } else {
      const post = await doc.save()
        .catch(err => {
          console.log(err)
        });
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

export const updateRoom = async (req, res, next) => {
  try {
    await RoomModel.findByIdAndUpdate(req.params.id,
      {...req.body},
      {returnDocument: "after"}
    ).then(roomRes => {
      if (!roomRes) {
        return res.status(404).json({
          message: 'Room not updated'
        })
      }
      req.params.id = req.body.purchase_order_id;
      next()
    });
  } catch (e) {
    res.status(500).json({
      message: 'Cannot update Room'
    })
  }
}
