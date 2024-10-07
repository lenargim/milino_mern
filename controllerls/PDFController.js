import nodemailer from "nodemailer";

export const SendPDF = (req, res) => {
  const type = req.body.buttonType;
  const file = req.file;
  if (!file) res.status(400).json({
    message: "No pdf in form"
  })
  if (type === 'download') return res.status(200).send('PDF Download');
  if (type === 'send') {

    let transporter = nodemailer.createTransport({
      service: env.EMAIL_SERVICE,
      secure: env.EMAIL_SECURE,
      port: env.EMAIL_PORT,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      }
    })
    let mailOptions = {
      from: env.EMAIL_USER,
      to: env.EMAIL_TO,
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
}