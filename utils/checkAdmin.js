import UserModel from '../models/User.js';

export default async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }
    if (!user._doc.is_super_user) {
      return res.status(403).json({
        message: "User is not admin"
      })
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot find user"
    })
  }
}