import mongoose from 'mongoose';
import { env } from './env';

export const DBCONN = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    
  } catch (error) {
    
    process.exit(1);
  }
};
