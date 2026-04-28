import mongoose from 'mongoose';

/**
 * Interface for Admin statistics
 * @interface IAdminStats
 */
export interface IAdminStats {
  totalUsers: number;
  totalProperties: number;
  totalViews: number;
  totalLikes: number;
  trendingProperties: mongoose.Types.ObjectId[];
}

/**
 * Get admin dashboard statistics
 * @async
 * @function getAdminStats
 * @returns {Promise<IAdminStats>} Statistics object
 * @throws {Error} If database query fails
 */
export const getAdminStats = async () => {
  try {
    const UserModel = (await import('../user/user.schema')).default;
    const RealEstateModel = (await import('../real-estate/real-estate.schema')).default;

    const [totalUsers, totalProperties, properties] = await Promise.all([
      UserModel.countDocuments({}),
      RealEstateModel.countDocuments({}),
      RealEstateModel.find({}, 'views likes'),
    ]);

    const totalViews = properties.reduce((sum, p) => sum + (p.views || 0), 0);
    const totalLikes = properties.reduce((sum, p) => sum + (p.likes || 0), 0);

    // Get top 5 trending property IDs
    const trendingProperties = properties
      .sort((a, b) => (b.likes * 2 + b.views) - (a.likes * 2 + a.views))
      .slice(0, 5)
      .map(p => p._id);

    return {
      totalUsers,
      totalProperties,
      totalViews,
      totalLikes,
      trendingProperties,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Get all users (admin only)
 * @async
 * @function getAllUsers
 * @param {number} [page=1] - Page number
 * @param {number} [limit=10] - Items per page
 * @returns {Promise<{users: Document[], pagination: Object}>} Users with pagination
 */
export const getAllUsers = async (page: number = 1, limit: number = 10) => {
  try {
    const UserModel = (await import('../user/user.schema')).default;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      UserModel.find({}, '-password -refreshToken')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      UserModel.countDocuments({}),
    ]);

    return {
      users,
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
    throw error;
  }
};

/**
 * Delete a user (admin only)
 * @async
 * @function deleteUser
 * @param {string} userId - MongoDB ObjectId of user
 * @returns {Promise<Document>} Deleted user document
 * @throws {Error} With statusCode 404 if user not found
 */
export const deleteUser = async (userId: string) => {
  try {
    const UserModel = (await import('../user/user.schema')).default;
    const user = await UserModel.findByIdAndDelete(userId);

    if (!user) {
      const error = new Error('User not found');
      (error as any).statusCode = 404;
      throw error;
    }

    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete any property (admin only)
 * @async
 * @function adminDeleteProperty
 * @param {string} propertyId - MongoDB ObjectId of property
 * @returns {Promise<Document>} Deleted property document
 * @throws {Error} With statusCode 404 if property not found
 */
export const adminDeleteProperty = async (propertyId: string) => {
  try {
    const RealEstateModel = (await import('../real-estate/real-estate.schema')).default;
    const property = await RealEstateModel.findByIdAndDelete(propertyId);

    if (!property) {
      const error = new Error('Property not found');
      (error as any).statusCode = 404;
      throw error;
    }

    return property;
  } catch (error) {
    throw error;
  }
};
