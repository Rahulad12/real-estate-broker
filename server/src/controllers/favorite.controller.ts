import { toggleFavorite } from '@/services/favorite.service';
import { CreateFavoritePayload } from '@/types/favorite.types';
import { Request, Response } from 'express';

/**
 * Toggle a real estate as favorite
 * @Route POST /api/favorites?userId=:userId&realEstateId=:realEstateId
 */
export const toggleFavoriteController = async (
  req: Request<{}, {}, CreateFavoritePayload>,
  res: Response,
) => {
  try {
    const { userId, realEstateId, isFavorite } = req.query;
    const favorite = await toggleFavorite({
      userId: userId as string,
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
