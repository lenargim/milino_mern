import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import nodemailer from "nodemailer";
import {getTransporterObject} from "../utils/helpers.js";

const env = dotenv.config().parsed;

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
        message: "Email already in use"
      })
    }
    const checkUserPhone = await UserModel.findOne({phone: req.body.phone});
    if (checkUserPhone) {
      return res.status(500).json({
        message: "Your phone already in use"
      })
    }

    const doc = new UserModel({
      name: req.body.name,
      company: req.body.company,
      email: req.body.email,
      phone: req.body.phone,
      is_active: false,
      is_active_in_constructor: false,
      constructor_id: req.body.email,
      is_super_user: false,
      passwordHash,
    })

    await doc.save();

    // Different smtp access for DEV/PROD
    let transporter = nodemailer.createTransport(getTransporterObject())
    let mailOptions = {
      from: env.EMAIL_USER,
      to: env.EMAIL_TO,
      subject: "Order Form access request",
      text: `User name: ${req.body.name} Email: ${req.body.email} Company: ${req.body.company} Phone: ${req.body.phone}`,
      html: `<p>User name: ${req.body.name}<br>Email: ${req.body.email}<br>Company: ${req.body.company}<br>Phone: ${req.body.phone}</p>`,
    };

    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        res.status(500).json({
          message: 'User saved but email was not sent'
        });
      } else {
        res.status(201).json({
          message: "User saved"
        })
      }
      return res.end();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Registration failed"
    })
  }
}

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({email: new RegExp('^' + req.body.email + '$', 'i')});
    if (!user) {
      return res.status(401).json({
        action: 'logout',
        message: "Wrong email or password"
      })
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(401).json({
        action: 'logout',
        message: "Incorrect password"
      })
    }

    if (!user._doc.is_active) {
      return res.status(403).json({
        action: 'logout',
        message: "User is not activated"
      })
    }

    const {passwordHash: hash, ...userData} = user._doc;
    const token = jwt.sign({_id: user._id}, env.BACKEND_SECRET_KEY, {expiresIn: '30d'});
    res.status(200).json({...userData, token});
  } catch (err) {
    console.log(err);
    res.status(500).json({
      action: 'logout',
      message: "User not authorized"
    })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        action: 'logout',
        message: "User not found"
      })
    }
    if (!user._doc.is_active) {
      return res.status(403).json({
        action: 'logout',
        message: "User is not activated"
      })
    }

    const {passwordHash: hash, ...userData} = user._doc;
    const token = jwt.sign(
      {
        _id: user._id
      },
      env.BACKEND_SECRET_KEY,
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
      company: req.body.company,
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
      env.BACKEND_SECRET_KEY,
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