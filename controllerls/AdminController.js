import UserModel from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const doc = await UserModel.find({is_super_user: {$ne: true}})
    if (!doc) {
      return res.status(400).json({
        message: "No users"
      })
    }
    const users = doc.map(user => ({
      _id: user._doc._id,
      email: user._doc.email,
      name: user._doc.name,
      is_active: user._doc.is_active
    }));
    res.status(200).json(users)
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Registration failed"
    })
  }
}

export const toggleUserEnabled = async (req, res) => {
  try {
    const doc = await UserModel.findByIdAndUpdate(req.params.userId, {
      $set: {"is_active": req.body.is_active},
    }, {
      returnDocument: "after"
    })
    if (!doc) {
      return res.status(400).json({
        message: "No user"
      })
    }
    res.status(200).json(doc._doc)
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Toggle user failed"
    })
  }
}
