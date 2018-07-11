import pool from '../models/dbconfig';

const requestRide = (req, res) => {
  const textQuery = 'SELECT * FROM rides WHERE id = $1';
  const queryValues = [Number(req.params.rideId)];
  pool.query(textQuery, queryValues, (err, result) => {
    if (result.rows === undefined || result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Ride with that id not found',
      });
    }
    if (Number(req.userId) === Number(result.rows[0].userid)) {
      return res.status(409).json({
        success: false,
        message: 'you can not make a request to join a ride you created',
      });
    }
    const text = 'INSERT INTO ride_request (request_status, userid, rideid, created_at) VALUES($1, $2, $3, Now()) returning *';
    const requestStatus = 'pending';
    const values = [requestStatus, req.userId, Number(req.params.rideId)];
    pool.query(text, values, (err1, response) => {
      if (err1) {
        const duplicateKeyError = 'ride_request_userid_rideid_key"';
        if (err1.message.search(duplicateKeyError) !== -1) {
          return res.status(409).json({
            success: false,
            message: 'Error: You can only request for a ride once',
          });
        }
        return res.status(404).json({
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
  });
};

const rideRequests = (req, res) => {
  const text = `SELECT ride_request.id AS requestId, request_status,
  rides.userid AS driver_id,ride_request.userid AS rider_ID, full_name,rideid, 
  ride_request.created_at, ride_request.updated_at
  FROM ride_request 
  INNER JOIN users ON ride_request.userid = users.id
  INNER JOIN rides ON ride_request.rideid = rides.id
  WHERE rideId = $1`;
  const values = [Number(req.params.rideId)];
  pool.query(text, values, (err, response) => {
    if (response.rows === undefined || response.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No requests found for ride id - ${req.params.rideId}`,
      });
    }
    if (Number(req.userId) !== Number(response.rows[0].driver_id)) {
      return res.status(400).json({
        success: false,
        message: 'you can only get ride requests for rides you created',
      });
    }
    return res.status(200).json({
      success: true,
      requests: response.rows,
    });
  });
};

const updateRequest = (req, res) => {
  const text = `SELECT ride_request.id AS request_id, ride_request.rideid AS request_rideid, 
  rides.id AS rideid, rides.userid AS ride_userid 
  FROM ride_request 
  INNER JOIN rides ON ride_request.rideid = rides.id
  WHERE rideid = $1 AND ride_request.id = $2`;
  const values = [Number(req.params.rideId), Number(req.params.requestId)];
  pool.query(text, values, (err, response) => {
    if (err || response.rows === undefined || response.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Ride Request Not found!!',
      });
    }
    if (response.rows[0].ride_userid !== Number(req.userId)) {
      return res.status(400).json({
        success: false,
        message: 'You can only respond to requests of rides you created',
      });
    }
    const textQuery = 'UPDATE ride_request SET request_status = $1 , updated_at = Now() WHERE id = $2 AND rideid = $3 returning *';
    const queryValues = [
      req.body.response,
      Number(req.params.requestId),
      Number(req.params.rideId),
    ];
    pool.query(textQuery, queryValues, (err1, result) => {
      if (err1) {
        const wrongResponse = 'request_status_allowed';
        if (err1.message.search(wrongResponse) !== -1) {
          return res.status(400).json({
            success: false,
            message: 'Please enter one the required responses - [accepted, rejected, pending]',
          });
        }
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
