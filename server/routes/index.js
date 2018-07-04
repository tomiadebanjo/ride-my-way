import express from 'express';
import rideController from '../dummy-server/rideController';
import rideControl from '../controllers/rideControl';
import signUpController from '../controllers/userController';
import reqController from '../controllers/requestController';
import authController from '../middleware/authController';

const router = express.Router();

router.post('/api/v1/auth/signup', signUpController.signUp);

router.post('/api/v1/auth/login', signUpController.login);

router.get('/api/v1/rides', authController.auth, rideControl.getAllRides);

router.get('/api/v1/rides/:rideId', authController.auth, rideControl.singleRide);

router.post('/api/v1/rides/:rideId/requests', authController.auth, reqController.requestRide);

router.post('/api/v1/users/rides', authController.auth, rideControl.newRide);

router.get('/api/v1/users/rides/:rideId/requests', authController.auth, reqController.rideRequests);

router.put('/api/v1/users/rides/:rideId/requests/:requestId', authController.auth, reqController.updateRequest);

// Dummy server routes
router.get('/api/v1/rides', rideController.getAllRides);

router.get('/api/v1/rides/:rideId', rideController.getOneRide);

router.post('/api/v1/rides', rideController.createRideOffer);

router.post('/api/v1/rides/:rideId/requests', rideController.joinRide);

export default router;
