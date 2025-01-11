import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

export const SendPDF = (req, res) => {
  const env = dotenv.config().parsed;

  const type = req.body.buttonType;
  const pdf = req.files.pdf[0];
  const json = req.files.json[0];

  if (!pdf) res.status(400).json({
    message: "No pdf in form"
  })
  if (!json) res.status(400).json({
    message: "No json in form"
  })

  if (type === 'download') {
    return res.status(200).json({
      type,
      msg: 'PDF Download'
    });
  } else if (type === 'send') {
    let transporter = nodemailer.createTransport({
      service: env.EMAIL_SERVICE,
      secure: env.EMAIL_SECURE,
      port: env.EMAIL_PORT,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    })
    let mailOptions = {
      from: env.EMAIL_USER,
      to: env.EMAIL_TO,
      subject: "Milino New Order",
      text: '',
      attachments: [
        {
          filename: pdf.filename,
          path: `${pdf.destination}/${pdf.filename}`,
          contentType: pdf.mimetype
        },
        {
          filename: json.filename,
          path: `${json.destination}/${json.filename}`,
          contentType: json.mimetype
        },
      ],
    };

    transporter.sendMail(mailOptions).then((trans) => {
      res.status(201);
      res.json({...trans, type});
      res.end();
    }).catch((error) => {
      res.status(500);
      res.json(error);
      res.end();
    });
  }
}