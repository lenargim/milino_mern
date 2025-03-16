import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
const env = dotenv.config().parsed;

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (token) {
    try {
      const decoded = jwt.verify(token, env.BACKEND_SECRET_KEY);
      req.userId = decoded._id;
      next();
    } catch (e) {
      console.log(e)
      return res.status(403).json({
        action: 'logout',
        message: 'JWT token error'
      })
    }
  } else {
    return res.status(403).json({
      action: 'logout',
      message: "403 No access"
    })
  }
}