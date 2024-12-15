import CartModel from '../models/Cart.js'
import OrderModel from '../models/Order.js'


export const placeOrder = async (req, res) => {
  try {
    const roomId = req.params.roomId;

    const doc = new OrderModel({
      ...req.body,
      room: roomId,
    })

    await doc.save()
      .then(async () => {
        await CartModel.deleteMany({room: roomId});
      })
      .catch(err => {
        console.log(err)
      });

    return res.status(200).json({
      message: 'ok'
    });

  } catch (e) {
    res.status(500).json({
      message: 'Cannot create order'
    })
  }
}
