import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const sql = `
DROP TABLE IF EXISTS ride_request;
DROP TABLE IF EXISTS rides;
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS request_status_allowed;
CREATE TABLE users(
    id serial PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
CREATE TABLE rides(
    id serial PRIMARY KEY,
    userId INTEGER REFERENCES users(id),
    destination VARCHAR(255) NOT NULL,
    pickup_location VARCHAR(255) NOT NULL,
    departure_time TIME WITHOUT TIME ZONE NOT NULL,
    departure_date date NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() 
);
CREATE TYPE request_status_allowed AS ENUM (
    'accepted',
    'pending',
    'rejected'
);

CREATE TABLE ride_request (
    id SERIAL PRIMARY KEY,
    request_status request_status_allowed NOT NULL,
    userId INTEGER REFERENCES users(id),
    rideId INTEGER REFERENCES rides(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE(userId,rideId)
);
`;
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.query(sql, (err) => {
  if (err) {
    console.log(err);
    client.end();
  } else {
    client.end();
  }
});
