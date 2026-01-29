import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import nodemailer from "nodemailer";
import {getTransporterObject} from "../utils/helpers.js";
import * as crypto from "crypto";

const env = dotenv.config().parsed;

function generateTokens(userId) {
  const accessToken = jwt.sign({_id: userId}, env.BACKEND_SECRET_KEY, {expiresIn: env.BACKEND_SECRET_KEY_EXPIRES});
  return accessToken;
}

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

    const doc = new UserModel({
      name: req.body.name,
      company: req.body.company,
      email: req.body.email,
      phone: req.body.phone,
      website: req.body.website,
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
        message: "Wrong email or password"
      })
    }
    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(401).json({
        message: "Incorrect password"
      })
    }

    if (!user._doc.is_active) {
      return res.status(403).json({
        message: "User is not activated"
      })
    }

    const {passwordHash: hash, ...userData} = user._doc;
    const accessToken = generateTokens(user._id);

    res.status(200)
      // .cookie('refreshToken', refreshToken, {
      //   httpOnly: true,
      //   // sameSite: 'Strict',
      //   secure: isCookieSecure(), // set true in production with HTTPS
      //   maxAge: getCookieDays() * 24 * 60 * 60 * 1000
      // })
      .json({...userData, token: accessToken});
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
    if (!user._doc.is_active) {
      return res.status(403).json({
        message: "User is not activated"
      })
    }

    const {passwordHash: hash, ...userData} = user._doc;
    res.json(userData);
  } catch (e) {
    res.status(401).json({
      message: 'Cannot auth'
    })
  }
}

export const patchMe = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await UserModel.findByIdAndUpdate(req.userId, {
      name: req.body.name,
      company: req.body.company,
      additional_emails: req.body.additional_emails.filter(el => el),
      phone: req.body.phone,
      website: req.body.website,
      passwordHash
    }, {
      new: true
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    const {passwordHash: hash, ...userData} = user._doc;
    res.json(userData);
  } catch (e) {
    res.status(403).json({
      message: 'Cannot update'
    })
  }
}

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // generate token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // hash token
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000); // 15 min

  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;


  // TODO: send email
  console.log('RESET LINK:', resetUrl);

  res.json({ message: `Reset link sent` });
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await UserModel.findOne({
    resetPasswordToken: hashedToken
  });

  if (!user) {
    return res.status(400).json({ message: 'Invalid token' });
  }

  if (!user.resetPasswordExpire || user.resetPasswordExpire < new Date()) {
    return res.status(400).json({ message: 'Token expired' });
  }

  if (!user.resetPasswordToken) {
    return res.status(400).json({ message: 'Token already used' });
  }

  user.password = await bcrypt.hash(password, 10);

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.json({ message: 'Password successfully updated' });
};
