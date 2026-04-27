import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth.middleware';
import { authorize } from '@/middleware/role.middleware';
import {
  getAdminStatsController,
  getAllUsersController,
  deleteUserController,
  adminDeletePropertyController,
} from './admin.controller';

/**
 * @fileoverview Admin Routes
 * @description Express router for admin panel endpoints
 * @module adminRouter
 * 
 * @routes
 * - GET  /stats           → Get admin dashboard statistics (Admin only)
 * - GET  /users          → Get all users with pagination (Admin only)
 * - DELETE /users/:id     → Delete a user (Admin only)
 * - DELETE /properties/:id → Delete any property (Admin only)
 */
const adminRouter = Router();

/**
 * GET /admin/stats
 * Get admin dashboard statistics (Admin only)
 */
adminRouter.get(
  '/stats',
  authMiddleware,
  authorize(['admin']),
  getAdminStatsController,
);

/**
 * GET /admin/users
 * Get all users with pagination (Admin only)
 * Query: page (default:1), limit (default:10)
 */
adminRouter.get(
  '/users',
  authMiddleware,
  authorize(['admin']),
  getAllUsersController,
);

/**
 * DELETE /admin/users/:id
 * Delete a user (Admin only)
 * Params: id (user ObjectId)
 */
adminRouter.delete(
  '/users/:id',
  authMiddleware,
  authorize(['admin']),
  deleteUserController,
);

/**
 * DELETE /admin/properties/:id
 * Delete any property (Admin only)
 * Params: id (property ObjectId)
 */
adminRouter.delete(
  '/properties/:id',
  authMiddleware,
  authorize(['admin']),
  adminDeletePropertyController,
);

export default adminRouter;
