import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@/modules/user/user.types';
import { AppError } from '@/utils/error.helper';

export const authorize = (roles: UserRole[]) => {
  return (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Response | void => {
    try {
      const user = (req as any).user;
      if (!user) {
        throw AppError.unauthorized('Unauthorized');
      }
      if (!roles.includes(user.role)) {
        throw AppError.forbidden('Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
