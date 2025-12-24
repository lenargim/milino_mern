import dotenv from 'dotenv'
import multer from 'multer'
import fs from 'fs'
import path from 'path'

dotenv.config()

/* ---------------------------------
   BASE PATH (apps/prod or apps/test)
---------------------------------- */

const BASE_DIR = process.cwd()

/* ---------------------------------
   MAIL TRANSPORT
---------------------------------- */

export const getTransporterObject = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    }
  }

  return {
    service: process.env.EMAIL_SERVICE,
    secure: process.env.EMAIL_SECURE === 'true',
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  }
}

/* ---------------------------------
   MULTER STORAGE
---------------------------------- */

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const companyName = req.params.company_name

    const folderPath = path.join(
      BASE_DIR,
      'uploads',
      'orders',
      companyName
    )

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
    }

    cb(null, folderPath)
  },

  filename(req, file, cb) {
    let filename = file.originalname

    if (file.fieldname === 'json') {
      filename = filename.replace(/\.json$/i, '.txt')
    }

    cb(null, filename)
  },
})

/* ---------------------------------
   FILE FILTER
---------------------------------- */

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'pdf' && file.mimetype !== 'application/pdf') {
    return cb(new Error('Invalid file type for PDF'), false)
  }

  if (file.fieldname === 'json' && file.mimetype !== 'application/json') {
    return cb(new Error('Invalid file type for JSON'), false)
  }

  cb(null, true)
}

/* ---------------------------------
   EXPORT
---------------------------------- */

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
})
