import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";

const env = dotenv.config().parsed;

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (!token) {
    return res.status(403).json({
      message: "403 No access (No token)"
    })
  }
  jwt.verify(token, env.BACKEND_SECRET_KEY, function (err, decoded) {
    if (err) {
      return res.status(401).json({type: 'token'})
    }
    req.userId = decoded._id;
    next();
  });
}