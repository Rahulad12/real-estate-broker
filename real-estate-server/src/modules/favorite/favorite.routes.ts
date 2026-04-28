import {
  getFavoritesController,
  getFavoritesCountController,
  toggleFavoriteController,
} from './favorite.controller';
import { authorize } from '@/middleware/role.middleware';
import { authenticate } from '@/middleware/auth.middleware';
import { validateRequest } from '@/middleware/validation.middleware';
import { createFavoriteSchema } from './favorite.validation';
import { Router } from 'express';

const favoriteRouter = Router();

favoriteRouter.post(
  '/',
  authenticate,
  authorize(['user']),
  validateRequest(createFavoriteSchema, 'query'),
  toggleFavoriteController,
);

favoriteRouter.get(
  '/by-user',
  authenticate,
  authorize(['user']),
  getFavoritesController,
);

favoriteRouter.get(
  '/count',
  authenticate,
  authorize(['user']),
  getFavoritesCountController,
);

export default favoriteRouter;
