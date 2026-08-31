import express from 'express';
import { getAllAppointments, updateAppointmentStatus, blockDate, unblockDate, getBlockedDates } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/appointments').get(protect, admin, getAllAppointments);
router.route('/appointments/:id/status').patch(protect, admin, updateAppointmentStatus);

router.route('/blocked-dates')
  .post(protect, admin, blockDate)
  .get(getBlockedDates); // Can be public to disable dates on frontend
  
router.route('/blocked-dates/:date').delete(protect, admin, unblockDate);

export default router;
