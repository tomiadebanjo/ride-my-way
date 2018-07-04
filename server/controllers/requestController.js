import pool from '../models/dbconfig';

const requestRide = (req, res) => {
  const text = 'INSERT INTO ride_request (request_status, userId, rideId, created_at) VALUES($1, $2, $3, Now()) returning *';
  const requestStatus = 'pending';
  const values = [
    requestStatus,
    req.userId,
    Number(req.params.rideId),
  ];
  pool.query(text, values, (err, response) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
    return res.status(201).json({
      success: true,
      message: 'Ride has been requested',
      result: response.rows[0],
    });
  });
};

export default {
  requestRide,
};
