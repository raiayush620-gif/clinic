import Appointment from '../models/Appointment.js';
import BlockedDate from '../models/BlockedDate.js';

export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalAppointments = await Appointment.countDocuments();
    const todaysAppointments = await Appointment.countDocuments({
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) }
    });
    const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });
    
    // We don't track users anymore, return 0
    res.json({
      totalAppointments,
      todaysAppointments,
      pendingAppointments,
      totalUsers: 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({}).sort({ date: -1, time: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      appointment.status = status;
      const updatedAppointment = await appointment.save();
      res.json(updatedAppointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const blockDate = async (req, res) => {
  try {
    const { date, reason } = req.body;
    const blockedDate = new BlockedDate({ date, reason });
    await blockedDate.save();
    res.status(201).json(blockedDate);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getBlockedDates = async (req, res) => {
  try {
    const blockedDates = await BlockedDate.find({}).sort({ date: 1 });
    res.json(blockedDates);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const unblockDate = async (req, res) => {
  try {
    const blockedDate = await BlockedDate.findByIdAndDelete(req.params.id);
    if (!blockedDate) {
      return res.status(404).json({ message: 'Blocked date not found' });
    }
    res.json({ message: 'Date unblocked' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
