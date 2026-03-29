import FavoriteModel from '@/model/favorite-schema';
import { CreateFavoritePayload } from '@/types/favorite.types';
import { AppError } from '@/utils/error.helper';
import logger from '@/utils/logger';

/**
 * Toggle a real estate as favorite for a user
 * @param userId - The ID of the user
 * @param realEstateId - The ID of the real estate
 * @returns The saved favorite document
 */
export const toggleFavorite = async (favoriteDto: CreateFavoritePayload) => {
  try {
    logger.info('Toggling favorite', {
      userId: favoriteDto.userId,
      realEstateId: favoriteDto.realEstateId,
      isFavorite: favoriteDto.isFavorite,
    });
    const existingFavorite = await FavoriteModel.findOne({
      userId: favoriteDto.userId,
      realEstateId: favoriteDto.realEstateId,
      isFavorite: favoriteDto.isFavorite,
    });

    if (existingFavorite) {
      logger.info('Favorite already exists', {
        favoriteId: existingFavorite._id,
      });
      throw AppError.conflict('Favorite already exists');
    }

    const favorite = await FavoriteModel.updateOne(
      {
        userId: favoriteDto.userId,
        realEstateId: favoriteDto.realEstateId,
      },
      {
        isFavorite: favoriteDto.isFavorite,
      },
      {
        upsert: true,
      },
    );
    logger.info('Favorite saved successfully');
    return favorite;
  } catch (error) {
    logger.error('Error saving favorite', { error });
    throw error;
  }
};
