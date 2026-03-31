import {
  authUserController,
  getUserDetailsController,
  registerUserController,
  refreshTokenController,
} from '@/controllers/user.controller';
import { authMiddleware } from '@/middleware/auth.middleware';
import { validateRequest } from '@/middleware/validation.middleware';
import {
  CreateUserValidation,
  LoginValidation,
} from '@/validation/user.validation';
import { Router } from 'express';

const authRoutes = Router();

authRoutes.post(
  '/register',
  validateRequest(CreateUserValidation),
  registerUserController,
);
authRoutes.post('/login', validateRequest(LoginValidation), authUserController);
authRoutes.post('/refresh-token', refreshTokenController);
authRoutes.get('/user/me', authMiddleware, getUserDetailsController);

export default authRoutes;
