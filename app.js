import express from 'express'
import multer from 'multer';
import cors from 'cors'
import mongoose from "mongoose";
import path from 'path';
import {fileURLToPath} from 'url';
import {UserController, PDFController, RoomController, CartController} from './controllerls/index.js';
import {registerValidation, loginValidation, roomCreateValidation, cartItemValidation} from './validations.js'
import {checkAuth, handleValidationErrors} from './utils/index.js'
import * as dotenv from 'dotenv';

const env = dotenv.config().parsed;
mongoose.connect(`mongodb+srv://${env.DB_ADMIN}:${env.DB_PASSWORD}@cluster0.fwqst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
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
    app.post('/api/email', CORS, upload.single('file'), PDFController.SendPDF);

    app.post('/api/auth/register', registerValidation, handleValidationErrors, UserController.register)
    app.post('/api/auth/login', loginValidation, handleValidationErrors, UserController.login);
    app.get('/api/users/me', checkAuth, UserController.getMe)
    app.patch('/api/users/me', checkAuth, UserController.patchMe)

    app.post('/api/rooms', checkAuth, roomCreateValidation, handleValidationErrors, RoomController.create)
    app.get('/api/rooms/:id', checkAuth, RoomController.getOne)
    app.get('/api/rooms', checkAuth, RoomController.getAll)
    app.delete('/api/rooms/:id', checkAuth, RoomController.remove)
    app.patch('/api/rooms/:id', checkAuth, roomCreateValidation, handleValidationErrors, RoomController.update)

    app.get('/api/cart/:roomId', checkAuth, CartController.getOne)
    app.post('/api/cart/:roomId', checkAuth, cartItemValidation, handleValidationErrors, CartController.addToCart)
    app.delete('/api/cart/:cartId', checkAuth, CartController.remove)
    app.patch('/api/cart/:cartId', checkAuth, CartController.update)

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
