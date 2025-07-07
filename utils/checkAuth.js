import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";

const env = dotenv.config().parsed;

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (!token) {
    return res.status(401).json({
      type: 'token',
      message: "No token"
    });
  }

  try {
    const decoded = jwt.verify(token, env.BACKEND_SECRET_KEY);
    req.userId = decoded._id;
    return next();
  } catch (err) {
    return res.status(401).json({
      type: 'token',
      message: 'Wrong token'
    });
  }
};
