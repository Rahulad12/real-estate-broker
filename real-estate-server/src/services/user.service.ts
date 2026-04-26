import UserModel from '@/model/user.schema';
import { AuthUserPayload, CreateUserPayload } from '@/types/user.types';
import { AppError } from '@/utils/error.helper';
import logger from '@/utils/logger';
import { generateAccessToken, generateRefreshToken } from '@/utils/token-generator';
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
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role });
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
 * Refresh access token using refresh token
 * @returns New access token
 */
export const refreshAccessToken = async (refreshToken: string) => {
  try {
    logger.info('Refreshing access token');
    
    const decoded = verify(refreshToken, env.JWT_REFRESH_SECRET!) as any;
    
    const user = await UserModel.findById(decoded.id).select('-createdAt -updatedAt -password -__v');
    if (!user) {
      logger.error('User not found for refresh token', { userId: decoded.id });
      throw AppError.unauthorized('Invalid refresh token');
    }

    const newAccessToken = generateAccessToken({ id: user._id, role: user.role });
    
    logger.info('Access token refreshed successfully', { userId: decoded.id });
    return {
      accessToken: newAccessToken,
    };
  } catch (error: any) {
    logger.error('Error refreshing access token', { error });
    throw AppError.unauthorized('Invalid refresh token');
  }
};
