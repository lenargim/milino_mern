import {body} from "express-validator";

export const registerValidation = [
  body('name', 'Name length min 2 symbols').isLength({min: 2}),
  body('email', 'Wrong format').isEmail(),
  body('password', 'Password length min 5 symbols').isLength({min: 5}),
]

export const loginValidation = [
  body('email', 'Wrong format').isEmail(),
  body('password', 'Password length min 5 symbols').isLength({min: 5}),
]

export const roomCreateValidation = [
  body('room_name', 'Room name min 2 symbols').isLength({min: 2})
]