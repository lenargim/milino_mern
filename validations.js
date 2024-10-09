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


export const cartItemValidation = [
  body('product_type')
    .isIn(["cabinet"])
    .withMessage("value is invalid"),
  body('hinge')
    .isIn(['Left', 'Right', 'Double Door', 'Single Door'])
    .withMessage("value is invalid"),
  body('corner')
    .isIn(['Left', 'Right', ''])
    .withMessage("value is invalid"),
  body('options').isArray({max: 4})
    .isIn(["PTO for doors", "Box from finish material", "Glass Door", "Glass Shelf"])
    .withMessage("value is invalid"),
]