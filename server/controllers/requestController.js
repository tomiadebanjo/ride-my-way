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
      const duplicateKeyError = 'duplicate key value violates unique constraint \"ride_request_userid_rideid_key\"';
      if(err.message === duplicateKeyError) {
        return res.status(500).json({
          success: false,
          message: 'Error: You can only request for a ride once',
        });
      }
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

const rideRequests = (req, res) => {
  const text = 'SELECT * FROM ride_request WHERE rideId = $1';
  const values = [Number(req.params.rideId)];
  pool.query(text, values, (err, response) => {
    if (response.rows === undefined || response.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `${err.message} Enter valid Id`,
      })
    };
    return res.status(200).json({
      success: true,
      requests: response.rows,
    })
  })
} 

export default {
  requestRide,
  rideRequests,
};
