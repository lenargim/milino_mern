const express = require('express')
const nodemailer = require('nodemailer')
const cors = require("cors");
const app = express();
const multer = require('multer');
require('dotenv').config();
path = require('path');

const PORT = process.env.PORT || 5000;
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
    app.post('/api/email', CORS, upload.single('file'), (req, res) => {
      const type = req.body.buttonType;
      const file = req.file;
      if (!file) res.status(400).json({
        message: "No pdf in form"
      })
      if (type === 'download') return res.status(200).send('PDF Download');
      if (type === 'send') {

        let transporter = nodemailer.createTransport({
          service: process.env.EMAIL_SERVICE,
          secure: process.env.EMAIL_SECURE,
          port: process.env.EMAIL_PORT,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          }
        })
        let mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_TO,
          subject: "Milino New Order",
          text: file.filename,
          attachments: [{
            filename: file.filename,
            path: `${file.destination}/${file.filename}`,
            contentType: file.mimetype
          }],
        };
        transporter.sendMail(mailOptions, (err, i) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: err
            })
          }
          return res.status(201).send('Ok')
        })
      }
    });

    if (process.env.NODE_ENV === 'production') {
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
