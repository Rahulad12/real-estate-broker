import {
  authUserController,
  getUserDetailsController,
  registerUserController,
} from '@/controllers/user.controller';
import { authMiddleware } from '@/middleware/auth.middleware';
import { validateRequest } from '@/middleware/validation.middleware';
import {
  CreateUserValidation,
  LoginValidation,
} from '@/validation/user.validation';
import { Router } from 'express';

const userRoutes = Router();

userRoutes.post(
  '/register',
  validateRequest(CreateUserValidation),
  registerUserController,
);
userRoutes.post('/login', validateRequest(LoginValidation), authUserController);
userRoutes.get('/user/me', authMiddleware, getUserDetailsController);

export default userRoutes;
