import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import {getTransporterObject} from "../utils/helpers.js";
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const folderPath = path.join(__dirname, '../PDFs');
// if (!fs.existsSync(folderPath)) {
//   fs.mkdirSync(folderPath, {recursive: true});
// }

export const SendPDF = (req, res) => {
  try {
    const env = dotenv.config().parsed;
    const client_email = req.body.client_email;
    const client_name = req.body.client_name;
    const client_purchase_order = req.body.client_purchase_order;
    const client_room_name = req.body.client_room_name;
    const pdf = req.files.pdf[0];
    const json = req.files.json[0];
    if (!client_email) return res.status(400).json({message: "No email"});
    if (!pdf) return res.status(400).json({message: "No PDF uploaded"});
    if (!json) return res.status(400).json({message: "No JSON uploaded"});

    // Setup Nodemailer
    const transporter = nodemailer.createTransport(getTransporterObject());

    const attachments = [
      {
        filename: json.filename.replace('.txt', '.json'),
        path: json.path,
        contentType: json.mimetype,
        encoding: "utf-8",
      },
      {
        filename: pdf.filename,
        path: pdf.path,
        contentType: pdf.mimetype,

      }
    ]

    const mailOptions = {
      from: env.EMAIL_USER,
      to: `${env.EMAIL_TO},${client_email}`,
      subject: `Order ${client_purchase_order}. Room ${client_room_name}. From ${client_name}(${client_email})`,
      text: "",
      attachments: attachments
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({message: "Error sending email", error: err});
      }
      res.status(201).json({message: "Email sent", info});
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({message: "Internal server error", error});
  }
}