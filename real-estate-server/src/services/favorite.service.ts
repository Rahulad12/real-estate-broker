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
interface payload extends CreateFavoritePayload {
  userId: string;
}
export const toggleFavorite = async (favoriteDto: payload) => {
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

/**
 * Get all favorites for a user
 * @param userId - The ID of the user
 * @returns The favorites
 */
export const getFavorites = async (
  userId: string,
  page: number = 1,
  limit: number = 10,
) => {
  try {
    logger.info('Getting favorites', { userId });

    const skip = (page - 1) * limit;
    const query = { userId, isFavorite: true };

    const [favorites, total] = await Promise.all([
      FavoriteModel.find(query)
        .populate('realEstateId')
        .skip(skip)
        .limit(limit),
      FavoriteModel.countDocuments(query),
    ]);

    logger.info('Favorites retrieved successfully', {
      count: favorites.length,
    });

    return {
      favorites,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    logger.error('Error getting favorites', { error });
    throw error;
  }
};

/**
 * Get the count of favorites for a user
 * @param userId - The ID of the user
 * @returns The count of favorites
 */
export const getFavoritesCountByUserId = async (userId: string) => {
  try {
    logger.info('Getting favorites count', { userId });

    const count = await FavoriteModel.countDocuments({
      userId,
      isFavorite: true,
    });
    logger.info('Favorites count retrieved successfully');
    return count;
  } catch (error) {
    logger.error('Error getting favorites count', { error });
    throw error;
  }
};
