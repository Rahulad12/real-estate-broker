import {
  getAdminStats,
  getAllUsers,
  deleteUser,
  createUser,
  updateUser,
  adminDeleteProperty,
  adminCreateProperty,
  adminUpdateProperty,
} from './admin.service';
import { AuthRequest } from '@/middleware/auth.middleware';
import { Response } from 'express';

/**
 * Create user as admin
 */
export const createUserController = async (req: AuthRequest, res: Response) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });
  } catch (error) {
    const err = error as Error & { statusCode?: number };
    return res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message });
  }
};

/**
 * Update user as admin
 */
export const updateUserController = async (req: AuthRequest, res: Response) => {
  try {
    const user = await updateUser(req.params.id as string, req.body);
    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  } catch (error) {
    const err = error as Error & { statusCode?: number };
    return res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message });
  }
};

/**
 * Create property as admin
 */
export const adminCreatePropertyController = async (req: AuthRequest, res: Response) => {
  try {
    const property = await adminCreateProperty(req.body);
    return res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: property,
    });
  } catch (error) {
    const err = error as Error & { statusCode?: number };
    return res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message });
  }
};

/**
 * Update property as admin
 */
export const adminUpdatePropertyController = async (req: AuthRequest, res: Response) => {
  try {
    const property = await adminUpdateProperty(req.params.id as string, req.body);
    return res.status(200).json({
      success: true,
      message: 'Property updated successfully',
      data: property,
    });
  } catch (error) {
    const err = error as Error & { statusCode?: number };
    return res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message });
  }
};

/**
 * @fileoverview Admin Controller
 * @description Handles HTTP requests for admin panel endpoints
 * @module AdminController
 */

/**
 * Get admin dashboard statistics
 * @async
 * @function getAdminStatsController
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @returns {Promise<void>} Sends JSON response with stats
 * @status 200 - Stats fetched successfully
 * @status 500 - Server error
 * @example GET /api/admin/stats (requires admin role)
 */
export const getAdminStatsController = async (_req: AuthRequest, res: Response) => {
  try {
    const stats = await getAdminStats();
    return res.status(200).json({
      success: true,
      message: 'Admin statistics fetched successfully',
      data: stats,
    });
  } catch (error) {
    const err = error as Error & { statusCode?: number };
    return res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message });
  }
};

/**
 * Get all users (admin only)
 * @async
 * @function getAllUsersController
 * @param {Request} req - Express request with query (page, limit)
 * @param {Response} res - Express response
 * @returns {Promise<void>} Sends JSON response with users and pagination
 * @status 200 - Users fetched successfully
 * @status 500 - Server error
 * @example GET /api/admin/users?page=1&limit=10
 */
export const getAllUsersController = async (req: AuthRequest, res: Response) => {
  try {
    const page = req.query.page ? Number(req.query.page as string) : 1;
    const limit = req.query.limit ? Number(req.query.limit as string) : 10;

    const result = await getAllUsers(page, limit);
    return res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: result,
    });
  } catch (error) {
    const err = error as Error & { statusCode?: number };
    return res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message });
  }
};

/**
 * Delete a user (admin only)
 * @async
 * @function deleteUserController
 * @param {Request<{id: string}>} req - Express request with user ID in params
 * @param {Response} res - Express response
 * @returns {Promise<void>} Sends JSON response
 * @status 200 - User deleted successfully
 * @status 404 - User not found
 * @status 500 - Server error
 * @example DELETE /api/admin/users/:id
 */
export const deleteUserController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const user = await deleteUser(req.params.id as string);
    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: user,
    });
  } catch (error) {
    const err = error as Error & { statusCode?: number };
    return res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message });
  }
};

/**
 * Delete any property (admin only)
 * @async
 * @function adminDeletePropertyController
 * @param {Request<{id: string}>} req - Express request with property ID in params
 * @param {Response} res - Express response
 * @returns {Promise<void>} Sends JSON response
 * @status 200 - Property deleted successfully
 * @status 404 - Property not found
 * @status 500 - Server error
 * @example DELETE /api/admin/properties/:id
 */
export const adminDeletePropertyController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const property = await adminDeleteProperty(req.params.id as string);
    return res.status(200).json({
      success: true,
      message: 'Property deleted successfully',
      data: property,
    });
  } catch (error) {
    const err = error as Error & { statusCode?: number };
    return res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message });
  }
};
