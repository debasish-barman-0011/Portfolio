require('dotenv').config();
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const connectDB = require('../config/db');

const seed = async () => {
  await connectDB();
  const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (!existing) {
   
    const plainPassword = 'Admin@123'; 
    const hash = await bcrypt.hash(plainPassword, 12);
    await Admin.create({ email: process.env.ADMIN_EMAIL, passwordHash: hash });
    console.log(`Admin created. Email: ${process.env.ADMIN_EMAIL}, Password: ${plainPassword}`);
  } else {
    console.log('Admin already exists');
  }
  process.exit();
};
seed();