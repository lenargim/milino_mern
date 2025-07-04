import OrderModel from '../models/Order.js'
import RoomModel from "../models/Room.js";


export const placeOrder = async (req, res) => {
  try {
    const roomId = req.params.roomId;

    const room = await RoomModel.findByIdAndUpdate(roomId)
    if (!room) {
      return res.status(404).json({
        message: 'Room not found'
      })
    }
    const user_id = room._doc.user;

    const doc = new OrderModel({
      ...req.body,
      user: user_id,
      room_id: roomId,
      name: room._doc.room_name,
    })

    await doc.save()
      .then(async () => {
        const room = await RoomModel.findByIdAndUpdate(roomId,
          {
            cart: [],
          }, {
            returnDocument: "after",
          })
        if (!room) {
          return res.status(404).json({
            message: 'Cart not updated'
          })
        }
        return res.status(200).json(room.cart);
      })
      .catch(err => {
        console.log(err)
      });
  } catch (e) {
    res.status(500).json({
      message: 'Cannot create order'
    })
  }
}