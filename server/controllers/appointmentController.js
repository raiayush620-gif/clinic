import Appointment from '../models/Appointment.js';
import BlockedDate from '../models/BlockedDate.js';

export const createAppointment = async (req, res) => {
  try {
    const { patientName, patientPhone, date, time } = req.body;

    const existingAppointment = await Appointment.findOne({ date, time, status: { $ne: 'cancelled' } });
    if (existingAppointment) {
      return res.status(400).json({ message: 'Time slot already booked' });
    }

    const isBlocked = await BlockedDate.findOne({ date });
    if (isBlocked) {
      return res.status(400).json({ message: 'Clinic is closed on this date' });
    }

    const appointment = new Appointment({
      patientName,
      patientPhone,
      date,
      time
    });

    const createdAppointment = await appointment.save();
    res.status(201).json(createdAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({}).sort({ date: -1 });
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
