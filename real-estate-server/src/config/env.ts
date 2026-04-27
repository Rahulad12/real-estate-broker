import dotenv from 'dotenv';
import { SignOptions } from 'jsonwebtoken';

dotenv.config();

interface EnvConfig {
  PORT: number;
  NODE_ENV: string;
  MONGO_URI: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_EXPIRES_IN: SignOptions['expiresIn'];
  REFRESH_TOKEN_EXPIRES_IN: SignOptions['expiresIn'];
  CLIENT_URL: string;
}

export const env: EnvConfig = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_EXPIRES_IN:
    (process.env.JWT_EXPIRES_IN as SignOptions['expiresIn']) || '15m',
  REFRESH_TOKEN_EXPIRES_IN:
    (process.env.REFRESH_TOKEN_EXPIRES_IN as SignOptions['expiresIn']) || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};
