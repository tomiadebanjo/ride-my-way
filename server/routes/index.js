import express from 'express';
import rideController from '../controllers/rideController';
import signUpController from '../controllers/userController';

const router = express.Router();

router.post('/auth/signup', signUpController.signUp);

router.get('/api/v1/rides', rideController.getAllRides);

router.get('/api/v1/rides/:rideId', rideController.getOneRide);

router.post('/api/v1/rides', rideController.createRideOffer);

router.post('/api/v1/rides/:rideId/requests', rideController.joinRide);

export default router;
