import express from 'express';
import { createAppointment, getMyAppointments, getAvailableSlots } from '../controllers/appointmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createAppointment);
router.get('/my', protect, getMyAppointments);
router.get('/slots', getAvailableSlots);

export default router;
