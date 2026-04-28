import { Router } from 'express';
import { authenticate } from '@/middleware/auth.middleware';
import { authorize } from '@/middleware/role.middleware';
import { UserRole } from '@/modules/user/user.types';
import {
  getAdminStatsController,
  getAllUsersController,
  deleteUserController,
  createUserController,
  updateUserController,
  adminDeletePropertyController,
  adminCreatePropertyController,
  adminUpdatePropertyController,
} from './admin.controller';

const adminRouter = Router();

// Apply auth middleware to all admin routes
adminRouter.use(authenticate, authorize(['admin' as UserRole]));

/**
 * @routes
 * - GET    /stats             → Get admin dashboard statistics
 * - GET    /users             → Get all users with pagination
 * - POST   /users             → Create a user
 * - PATCH  /users/:id         → Update a user
 * - DELETE /users/:id         → Delete a user
 * - POST   /properties        → Create a property
 * - PATCH  /properties/:id    → Update a property
 * - DELETE /properties/:id    → Delete any property
 */

adminRouter.get('/stats', getAdminStatsController);

// User management
adminRouter.get('/users', getAllUsersController);
adminRouter.post('/users', createUserController);
adminRouter.patch('/users/:id', updateUserController);
adminRouter.delete('/users/:id', deleteUserController);

// Property management
adminRouter.post('/properties', adminCreatePropertyController);
adminRouter.patch('/properties/:id', adminUpdatePropertyController);
adminRouter.delete('/properties/:id', adminDeletePropertyController);

export default adminRouter;
