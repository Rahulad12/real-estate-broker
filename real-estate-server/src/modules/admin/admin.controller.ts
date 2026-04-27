import {
  getAdminStats,
  getAllUsers,
  deleteUser,
  adminDeleteProperty,
} from './admin.service';
import { Request, Response } from 'express';

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
export const getAdminStatsController = async (req: Request, res: Response) => {
  try {
    const stats = await getAdminStats();
    return res.status(200).json({
      success: true,
      message: 'Admin statistics fetched successfully',
      data: stats,
    });
  } catch (error: any) {
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
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
export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    const result = await getAllUsers(page, limit);
    return res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: result,
    });
  } catch (error: any) {
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
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
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const user = await deleteUser(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: user,
    });
  } catch (error: any) {
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
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
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const property = await adminDeleteProperty(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'Property deleted successfully',
      data: property,
    });
  } catch (error: any) {
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};
