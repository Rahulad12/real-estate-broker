import {
  createRealEstateController,
  getRealEstatesController,
  getPropertyByIdController,
  uploadPropertyImagesController,
} from './real-estate.controller';
import { authMiddleware } from '@/middleware/auth.middleware';
import { authorize } from '@/middleware/role.middleware';
import { validateRequest } from '@/middleware/validation.middleware';
import { uploadImages } from '@/middleware/upload.middleware';
import { createRealEstateSchema } from './real-estate.validation';
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
  // authMiddleware,
  // authorize(['user', 'admin']),
  getRealEstatesController,
);
realEstateRouter.get(
  '/:id',
  authMiddleware,
  authorize(['user', 'admin']),
  getPropertyByIdController,
);
realEstateRouter.post(
  '/:id/images',
  authMiddleware,
  authorize(['admin']),
  uploadImages.array('images', 10),
  uploadPropertyImagesController,
);

export default realEstateRouter;
