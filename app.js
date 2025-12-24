import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

import {
  UserController,
  PDFController,
  RoomController,
  OrderController,
  AdminController,
  PurchaseOrderController,
  CartController
} from './controllerls/index.js'

import {
  registerValidation,
  loginValidation,
  roomCreateValidation,
  cartItemValidation,
  POCreateValidation
} from './validations.js'

import {
  checkAuth,
  checkAdmin,
  handleValidationErrors
} from './utils/index.js'

import { upload } from './utils/helpers.js'

/* ---------------- INIT ---------------- */

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 5000

console.log('PID', process.pid)
console.log('PORT', PORT)
console.log('NODE_ENV', process.env.NODE_ENV)
console.log('__dirname', __dirname)

/* ---------------- DB ---------------- */

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@${process.env.DB_DATABASE}`
  )
  .then(() => console.log('DB is OK'))
  .catch(err => console.log('DB error', err))

/* ---------------- APP ---------------- */

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors({
  origin: true,
  credentials: true
}))

/* ---------------- API ---------------- */

const start = async () => {
  try {
    // Email / PDF
    app.post(
      '/api/email/:company_name',
      checkAuth,
      upload.fields([
        { name: 'pdf', maxCount: 1 },
        { name: 'json', maxCount: 1 }
      ]),
      PDFController.SendPDF
    )

    app.get('/api/email/pdf/:id', checkAuth, PDFController.getPurchaseOrder)
    app.get('/api/email/pdf/amount/:id', checkAuth, PDFController.getPurchaseOrderAmount)

    // Auth
    app.post('/api/auth/register', registerValidation, handleValidationErrors, UserController.register)
    app.post('/api/auth/login', loginValidation, handleValidationErrors, UserController.login)
    app.get('/api/users/me', checkAuth, UserController.getMe)
    app.patch('/api/users/me', checkAuth, UserController.patchMe)

    // Purchase Order
    app.get('/api/po/:userId', checkAuth, PurchaseOrderController.getAllPO)
    app.post('/api/po', checkAuth, POCreateValidation, handleValidationErrors, PurchaseOrderController.create)
    app.patch('/api/po/delete', checkAuth, PurchaseOrderController.remove, PurchaseOrderController.getAllPO)
    app.patch('/api/po/:id', checkAuth, POCreateValidation, handleValidationErrors, PurchaseOrderController.update)

    // Rooms
    app.get('/api/rooms/:id', checkAuth, RoomController.getRooms)
    app.post('/api/rooms', checkAuth, roomCreateValidation, handleValidationErrors, RoomController.create)
    app.patch('/api/rooms/delete', checkAuth, RoomController.remove, RoomController.getRooms)
    app.patch('/api/rooms/:id', checkAuth, roomCreateValidation, handleValidationErrors, RoomController.updateRoom, RoomController.getRooms)

    // Cart
    app.get('/api/cart/:id', checkAuth, CartController.getCart)
    app.post('/api/cart', checkAuth, cartItemValidation, handleValidationErrors, CartController.addToCart, CartController.getCart)
    app.delete('/api/cart/all/:roomId', checkAuth, CartController.removeAllFromCart, CartController.getCart)
    app.delete('/api/cart/:roomId/:cartId', checkAuth, CartController.removeFromCart, CartController.getCart)
    app.patch('/api/cart/:roomId/:cartId', checkAuth, CartController.updateCartAmount, CartController.getCart)
    app.patch('/api/cart', checkAuth, CartController.updateCartItem, CartController.getCart)

    app.post('/api/order/:roomId', checkAuth, OrderController.placeOrder)

    // Admin
    app.post('/api/admin/users', checkAuth, checkAdmin, AdminController.getUsers)
    app.patch('/api/admin/user/:userId', checkAuth, checkAdmin, AdminController.toggleUserEnabled)

    /* -------- React prod / test -------- */

    if (process.env.NODE_ENV !== 'development') {
      const clientBuildPath = path.join(__dirname, 'client', 'build')

      console.log('Serving React from:', clientBuildPath)

      app.use(express.static(clientBuildPath))

      app.get('*', (_, res) => {
        res.sendFile(path.join(clientBuildPath, 'index.html'))
      })
    }

  } catch (e) {
    console.error('START FAILED', e)
  }
}

start()

/* ---------------- LISTEN ---------------- */

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on port ${PORT}`)
}).on('error', err => {
  console.error('LISTEN ERROR:', err)
  process.exit(1)
})
