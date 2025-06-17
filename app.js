import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";
import path from 'path';
import {fileURLToPath} from 'url';
import cookieParser from 'cookie-parser';
import {
  UserController,
  PDFController,
  RoomController,
  OrderController,
  AdminController,
  PurchaseOrderController,
  CartController
} from './controllerls/index.js';
import {
  registerValidation,
  loginValidation,
  roomCreateValidation,
  cartItemValidation,
  POCreateValidation
} from './validations.js'
import {checkAuth, checkAdmin, handleValidationErrors} from './utils/index.js'
import * as dotenv from 'dotenv';
import {upload} from "./utils/helpers.js";

const env = dotenv.config().parsed;
mongoose.connect(`mongodb+srv://${env.DB_ADMIN}:${env.DB_PASSWORD}@${env.DB_DATABASE}`)
  .then(() => console.log('DB is OK'))
  .catch((err) => console.log('DB error', err))
const app = express();
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);


const PORT = env.PORT || 5000;
const corsOptions = {
  origin: 'http://localhost:3000', // <-- React app origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

// app.options('*', cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname));
app.use(cookieParser());

const CORS = cors(corsOptions);
app.use(CORS);


const start = async () => {
  try {
    // Mail
    app.post('/api/email/:company_name', checkAuth, upload.fields([
      {name: 'pdf', maxCount: 1},
      {name: 'json', maxCount: 1}
    ]), PDFController.SendPDF);
    app.get('/api/email/pdf/:id', checkAuth, PDFController.getPurchaseOrder)
    app.get('/api/email/pdf/amount/:id', checkAuth, PDFController.getPurchaseOrderAmount)

    // Auth
    app.post('/api/auth/register', registerValidation, handleValidationErrors, UserController.register)
    app.post('/api/auth/login', loginValidation, handleValidationErrors, UserController.login);
    app.get('/api/users/me', checkAuth, UserController.getMe)
    app.patch('/api/users/me', checkAuth, UserController.patchMe)
    app.post('/api/users/refresh', UserController.refresh)

    // Purchase Order
    app.get('/api/po/:userId', checkAuth, PurchaseOrderController.getAllPO)
    app.post('/api/po', checkAuth, POCreateValidation, handleValidationErrors, PurchaseOrderController.create)
    app.patch('/api/po/delete', checkAuth, PurchaseOrderController.remove, PurchaseOrderController.getAllPO)
    app.patch('/api/po/:id', checkAuth, POCreateValidation, handleValidationErrors, PurchaseOrderController.update)

    // Room
    app.get('/api/rooms/:id', checkAuth, RoomController.getRooms)
    app.post('/api/rooms', checkAuth, roomCreateValidation, handleValidationErrors, RoomController.create)
    app.patch('/api/rooms/delete', checkAuth, RoomController.remove, RoomController.getRooms)
    app.patch('/api/rooms/:id', checkAuth, roomCreateValidation, handleValidationErrors, RoomController.updateRoom, RoomController.getRooms)

    // Cart
    app.get('/api/cart/:id', checkAuth, CartController.getCart)
    app.post('/api/cart', checkAuth, cartItemValidation, handleValidationErrors, CartController.addToCart, CartController.getCart)
    app.delete('/api/cart/all/:roomId', checkAuth, CartController.removeAllFromCart, CartController.getCart)
    app.delete('/api/cart/:roomId/:cartId', checkAuth, CartController.removeFromCart, CartController.getCart)
    app.patch('/api/cart/:roomId/:cartId', checkAuth, CartController.updateCart, CartController.getCart)

    app.post('/api/order/:roomId', checkAuth, OrderController.placeOrder)

    app.post('/api/admin/users', checkAuth, checkAdmin, AdminController.getUsers)
    app.patch('/api/admin/user/:userId', checkAuth, checkAdmin, AdminController.toggleUserEnabled)

    if (env.NODE_ENV === 'production') {
      app.use('/', express.static(path.join(__dirname, 'client', 'build')));

      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
      })
    }
  } catch (e) {
    console.log(e)
  }
}

start()

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
})
