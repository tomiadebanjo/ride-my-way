import pool from '../models/dbconfig';

const requestRide = (req, res) => {
  const text = 'INSERT INTO ride_request (request_status, userId, rideId, created_at) VALUES($1, $2, $3, Now()) returning *';
  const requestStatus = 'pending';
  const values = [requestStatus, req.userId, Number(req.params.rideId)];
  pool.query(text, values, (err, response) => {
    if (err) {
      const duplicateKeyError = 'duplicate key value violates unique constraint "ride_request_userid_rideid_key"';
      if (err.message === duplicateKeyError) {
        return res.status(409).json({
          success: false,
          message: 'Error: You can only request for a ride once',
        });
      }
      return res.status(500).json({
        success: false,
        message: 'Ride with that id not found',
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
      });
    }
    return res.status(200).json({
      success: true,
      requests: response.rows,
    });
  });
};

const updateRequest = (req, res) => {
  const text = 'SELECT * FROM ride_request WHERE userId = $1 AND rideId = $2';
  const values = [req.userId, Number(req.params.rideId)];
  console.log(Number(req.params.rideId));
  pool.query(text, values, (err, response) => {
    if (response.rows === undefined || response.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `${err}.. Ride Not found`,
      });
    }
    const textQuery = 'UPDATE ride_request SET request_status = $1 , updated_at = Now() WHERE userId = $2 AND rideId = $3 returning *';
    const queryValues = [req.body.response, req.userId, Number(req.params.rideId)];
    console.log(req.body.response);
    pool.query(textQuery, queryValues, (err, response) => {
      if (response.rows === undefined || response.rows.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request confirm rideId',
        });
      }
      if (err) {
        return res.status(404).json({
          success: false,
          message: 'Please enter one the required responses - [accepted, rejected, pending]',
        });
      }
      return res.status(202).json({
        success: true,
        message: `Ride request status updated, status - ${req.body.response}`,
      });
    });
  });
};

export default {
  requestRide,
  rideRequests,
  updateRequest,
};
