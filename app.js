import express from 'express'
import multer from 'multer';
import cors from 'cors'
import mongoose from "mongoose";
import path from 'path';
import {fileURLToPath} from 'url';
import {
  UserController,
  PDFController,
  RoomController,
  CartController,
  OrderController,
  AdminController
} from './controllerls/index.js';
import {registerValidation, loginValidation, roomCreateValidation, cartItemValidation} from './validations.js'
import {checkAuth, checkAdmin, handleValidationErrors} from './utils/index.js'
import * as dotenv from 'dotenv';

const env = dotenv.config().parsed;

mongoose.connect(`mongodb+srv://${env.DB_ADMIN}:${env.DB_PASSWORD}@${env.DB_DATABASE}`)
  .then(() => console.log('DB is OK'))
  .catch((err) => console.log('DB error', err))
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PORT = env.PORT || 5000;
const corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
const CORS = cors(corsOptions);

app.options('*', cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/PDFs')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const start = async () => {
  try {
    const upload = multer({storage});

    app.post('/api/email', CORS, upload.fields([{name: "pdf"}, {name: "json"}]), PDFController.SendPDF);

    app.post('/api/auth/register', CORS, registerValidation, handleValidationErrors, UserController.register)
    app.post('/api/auth/login', CORS, loginValidation, handleValidationErrors, UserController.login);
    app.get('/api/users/me', checkAuth, CORS, UserController.getMe)
    app.patch('/api/users/me', CORS, checkAuth, UserController.patchMe)
    app.patch('/api/users/constructor', CORS, checkAuth, UserController.constructorSave)

    app.post('/api/rooms', CORS, checkAuth, roomCreateValidation, handleValidationErrors, RoomController.create)
    app.get('/api/rooms/:id', CORS, checkAuth, RoomController.getOne)
    app.get('/api/rooms', CORS, checkAuth, RoomController.getAll)
    app.delete('/api/rooms/:id', CORS, checkAuth, RoomController.remove)
    app.patch('/api/rooms/:id', CORS, checkAuth, roomCreateValidation, handleValidationErrors, RoomController.updateRoom)

    app.post('/api/cart/:roomId', CORS, checkAuth, cartItemValidation, handleValidationErrors, CartController.addToCart)
    app.delete('/api/cart/:roomId/:cartId', CORS, checkAuth, CartController.remove)
    app.patch('/api/cart/:roomId/:cartId', CORS, checkAuth, CartController.update)

    app.post('/api/order/:roomId', CORS, checkAuth, OrderController.placeOrder)


    app.get('/api/admin/users', CORS, checkAuth, checkAdmin, AdminController.getUsers)
    app.patch('/api/admin/user/:userId', CORS, checkAuth, checkAdmin, AdminController.toggleUserEnabled)

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
