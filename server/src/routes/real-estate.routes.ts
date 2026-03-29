import {
  createRealEstateController,
  getRealEstatesController,
} from '@/controllers/real-estate.controller';
import { authMiddleware } from '@/middleware/auth.middleware';
import { authorize } from '@/middleware/role.middleware';
import { validateRequest } from '@/middleware/validation.middleware';
import { createRealEstateSchema } from '@/validation/real-estate.validation';
import { Router } from 'express';

const realEstateRouter = Router();

realEstateRouter.post(
  '/',
  authMiddleware,
  authorize(['admin']),
  validateRequest(createRealEstateSchema),
  createRealEstateController,
);
realEstateRouter.get(
  '/',
  authMiddleware,
  authorize(['user', 'admin']),
  getRealEstatesController,
);
export default realEstateRouter;
