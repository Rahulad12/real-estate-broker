import {
  getFavoritesController,
  getFavoritesCountController,
  toggleFavoriteController,
} from '@/controllers/favorite.controller';
import { authorize } from '@/middleware/role.middleware';
import { authMiddleware } from '@/middleware/auth.middleware';
import { validateRequest } from '@/middleware/validation.middleware';
import { createFavoriteSchema } from '@/validation/favorite.validation';
import { Router } from 'express';

const favoriteRouter = Router();

favoriteRouter.post(
  '/',
  authMiddleware,
  authorize(['user']),
  validateRequest(createFavoriteSchema, 'query'),
  toggleFavoriteController,
);

favoriteRouter.get(
  '/by-user',
  authMiddleware,
  authorize(['user']),
  getFavoritesController,
);

favoriteRouter.get(
  '/count',
  authMiddleware,
  authorize(['user']),
  getFavoritesCountController,
);

export default favoriteRouter;
