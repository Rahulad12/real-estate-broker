import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { env } from '@/config/env';
import logger from '@/utils/logger';
import { AppError } from '@/utils/error.helper';
import { JwtPayload } from '@/types/express';

export interface AuthRequest extends Request {
  user?: JwtPayload;
}
export const authenticate = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      logger.warn('No token provided');
      throw AppError.unauthorized('Unauthorized');
    }
    const decoded = verify(token, env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    logger.info('User authenticated', { userId: decoded.id });
    next();
  } catch (error) {
    logger.error('Invalid token', error);
    throw AppError.unauthorized('Unauthorized');
  }
};
