import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import pool from '../models/dbconfig';

dotenv.config();
const secret = process.env.SECRET;

const signUp = (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const text = 'INSERT INTO users (full_name, email, password, created_at) VALUES($1,$2,$3, Now()) RETURNING *';
  const values = [req.body.fullName, req.body.email, hashedPassword];
  pool.query(text, values, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err,
      });
    }
    const token = jwt.sign(
      {
        id: result.rows[0].id,
      },
      secret,
      { expiresIn: 3600 },
    );
    return res.status(201).json({
      message: 'User registration successful',
      result: result.rows[0],
      token,
    });
  });
};

const login = (req, res) => {
  const text = 'SELECT * FROM users WHERE email = $1';
  const values = [req.body.email];
  pool.query(text, values, (err, result) => {
    if (result.rows === undefined || result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `${err} User not found`,
      });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, result.rows[0].password);
    if (!passwordIsValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Password',
        token: null,
      });
    }
    const token = jwt.sign(
      {
        id: result.rows[0].id,
      },
      secret,
      { expiresIn: 3600 },
    );
    const name = result.rows[0].full_name;
    return res.status(200).json({
      success: true,
      message: `Welcome ${name}, Login Successful`,
      token,
    });
  });
};

export default {
  signUp,
  login,
};
