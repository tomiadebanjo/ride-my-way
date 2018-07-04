import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({
      auth: false,
      message: 'No token provided',
    });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: 'Failed to authenicate token! Valid token required',
      });
    }
    req.userId = decoded.id;
    next();
  });
};

export default {
  auth,
};
