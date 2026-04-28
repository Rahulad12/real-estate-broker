import {
  authUserController,
  getUserDetailsController,
  registerUserController,
  refreshTokenController,
  updateEmailController,
  updatePasswordController,
} from './user.controller';
import { authenticate } from '@/middleware/auth.middleware';
import { validateRequest } from '@/middleware/validation.middleware';
import {
  CreateUserValidation,
  LoginValidation,
  UpdateEmailValidation,
  UpdatePasswordValidation,
} from './user.validation';
import { Router } from 'express';

const authRoutes = Router();

authRoutes.post(
  '/register',
  validateRequest(CreateUserValidation),
  registerUserController,
);
authRoutes.post('/login', validateRequest(LoginValidation), authUserController);
authRoutes.post('/refresh-token', refreshTokenController);
authRoutes.get('/user/me', authenticate, getUserDetailsController);
authRoutes.patch(
  '/update-email',
  authenticate,
  validateRequest(UpdateEmailValidation),
  updateEmailController,
);
authRoutes.patch(
  '/update-password',
  authenticate,
  validateRequest(UpdatePasswordValidation),
  updatePasswordController,
);

export default authRoutes;
