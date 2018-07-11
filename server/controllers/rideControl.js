import pool from '../models/dbconfig';

const newRide = (req, res) => {
  const text = `INSERT INTO rides (userId, destination, pickup_location, departure_time, departure_date, created_at) 
  VALUES($1, $2, $3, $4, $5, Now()) returning *`;
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
        message: 'Internal server error',
      });
    }
    return res.status(201).json({
      success: true,
      message: 'Ride created successfully',
      data: result.rows[0],
    });
  });
};

const singleRide = (req, res) => {
  const text = 'SELECT * FROM rides WHERE id = $1';
  const values = [Number(req.params.rideId)];
  pool.query(text, values, (err, result) => {
    if (result.rows === undefined || result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Ride not found!! Enter a valid ride ID',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Ride Found',
      rideDetails: result.rows[0],
    });
  });
};

const getAllRides = (req, res) => {
  const text = 'SELECT * FROM rides';
  pool.query(text, (err, response) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'all available rides retrieved',
      rides: response.rows,
    });
  });
};

export default {
  newRide,
  singleRide,
  getAllRides,
};
