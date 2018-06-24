import db from '../models/ridedb';

const rideOffers = db;

const getAllRides = (req, res) => {
  res.status(200).json({
    message: 'success',
    Rides: rideOffers,
  });
};

// const getOneRide = (req, res) => {
//   const id = Number(req.parms.rideId);
//   if (!id) {
//     res.status(404).json({
//       message: 'Id is not a number',
//     });
//   }
//   const rideOffer = rideOffers.find(ride => ride.rideId === id);
//   if (rideOffer === undefined) {
//     res.status(404).json({
//       message: 'Ride with id not found',
//     });
//   }
//   res.status(200).json({
//     message: 'Sucess! Ride found',
//     rideOffer,
//   });
// };

export default {
  getAllRides,
  // getOneRide,
};
