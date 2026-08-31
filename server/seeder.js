import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';

dotenv.config();

connectDB();

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@clinic.com' });
    if (adminExists) {
      console.log('Admin already exists!');
      process.exit();
    }

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@clinic.com',
      phone: '0000000000',
      password: 'adminpassword123',
      role: 'admin',
    });

    console.log('Admin created successfully:', admin.email);
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
