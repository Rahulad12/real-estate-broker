import {
  createRealEstateController,
  getRealEstatesController,
  getPropertyByIdController,
  uploadPropertyImagesController,
  incrementPropertyViewsController,
  getTrendingPropertiesController,
} from './real-estate.controller';
import { authMiddleware } from '@/middleware/auth.middleware';
import { authorize } from '@/middleware/role.middleware';
import { validateRequest } from '@/middleware/validation.middleware';
import { uploadImages } from '@/middleware/upload.middleware';
import { createRealEstateSchema } from './real-estate.validation';
import { Router } from 'express';

/**
 * @fileoverview Real Estate Routes
 * @description Express router for property-related endpoints
 * @module realEstateRouter
 * 
 * @routes
 * - POST   /real-estate           → Create property (Admin only)
 * - GET    /real-estate           → List properties with filters (Public)
 * - GET    /real-estate/:id        → Get property by ID (User/Admin)
 * - POST   /real-estate/:id/images → Upload images (Admin only)
 * - POST   /real-estate/:id/view  → Increment views (Public)
 * - GET    /real-estate/trending   → Get trending properties (Public)
 */
const realEstateRouter = Router();

/**
 * POST /real-estate
 * Create a new property (Admin only)
 * Body: CreateRealEstatePayload
 * Auth: Required (Admin role)
 */
realEstateRouter.post(
  '/',
  authMiddleware,
  authorize(['admin']),
  validateRequest(createRealEstateSchema),
  createRealEstateController,
);
/**
 * GET /real-estate
 * Get all properties with filtering and pagination (Public)
 * Query: page, limit, search, propertyType, minPrice, maxPrice
 */
realEstateRouter.get(
  '/',
  // authMiddleware,
  // authorize(['user', 'admin']),
  getRealEstatesController,
);
/**
 * GET /real-estate/:id
 * Get property by ID (User/Admin)
 * Params: id (property ObjectId)
 */
realEstateRouter.get(
  '/:id',
  authMiddleware,
  authorize(['user', 'admin']),
  getPropertyByIdController,
);
/**
 * POST /real-estate/:id/images
 * Upload property images (Admin only)
 * Params: id (property ObjectId)
 * Body: multipart/form-data with 'images' field (max 10 files)
 */
realEstateRouter.post(
  '/:id/images',
  authMiddleware,
  authorize(['admin']),
  uploadImages.array('images', 10),
  uploadPropertyImagesController,
);
/**
 * POST /real-estate/:id/view
 * Increment property view count (Public)
 * Params: id (property ObjectId)
 */
realEstateRouter.post(
  '/:id/view',
  incrementPropertyViewsController,
);
/**
 * GET /real-estate/trending
 * Get trending properties (Public)
 * Query: limit (default: 6)
 */
realEstateRouter.get(
  '/trending',
  getTrendingPropertiesController,
);

export default realEstateRouter;
