import pool from '../models/dbconfig';

const newRide = (req, res) => {
  const text = 'INSERT INTO rides (userId, destination, pickup_location, departure_time, departure_date, created_at) VALUES($1, $2, $3, $4, $5, Now()) returning *';
  const values = [
    req.userId,
    req.body.destination,
    req.body.pickUpLocation,
    req.body.departureTime,
    req.body.departureDate,
  ];
  pool.query(text, values, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err,
      });
    }
    console.log(result.rows);
    console.log(result.rows[0]);
    return res.status(201).json({
      success: true,
      message: 'Ride created successfully',
      result: result.rows[0],
    });
  });
};

export default {
  newRide,
};
