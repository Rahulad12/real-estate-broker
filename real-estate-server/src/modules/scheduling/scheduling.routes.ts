import { Router } from 'express';
import {
  createSchedulingController,
  getAllSchedulingsController,
  updateSchedulingStatusController,
  getSchedulingStatsController,
} from './scheduling.controller';
import { authenticate } from '@/middleware/auth.middleware';
import { authorize } from '@/middleware/role.middleware';
import { UserRole } from '@/modules/user/user.types';

const router = Router();

// User can create a scheduling request
router.post('/', authenticate, createSchedulingController);

// Admin only routes
router.get('/', authenticate, authorize(['admin' as UserRole]), getAllSchedulingsController);
router.patch('/:id', authenticate, authorize(['admin' as UserRole]), updateSchedulingStatusController);
router.get('/stats', authenticate, authorize(['admin' as UserRole]), getSchedulingStatsController);

export default router;
