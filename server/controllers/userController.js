import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import pool from '../models/dbconfig';

dotenv.config();
const secret = process.env.SECRET;

const signUp = (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const text = 'INSERT INTO users (full_name, email, password, created_at) VALUES($1,$2,$3, Now()) RETURNING *';
  const values = [req.body.fullName,
    req.body.email,
    hashedPassword,
  ];
  pool.query(text, values, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err,
      });
    }
    const token = jwt.sign({
      id: result.rows.id,
    }, secret, { expiresIn: 3600 });
    return res.status(201).json({
      message: 'User registration successful',
      result: result.rows[0],
      token,
    });
  });
};

export default {
  signUp,
};
