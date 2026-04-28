import {
  authUser,
  getUserDetailsById,
  registerUser,
  refreshAccessToken,
  updateEmail,
  updatePassword,
} from './user.service';
import { Request, Response } from 'express';
import { AuthRequest } from '@/middleware/auth.middleware';
import {
  AuthUserPayload,
  CreateUserPayload,
  UpdateEmailPayload,
  UpdatePasswordPayload,
} from './user.types';
import mongoose from 'mongoose';

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
  } catch (error) {
    const err = error as Error & { statusCode?: number };
    return res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message });
  }
};

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
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

export const getUserDetailsController = async (
  req: AuthRequest,
  res: Response,
) => {
  const userId = new mongoose.Types.ObjectId(req.user!.id);
  try {
    const user = await getUserDetailsById(userId);
    return res.status(200).json({
      success: true,
      data: user,
      message: 'User details retrieved successfully',
    });
  } catch (error: any) {
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

export const updateEmailController = async (
  req: AuthRequest,
  res: Response,
) => {
  const userId = new mongoose.Types.ObjectId(req.user!.id);
  const payload: UpdateEmailPayload = req.body;
  try {
    const user = await updateEmail(userId, payload);
    return res.status(200).json({
      success: true,
      data: user,
      message: 'Email updated successfully',
    });
  } catch (error: any) {
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

export const updatePasswordController = async (
  req: AuthRequest,
  res: Response,
) => {
  const userId = new mongoose.Types.ObjectId(req.user!.id);
  const payload: UpdatePasswordPayload = req.body;
  try {
    await updatePassword(userId, payload);
    return res.status(200).json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    const err = error as Error & { statusCode?: number };
    return res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message });
  }
};

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
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};
