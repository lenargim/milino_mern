import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import {getTransporterObject} from "../utils/helpers.js";
import RoomModel from "../models/Room.js";
import * as mongoose from "mongoose";
import fs from 'fs/promises';

export const SendPDF = async (req, res) => {

    const env = dotenv.config().parsed;
    const client_email = req.body.client_email;
    const client_additional_emails = req.body.additional_emails;
    const client_name = req.body.client_name;
    const client_purchase_order = req.body.client_purchase_order;
    const client_room_name = req.body.client_room_name;
    const pdf = req.files.pdf[0];
    const json = req.files.json[0];
    const additionalFiles = req.files.attachments ?? [];
    if (!client_email) return res.status(400).json({message: "No email"});
    if (!pdf) return res.status(400).json({message: "No PDF uploaded"});
    if (!json) return res.status(400).json({message: "No JSON uploaded"});
    const filesToDelete = [
        pdf,
        json,
        ...additionalFiles,
    ].filter(Boolean);

    try {

        // Setup Nodemailer
        const transporter = nodemailer.createTransport(getTransporterObject());

        // const attachments = [
        //     {
        //         filename: json.filename.replace('.txt', '.json'),
        //         path: json.path,
        //         contentType: json.mimetype,
        //         encoding: "utf-8",
        //     },
        //     {
        //         filename: pdf.filename,
        //         path: pdf.path,
        //         contentType: pdf.mimetype,
        //     }
        // ]

        const attachments = [
            {
                filename: json.originalname,
                path: json.path,
                contentType: json.mimetype,
            },
            {
                filename: pdf.originalname,
                path: pdf.path,
                contentType: pdf.mimetype,
            },
            ...additionalFiles.map(file => ({
                filename: file.originalname,
                path: file.path,
                contentType: file.mimetype,
            })),
        ];

        const mailOptions = {
            from: env.EMAIL_USER,
            to: `${env.EMAIL_TO},${client_email}, ${client_additional_emails}`,
            subject: `Order ${client_purchase_order}. Room ${client_room_name}. From ${client_name}(${client_email})`,
            text: "",
            attachments: attachments
        };
        const info = await transporter.sendMail(mailOptions);
        res.status(201).json({
            message: 'Email sent',
            info,
        });
    } catch (err) {
        console.error('Error sending email:', err);

        res.status(500).json({
            message: 'Error sending email',
            error: err,
        });
    } finally {
        await Promise.all(
            filesToDelete.map(file =>
                fs.unlink(file.path).catch(() => {})
            )
        );
    }
}

export const getPurchaseOrder = async (req, res) => {
    try {
        const orderRooms = await RoomModel.aggregate([
            {
                $match: {
                    purchase_order_id: new mongoose.Types.ObjectId(req.params.id),
                    is_deleted: false
                }
            },
            {
                $lookup: {
                    from: "carts",                // collection name in MongoDB (must match the name exactly)
                    localField: "_id",
                    foreignField: "room_id",
                    as: "carts"
                }
            },
            {
                $match: {
                    "carts.0": {$exists: true}  // ensures at least one cart entry exists
                }
            }
        ]);

        if (!orderRooms) {
            return res.status(404).json({
                message: 'Rooms not found'
            })
        }
        const frontData = orderRooms.map(el => {
            const {is_deleted, updatedAt, ...front} = el;
            return front
        })
        res.status(200).json(frontData)
    } catch (error) {
        res.status(500).json({
            message: 'Cannot get Rooms'
        })
    }
}

export const getPurchaseOrderAmount = async (req, res) => {
    try {
        const orderRooms = await RoomModel.aggregate([
            {
                $match: {
                    purchase_order_id: new mongoose.Types.ObjectId(req.params.id),
                    is_deleted: false
                }
            },
            {
                $lookup: {
                    from: "carts",                // collection name in MongoDB (must match the name exactly)
                    localField: "_id",
                    foreignField: "room_id",
                    as: "carts"
                }
            },
            {
                $match: {
                    "carts.0": {$exists: true}  // ensures at least one cart entry exists
                }
            }
        ]);

        if (!orderRooms) {
            return res.status(404).json({
                message: 'Rooms not found'
            })
        }

        res.status(200).json(orderRooms.length)
    } catch (error) {
        res.status(500).json({
            message: 'Cannot get Rooms'
        })
    }
}