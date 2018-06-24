// import Joi from 'joi';
import db from '../models/ridedb';

const rideOffers = db;

// Get all rides
const getAllRides = (req, res) => {
  res.status(200).json({
    message: 'success',
    Rides: rideOffers,
  });
};

// Get a single ride
const getOneRide = (req, res) => {
  const id = parseInt(req.params.rideId, 10);
  const rideOffer = rideOffers.find(ride => ride.rideId === id);
  if (rideOffer === undefined) {
    return res.status(404).json({
      message: `Ride with id - ${id} not found`,
    });
  }
  return res.status(200).json({
    message: 'Sucess! Ride found',
    rideOffer,
  });
};

const createRideOffer = (req, res) => {
  // new ride Object
  const newRide = {
    id: rideOffers.length + 1,
    driver: req.body.driver,
    destination: req.body.destination,
    pickUpLocation: req.body.pickUpLocation,
    departureTime: req.body.departureTime,
    requests: [],
  };
  // Validate Ride details
  if (
    !newRide.driver
    || !newRide.destination
    || !newRide.pickUpLocation
    || !newRide.departureTime
  ) {
    return res.status(400).send({
      error: 'Error!! check required fields',
    });
  }
  rideOffers.push(newRide);
  return res.status(201).json({
    message: 'New ride created successfully',
    newRide,
  });
};

const joinRide = (req, res) => {
  const id = parseInt(req.params.rideId, 10);
  const rideOffer = rideOffers.find(ride => ride.rideId === id);
  if (rideOffer === undefined) {
    return res.status(404).json({
      message: `Ride with id - ${id} not found`,
    });
  }
  const rideRequest = {
    riderName: req.body.riderName,
    status: 'pending',
  };
  if (!rideRequest.riderName) {
    return res.status(400).json({
      message: 'riderName required',
    });
  }
  const requestedRide = rideOffers[id - 1];
  requestedRide.requests.push(rideRequest);
  return res.status(201).send({
    message: 'Ride has been requested',
    ride: requestedRide,
  });
};

export default {
  getAllRides,
  getOneRide,
  createRideOffer,
  joinRide,
};
