import mongoose from 'mongoose';
import { env } from './env';

export const DBCONN = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};
