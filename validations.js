import {body} from "express-validator";

export const registerValidation = [
  body('name', 'Name length should has minimum 2 symbols').isLength({min: 2}),
  body('email', 'Wrong format').isEmail(),
  body('password', 'Password length should has minimum 5 symbols').isLength({min: 5}),
]

export const loginValidation = [
  body('email', 'Wrong format').isEmail(),
  body('password', 'Password length should has minimum 5 symbols').isLength({min: 5}),
]

export const roomCreateValidation = [
  body('name', 'Room name should has minimum 2 symbols').isLength({min: 2})
]

export const POCreateValidation = [
  body('name', 'Purchase order name should has minimum 2 symbols').isLength({min: 2})
]


export const cartItemValidation = [
  body('product_type')
    .isIn(["cabinet", "standard","custom"])
    .withMessage("value is invalid"),
  body('hinge')
    .isIn(['Left', 'Right', 'Double Doors', 'Two left doors', 'Two right doors', 'Single left door', 'Single right door', 'Four doors', ''])
    .withMessage("value is invalid"),
  body('corner')
    .isIn(['Left', 'Right', ''])
    .withMessage("value is invalid"),
  body('options').isArray({max: 4})
    .isIn(["PTO for drawers","PTO for doors", "PTO for Trash Bins", "Box from finish material", "Glass Door", "Glass Shelf", "Farm Sink", "False Front on top"])
    .withMessage("value is invalid"),
]
