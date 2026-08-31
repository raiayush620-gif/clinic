import Appointment from '../models/Appointment.js';
import BlockedDate from '../models/BlockedDate.js';
import sendEmail from '../utils/sendEmail.js';
import { appointmentStatusTemplate } from '../utils/emailTemplates.js';

// Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({}).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update appointment status
export const updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (appointment) {
      appointment.status = status;
      const updatedAppointment = await appointment.save();
      
      if (status !== 'pending') {
        const emailSent = await sendEmail({
          email: updatedAppointment.email,
          subject: 'Appointment Update',
          html: appointmentStatusTemplate(updatedAppointment.name, updatedAppointment.date, updatedAppointment.time, status)
        });
        if (!emailSent) {
          console.log(`Failed to send appointment status email to ${updatedAppointment.email}`);
        }
      }

      res.json(updatedAppointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Block a date
export const blockDate = async (req, res) => {
  const { date, reason } = req.body;
  try {
    const isBlocked = await BlockedDate.findOne({ date });
    if (isBlocked) {
      return res.status(400).json({ message: 'Date is already blocked' });
    }
    const blocked = await BlockedDate.create({ date, reason });
    res.status(201).json(blocked);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unblock a date
export const unblockDate = async (req, res) => {
  try {
    const blocked = await BlockedDate.findOneAndDelete({ date: req.params.date });
    if (blocked) {
      res.json({ message: 'Date unblocked' });
    } else {
      res.status(404).json({ message: 'Blocked date not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlockedDates = async (req, res) => {
  try {
    const blockedDates = await BlockedDate.find({});
    res.json(blockedDates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
