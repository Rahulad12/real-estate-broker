import { authUser, getUserDetailsById, registerUser, refreshAccessToken } from '@/services/user.service';
import { Request, Response } from 'express';
import { AuthRequest } from '@/middleware/auth.middleware';
import { AuthUserPayload, CreateUserPayload } from '@/types/user.types';
import mongoose from 'mongoose';

/**
 * Create a new user
 * @Routes POST /api/users/register
 */
export const registerUserController = async (
  req: Request<{}, {}, CreateUserPayload>,
  res: Response,
) => {
  const userRequest: CreateUserPayload = req.body;
  try {
    await registerUser(userRequest);
    return res.status(201).json({
      success: true,
      message: 'User created successfully',
    });
  } catch (error: any) {
    console.log('Create User Error', error);
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

/**
 * Authenticate user
 * @Routes POST /api/users/auth
 */
export const authUserController = async (req: Request, res: Response) => {
  const userRequest: AuthUserPayload = req.body;
  try {
    const result = await authUser(userRequest);
    return res.status(200).json({
      success: true,
      data: result,
      message: 'User Logged In Successfully',
    });
  } catch (error: any) {
    console.log('Auth User Error', error);
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

/**
 * Get user details by UserID
 * @Routes GET /api/auth/user/me
 */
export const getUserDetailsController = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id as mongoose.Types.ObjectId;
  try {
    const user = await getUserDetailsById(userId);
    return res.status(200).json({
      success: true,
      data: user,
      message: 'User details retrieved successfully',
    });
  } catch (error: any) {
    console.log('Get User Details Error', error);
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

/**
 * Refresh access token
 * @Routes POST /api/users/refresh-token
 */
export const refreshTokenController = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    const result = await refreshAccessToken(refreshToken);
    return res.status(200).json({
      success: true,
      data: result,
      message: 'Access token refreshed successfully',
    });
  } catch (error: any) {
    console.log('Refresh Token Error', error);
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};