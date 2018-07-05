import express from 'express';
import rideController from '../dummy-server/rideController';
import rideControl from '../controllers/rideControl';
import signUpController from '../controllers/userController';
import reqController from '../controllers/requestController';
import authController from '../middleware/authController';
import validateLogin from '../middleware/loginValidation';
import validateSignUp from '../middleware/signUpValidation';
import validation from '../middleware/mainValidation';

const router = express.Router();

router.post('/api/v1/auth/signup', validateSignUp.signUp, signUpController.signUp);

router.post('/api/v1/auth/login', validateLogin.login, signUpController.login);

router.get('/api/v1/rides', authController.auth, rideControl.getAllRides);

router.get('/api/v1/rides/:rideId', authController.auth, validation.validateId, rideControl.singleRide);

router.post(
  '/api/v1/rides/:rideId/requests',
  authController.auth,
  validation.validateId,
  reqController.requestRide,
);

router.post('/api/v1/users/rides', authController.auth, validation.newRide, rideControl.newRide);

router.get(
  '/api/v1/users/rides/:rideId/requests', authController.auth, validation.validateId, reqController.rideRequests,
);

router.put(
  '/api/v1/users/rides/:rideId/requests/:requestId',
  authController.auth,
  validation.validateId,
  reqController.updateRequest,
);

// Dummy server routes
router.get('/api/v1/rides', rideController.getAllRides);

router.get('/api/v1/rides/:rideId', rideController.getOneRide);

router.post('/api/v1/rides', rideController.createRideOffer);

router.post('/api/v1/rides/:rideId/requests', rideController.joinRide);

// Catch all other routes
router.get('*', (req, res) => res.status(400).json({
  message: 'Invalid Route',
}));

router.post('*', (req, res) => res.status(400).json({
  message: 'Invalid Route',
}));

export default router;
