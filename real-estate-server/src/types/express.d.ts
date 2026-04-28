import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: JwtPayload;
  }
}

export interface JwtPayload {
  id: string;
  email: string;
  role: 'user' | 'broker' | 'admin';
}
