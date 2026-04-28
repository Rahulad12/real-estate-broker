import mongoose from 'mongoose';
import UserModel from '../src/modules/user/user.schema';
import bcrypt from 'bcryptjs';
import { env } from '../src/config/env';

const MONGO_URI = env.MONGO_URI;

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    

    const adminEmail = 'admin@example.com';
    const existingAdmin = await UserModel.findOne({ email: adminEmail });

    if (existingAdmin) {
      
      await mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    const adminUser = await UserModel.create({
      email: adminEmail,
      password: hashedPassword,
      userName: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
    });

    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
