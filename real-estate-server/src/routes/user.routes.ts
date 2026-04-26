import {
  authUserController,
  getUserDetailsController,
  registerUserController,
  refreshTokenController,
  updateEmailController,
  updatePasswordController,
} from '@/controllers/user.controller';
import { authMiddleware } from '@/middleware/auth.middleware';
import { validateRequest } from '@/middleware/validation.middleware';
import {
  CreateUserValidation,
  LoginValidation,
  UpdateEmailValidation,
  UpdatePasswordValidation,
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
authRoutes.patch(
  '/update-email',
  authMiddleware,
  validateRequest(UpdateEmailValidation),
  updateEmailController,
);
authRoutes.patch(
  '/update-password',
  authMiddleware,
  validateRequest(UpdatePasswordValidation),
  updatePasswordController,
);

export default authRoutes;
