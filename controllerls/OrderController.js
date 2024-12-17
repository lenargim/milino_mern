import OrderModel from '../models/Order.js'
import RoomModel from "../models/Room.js";


export const placeOrder = async (req, res) => {
  try {
    const roomId = req.params.roomId;

    const doc = new OrderModel({
      ...req.body,
      room: roomId,
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
