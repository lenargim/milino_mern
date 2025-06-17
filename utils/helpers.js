import * as dotenv from "dotenv";
import multer from "multer";
import {__dirname} from "../app.js";
import fs from 'fs';
import path from 'path';
const env = dotenv.config().parsed;


export const getTransporterObject = () => {
  return env.NODE_ENV === 'production' ?
    {
      host: env.EMAIL_HOST,
      secureConnection: true,
      port: env.EMAIL_PORT,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    } :
    {
      service: env.EMAIL_SERVICE,
      secure: env.EMAIL_SECURE,
      port: env.EMAIL_PORT,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    }
}

export const isCookieSecure = () => {
  return env.NODE_ENV === 'production'
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const company_name = req.params.company_name;
    const folderPath = path.join(__dirname, 'uploads', 'orders', company_name);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    let name = file.originalname;
    if (file.fieldname === 'json') name = name.replace('.json', '.txt');
    cb(null, name);
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'pdf' && file.mimetype !== 'application/pdf') {
      return cb(new Error('Invalid file type for PDF'), false);
    }
    if (file.fieldname === 'json' && file.mimetype !== 'application/json') {
      return cb(new Error('Invalid file type for JSON'), false);
    }
    cb(null, true);
  },
})

export const upload = multer({
  storage,
  limits: { fileSize: 10000000 },
});