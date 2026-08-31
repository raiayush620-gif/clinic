import express from 'express';
import { 
  getDashboardStats, 
  getAllAppointments, 
  updateAppointmentStatus,
  blockDate,
  getBlockedDates,
  unblockDate
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/stats', getDashboardStats);
router.get('/appointments', getAllAppointments);
router.put('/appointments/:id', updateAppointmentStatus);
router.post('/blocked-dates', blockDate);
router.get('/blocked-dates', getBlockedDates);
router.delete('/blocked-dates/:id', unblockDate);

export default router;
