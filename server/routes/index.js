import express from 'express';
import rideController from '../controllers/rideController';

const router = express.Router();

router.get('/api/v1/rides', rideController.getAllRides);

// router.get('/api/v1/rides/:rideId', rideController.getOneRide);

// router.get('/api/v1/rides/:rideId/requests', rideController.getOfferRequests);

// router.post('/api/v1/rides', rideController.createRideOffer);

// router.post('/api/v1/rides/:rideId/requests', rideController.joinRide);

export default router;
