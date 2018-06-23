import express from 'express';
import rideController from '../controllers/rideController';

const router = express.Router();

router.get('/', (req, res) => res.status(200).json({message: 'server works'}));

export default router;
