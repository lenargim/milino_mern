import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const checkUserName = await UserModel.findOne({name: req.body.name});
    if (checkUserName) {
      return res.status(500).json({
        message: "Username occupied"
      })
    }
    const checkUserEmail = await UserModel.findOne({email: req.body.email});
    if (checkUserEmail) {
      return res.status(500).json({
        message: "Email already exist"
      })
    }

    const doc = new UserModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      passwordHash,
    })

    const user = await doc.save();

    const {passwordHash: hash, ...userData} = user._doc;
    const token = jwt.sign(
      {
        _id: user._id
      },
      'secret123',
      {
        expiresIn: '30d'
      }
    )
    res.json({...userData, token});
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Registration failed"
    })
  }
}

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({email: req.body.email});

    if (!user) {
      return res.status(400).json({
        message: "Wrong email or password"
      })
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: "Wrong email or password"
      })
    }

    const {passwordHash: hash, ...userData} = user._doc;
    const token = jwt.sign({_id: user._id}, 'secret123', {expiresIn: '30d'});
    res.json({...userData, token});
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "User not authorized"
    })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }
    const {passwordHash: hash, ...userData} = user._doc;
    const token = jwt.sign(
      {
        _id: user._id
      },
      'secret123',
      {
        expiresIn: '30d'
      }
    )

    res.json({...userData, token});
  } catch (e) {
    res.status(403).json({
      message: 'Cannot auth'
    })
  }
}

export const patchMe = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      passwordHash
    }
    const user = await UserModel.findOneAndUpdate({
      _id: req.body._id
    }, newData, {new: true});

    const {passwordHash: hash, ...userData} = user._doc;

    const token = jwt.sign(
      {
        _id: req.body._id
      },
      'secret123',
      {
        expiresIn: '30d'
      }
    )
    res.json({...userData, token});
  } catch (e) {
    res.status(403).json({
      message: 'Cannot update'
    })
  }
}