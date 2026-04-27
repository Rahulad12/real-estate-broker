import { AuthRequest } from '@/middleware/auth.middleware';
import {
  getFavorites,
  getFavoritesCountByUserId,
  toggleFavorite,
} from './favorite.service';
import { Response } from 'express';

export const toggleFavoriteController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { realEstateId, isFavorite } = req.query;

    const favorite = await toggleFavorite({
      userId: req.user.id as string,
      realEstateId: realEstateId as string,
      isFavorite: isFavorite === 'true',
    });
    return res.status(201).json({
      success: true,
      message: 'Favorite toggled successfully',
      data: favorite,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFavoritesController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.user.id as string;
    const { page, limit } = req.query;
    const favorites = await getFavorites(
      userId,
      page ? Number(page) : undefined,
      limit ? Number(limit) : undefined,
    );
    return res.status(200).json({
      success: true,
      message: 'Favorites retrieved successfully',
      data: favorites,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFavoritesCountController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.user.id as string;
    const count = await getFavoritesCountByUserId(userId);
    return res.status(200).json({
      success: true,
      data: count,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
