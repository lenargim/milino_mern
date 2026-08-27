import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import {fileURLToPath} from 'url'
import dotenv from 'dotenv'

import {
    UserController,
    PDFController,
    RoomController,
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

import {upload} from './utils/helpers.js'
import {removeAllFromCart} from "./controllerls/CartController.js";
import {geManagerDesigners} from "./controllerls/AdminController.js";

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
    // .connect(
    //   `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@${process.env.DB_DATABASE}`
    // )
    .connect(
        `${process.env.MONGO_URI}`
    )
    .then(() => console.log('DB is OK'))
    .catch(err => console.log('DB error', err))

/* ---------------- APP ---------------- */

const app = express()

app.use(express.urlencoded({extended: true}))
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
                {name: 'pdf', maxCount: 1},
                {name: 'json', maxCount: 1},
                { name: 'attachments', maxCount: 5 },
            ]),
            PDFController.SendPDF
        )

        app.get('/api/email/pdf/:purchase_order_id', checkAuth, PDFController.getPurchaseOrder)
        app.get('/api/email/pdf/amount/:purchase_order_id', checkAuth, PDFController.getPurchaseOrderAmount)

        // Auth
        app.post('/api/auth/register', registerValidation, handleValidationErrors, UserController.register)
        app.post('/api/auth/login', loginValidation, handleValidationErrors, UserController.login)
        app.post('/api/auth/forgot-password', UserController.forgotPassword);
        app.post('/api/auth/reset-password/:token', UserController.resetPassword);
        app.get('/api/auth/get-token-name/:token', UserController.getTokenName);

        // Users
        app.get('/api/users/me', checkAuth, UserController.getMe)
        app.patch('/api/users/me', checkAuth, UserController.patchMe)
        app.patch('/api/users/link', checkAuth, UserController.linkManager, UserController.getMe)
        app.patch('/api/users/unlink', checkAuth, UserController.unlinkManager, UserController.getMe)
        app.get('/api/users/:user_id', checkAuth, UserController.getUser)

        // Purchase Order
        app.get('/api/po/:user_id', checkAuth, PurchaseOrderController.getAllPO)
        app.post('/api/po', checkAuth, POCreateValidation, handleValidationErrors, PurchaseOrderController.create)
        app.patch('/api/po/delete', checkAuth, PurchaseOrderController.remove, PurchaseOrderController.getAllPO)
        app.patch('/api/po/:purchase_order_id', checkAuth, POCreateValidation, handleValidationErrors, PurchaseOrderController.update)

        // Rooms
        app.get('/api/rooms/:purchase_order_id', checkAuth, RoomController.getRooms)
        app.post('/api/rooms', checkAuth, roomCreateValidation, handleValidationErrors, RoomController.create)
        app.patch('/api/rooms/delete', checkAuth, RoomController.remove, CartController.removeAllFromCart, RoomController.getRooms)
        app.patch('/api/rooms/:room_id', checkAuth, roomCreateValidation, handleValidationErrors, RoomController.updateRoom, RoomController.getRooms)

        // Cart
        app.get('/api/cart/:room_id', checkAuth, CartController.getCart)
        app.post('/api/cart', checkAuth, cartItemValidation, handleValidationErrors, CartController.addToCart, CartController.getCart)
        app.delete('/api/cart/all/:room_id', checkAuth, CartController.removeAllFromCart, CartController.getCart)
        app.delete('/api/cart/:room_id/:cart_id', checkAuth, CartController.removeFromCart, CartController.getCart)
        app.patch('/api/cart/:room_id/:cart_id', checkAuth, CartController.updateCartAmount, CartController.getCart)
        app.patch('/api/cart', checkAuth, CartController.updateCartItem, CartController.getCart)

        // Admin
        app.post('/api/admin/users', checkAuth, checkAdmin, AdminController.getUsers)
        app.post('/api/admin/manager_designers', checkAuth, checkAdmin, AdminController.geManagerDesigners)
        app.patch('/api/admin/user/:user_id', checkAuth, checkAdmin, AdminController.toggleUserEnabled)

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
