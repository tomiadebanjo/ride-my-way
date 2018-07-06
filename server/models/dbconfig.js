import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

pool.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('DATABASE CONNECTED!');
  }
});

export default pool;
