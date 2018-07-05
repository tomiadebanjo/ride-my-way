import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new pg.Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
});

pool.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('DATABASE CONNECTED!');
  }
});

export default pool;
