const newRide = (req, res, next) => {
  const nonCharTest = /[^a-zA-Z/\s/-]/g;
  const charTest = /[a-zA-Z]/g;
  const timeTest = /^(([0-1]{0,1}[0-9])|(2[0-3])):[0-5]{0,1}[0-9]$/g;
  const dateTest = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

  if (!req.body.destination && !req.body.pickUpLocation && !req.body.departureDate && !req.body.departureTime) {
    return res.status(400).send({
      success: 'false',
      message: 'Check required fields',
    });
  }

  if (
    req.body.destination === ''
    || typeof req.body.destination === 'undefined'
    || req.body.destination === null
  ) {
    return res.status(400).send({
      success: 'false',
      message: 'destination field is required',
    });
  }
  if (!charTest.test(req.body.destination)) {
    return res.status(400).send({
      success: 'false',
      message: 'destination must contain at least one alphabet',
    });
  }
  if (nonCharTest.test(req.body.destination)) {
    return res.status(400).send({
      success: 'false',
      message: 'destination must be alphabetic, the use of spaces and "-" are allowed',
    });
  }
  if (
    req.body.pickUpLocation === ''
    || typeof req.body.pickUpLocation === 'undefined'
    || req.body.pickUpLocation === null
  ) {
    return res.status(400).send({
      success: 'false',
      message: 'pickUpLocation field is required',
    });
  }
  if (!charTest.test(req.body.pickUpLocation)) {
    return res.status(400).send({
      success: 'false',
      message: 'pickUpLocation must contain at least one alphabet',
    });
  }
  if (nonCharTest.test(req.body.pickUpLocation)) {
    return res.status(400).send({
      success: 'false',
      message: 'pickUpLocation must be alphabetic, the use of spaces and "-" are allowed',
    });
  }
  if (
    req.body.departureTime === ''
    || typeof req.body.departureTime === 'undefined'
    || req.body.departureTime === null
  ) {
    return res.status(400).send({
      success: 'false',
      message: 'departureTime field is required',
    });
  }
  if (!timeTest.test(req.body.departureTime)) {
    return res.status(400).send({
      success: 'false',
      message: 'Invalid time format.. enter required format - hh:mm e.g:- 16:40',
    });
  }
  if (
    req.body.departureDate === ''
    || typeof req.body.departureDate === 'undefined'
    || req.body.departureDate === null
  ) {
    return res.status(400).send({
      success: 'false',
      message: 'departureDate field is required',
    });
  }
  if (!dateTest.test(req.body.departureDate)) {
    return res.status(400).send({
      success: 'false',
      message: 'Invalid Date format.. enter required format - dd/mm/yyyy e.g:- 10/05/2018',
    });
  }
  next();
};

const validateRideId = (req, res, next) => {
  const rideId = Number(req.params.rideId);
  if (!Number.isInteger(rideId)) {
    return res.status(400).send({
      success: 'false',
      message: 'Invalid ride id!!',
    });
  }
  next();
};

const validateRequestId = (req, res, next) => {
  const requestId = Number(req.params.requestId);
  if (!Number.isInteger(requestId)) {
    return res.status(400).send({
      success: 'false',
      message: 'Invalid request id!!',
    });
  }
  next();
};

export default {
  newRide,
  validateRideId,
  validateRequestId,
};
