import dotenv from 'dotenv';
import { SignOptions } from 'jsonwebtoken';

dotenv.config();

interface EnvConfig {
  PORT: number;
  NODE_ENV: string;
  MONGO_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: SignOptions['expiresIn'];
}

export const env: EnvConfig = {
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
    MONGO_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/techkraft',
    JWT_SECRET: process.env.JWT_SECRET || 'techkraft-secret',
    NODE_ENV: process.env.NODE_ENV || 'development',
    JWT_EXPIRES_IN: (process.env.JWT_EXPIRES_IN as SignOptions['expiresIn']) || '7d'
}