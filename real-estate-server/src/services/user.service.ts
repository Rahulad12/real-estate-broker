import UserModel from '@/model/user.schema';
import {
  AuthUserPayload,
  CreateUserPayload,
  UpdateEmailPayload,
  UpdatePasswordPayload,
} from '@/types/user.types';
import { AppError } from '@/utils/error.helper';
import logger from '@/utils/logger';
import {
  generateAccessToken,
  generateRefreshToken,
} from '@/utils/token-generator';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { verify } from 'jsonwebtoken';
import { env } from '@/config/env';

/**
 * Register a new user
 * @returns Created user
 */
export const registerUser = async (userDetials: CreateUserPayload) => {
  try {
    logger.info('Registering user', { email: userDetials.email });
    const user = await UserModel.findOne({
      email: userDetials.email,
    });

    const userNameRegex = /^[a-zA-Z0-9_]+$/;
    if (userDetials.userName && !userNameRegex.test(userDetials.userName)) {
      logger.error(
        'Username can only contain letters, numbers, and underscores',
        {
          userName: userDetials.userName,
        },
      );
      throw AppError.badRequest(
        'Username can only contain letters, numbers, and underscores',
      );
    }

    if (userDetials.userName?.includes(' ')) {
      logger.error('Username cannot contain spaces', {
        userName: userDetials.userName,
      });
      throw AppError.badRequest('Username cannot contain spaces');
    }

    if (user) {
      logger.error('User already exists', { email: userDetials.email });
      throw AppError.conflict('User already exists');
    }

    const hashedPassword = await bcrypt.hash(userDetials.password, 10);
    return await UserModel.create({
      ...userDetials,
      password: hashedPassword,
    });
  } catch (error: any) {
    logger.error('Error registering user', { error });
    throw error;
  }
};

/**
 * Authenticate user
 * @returns Authentication result with token and user ID
 */
export const authUser = async (authData: AuthUserPayload) => {
  try {
    logger.info('Authenticating user', { email: authData.email });
    const user = await UserModel.findOne({
      email: authData.email,
    }).select('-createdAt -updatedAt');

    if (!user) {
      logger.error('User not found', { email: authData.email });
      throw AppError.notFound('Invalid credentials');
    }

    const isAuth = await bcrypt.compare(authData.password, user.password);
    if (!isAuth) {
      logger.error('Invalid password', { email: authData.email });
      throw AppError.unauthorized('Invalid credentials');
    }

    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({
      id: user._id,
      role: user.role,
    });
    const { _id } = user.toObject();
    return {
      accessToken,
      refreshToken,
      user: _id,
    };
  } catch (error: any) {
    logger.error('Error authenticating user', { error });
    
    throw error;
  }
};

/**
 * Get user details by ID
 * @returns User details
 */
export const getUserDetailsById = async (userId: mongoose.Types.ObjectId) => {
  try {
    logger.info('Getting user details', { userId });
    const user = await UserModel.findById(userId).select(
      '-createdAt -updatedAt -password -__v',
    );
    if (!user) {
      logger.error('User not found', { userId });
      throw AppError.notFound('User not found');
    }
    return user;
  } catch (error: any) {
    logger.error('Error getting user details', { error });
    throw error;
  }
};

/**
 * Update user email
 */
export const updateEmail = async (
  userId: mongoose.Types.ObjectId,
  payload: UpdateEmailPayload,
) => {
  try {
    logger.info('Updating user email', { userId, newEmail: payload.newEmail });
    const user = await UserModel.findById(userId);

    if (!user) {
      logger.error('User not found', { userId });
      throw AppError.notFound('User not found');
    }

    const isAuth = await bcrypt.compare(payload.currentPassword, user.password);
    if (!isAuth) {
      logger.error('Invalid current password for email update', { userId });
      throw AppError.unauthorized('Invalid current password');
    }

    const emailExists = await UserModel.findOne({ email: payload.newEmail });
    if (emailExists) {
      logger.error('Email already in use', { email: payload.newEmail });
      throw AppError.conflict('Email already in use');
    }

    user.email = payload.newEmail;
    await user.save();

    logger.info('User email updated successfully', { userId });
    const { _id, email, role, userName, firstName, lastName } = user.toObject();
    return { _id, email, role, userName, firstName, lastName };
  } catch (error: any) {
    logger.error('Error updating user email', { error });
    throw error;
  }
};

/**
 * Update user password
 */
export const updatePassword = async (
  userId: mongoose.Types.ObjectId,
  payload: UpdatePasswordPayload,
) => {
  try {
    logger.info('Updating user password', { userId });
    const user = await UserModel.findById(userId);

    if (!user) {
      logger.error('User not found', { userId });
      throw AppError.notFound('User not found');
    }

    const isAuth = await bcrypt.compare(payload.currentPassword, user.password);
    if (!isAuth) {
      logger.error('Invalid current password for password update', { userId });
      throw AppError.unauthorized('Invalid current password');
    }

    const hashedPassword = await bcrypt.hash(payload.newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    logger.info('User password updated successfully', { userId });
    return { success: true };
  } catch (error: any) {
    logger.error('Error updating user password', { error });
    throw error;
  }
};

/**
 * Refresh access token using refresh token
 * @returns New access token
 */
export const refreshAccessToken = async (refreshToken: string) => {
  try {
    logger.info('Refreshing access token');

    const decoded = verify(refreshToken, env.JWT_REFRESH_SECRET!) as any;

    const user = await UserModel.findById(decoded.id).select(
      '-createdAt -updatedAt -password -__v',
    );
    if (!user) {
      logger.error('User not found for refresh token', { userId: decoded.id });
      throw AppError.unauthorized('Invalid refresh token');
    }

    const newAccessToken = generateAccessToken({
      id: user._id,
      role: user.role,
    });

    logger.info('Access token refreshed successfully', { userId: decoded.id });
    return {
      accessToken: newAccessToken,
    };
  } catch (error: any) {
    logger.error('Error refreshing access token', { error });
    throw AppError.unauthorized('Invalid refresh token');
  }
};
