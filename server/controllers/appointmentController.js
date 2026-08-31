import Appointment from '../models/Appointment.js';
import BlockedDate from '../models/BlockedDate.js';
import sendEmail from '../utils/sendEmail.js';
import { appointmentRequestTemplate } from '../utils/emailTemplates.js';

export const createAppointment = async (req, res) => {
  const { name, phone, email, consultationType, date, time, message } = req.body;

  try {
    // Check for blocked dates
    const isBlocked = await BlockedDate.findOne({ date });
    if (isBlocked) {
      return res.status(400).json({ message: 'This date is currently unavailable.' });
    }

    // Prevent duplicate bookings
    const existingAppointment = await Appointment.findOne({ date, time, status: { $ne: 'cancelled' } });
    if (existingAppointment) {
      return res.status(400).json({ message: 'This appointment time is no longer available. Please select another time.' });
    }

    const appointment = await Appointment.create({
      user: req.user._id,
      name,
      phone,
      email,
      consultationType,
      date,
      time,
      message
    });

    if (appointment) {
      // Send email notification
      const emailSent = await sendEmail({
        email: appointment.email,
        subject: 'Appointment Request Received',
        html: appointmentRequestTemplate(appointment.name, appointment.date, appointment.time, appointment.consultationType)
      });
      
      if (!emailSent) {
         console.log(`Failed to send appointment request email to ${appointment.email}`);
      }

      res.status(201).json(appointment);
    } else {
      res.status(400).json({ message: 'Invalid appointment data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAvailableSlots = async (req, res) => {
  const { date } = req.query;
  try {
    const isBlocked = await BlockedDate.findOne({ date });
    if (isBlocked) {
      return res.json([]);
    }

    const appointments = await Appointment.find({ date, status: { $ne: 'cancelled' } });
    const bookedSlots = appointments.map(app => app.time);
    
    // Generate all slots from 10:00 AM to 7:30 PM
    const allSlots = [
      "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", 
      "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", 
      "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", 
      "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
      "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM"
    ];
    
    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
