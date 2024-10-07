import RoomModel from "../models/Room.js";

export const create = async (req, res) => {
  try {
    const doc = new RoomModel({
      ...req.body,
      user: req.userId,
    })

    const post = await doc.save().catch(err => {
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
        message: 'Room not found'
      })
    }
    res.json(doc)
  } catch (e) {
    res.status(500).json({
      message: 'Cannot get room'
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const userId = req.userId;
    const doc = await RoomModel.find({user: userId});
    if (!doc) {
      return res.status(404).json({
        message: 'Rooms not found'
      })
    }
    res.json(doc)
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
          message: 'Room not found'
        })
      }
      return res.json(doc);
    });

  } catch (e) {
    res.status(500).json({
      message: 'Cannot get room'
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
          message: 'Room not found'
        })
      }
      return res.json(doc);
    });

  } catch (e) {
    res.status(500).json({
      message: 'Cannot update room'
    })
  }
}
