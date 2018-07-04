import express from 'express';
import rideController from '../dummy-server/rideController';
import rideControl from '../controllers/rideControl';
import signUpController from '../controllers/userController';
import authController from '../middleware/authController';

const router = express.Router();

router.post('/auth/signup', signUpController.signUp);

router.post('/auth/login', signUpController.login);

router.get('/rides', authController.auth, rideControl.getAllRides);

router.get('/rides/:rideId', authController.auth, rideControl.singleRide);

router.post('/users/rides', authController.auth, rideControl.newRide);

router.get('/api/v1/rides', rideController.getAllRides);

router.get('/api/v1/rides/:rideId', rideController.getOneRide);

router.post('/api/v1/rides', rideController.createRideOffer);

router.post('/api/v1/rides/:rideId/requests', rideController.joinRide);

export default router;
