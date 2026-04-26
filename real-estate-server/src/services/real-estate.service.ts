import RealEstateModel from '@/model/real-estate.schema';
import { CreateRealEstatePayload } from '@/types/real-estate.types';

/**
 * Create a new real estate listing
 * @returns Created real estate listing
 */
export const createRealEstate = async (data: CreateRealEstatePayload) => {
  try {
    const realEstate = await RealEstateModel.create(data);
    return realEstate;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all real estate listings with pagination and filters
 * @param page - Page number (default: 1)
 * @param limit - Items per page (default: 10)
 * @param search - Search query for title/location
 * @param propertyType - Filter by property type
 * @param minPrice - Minimum price filter
 * @param maxPrice - Maximum price filter
 * @returns Paginated real estate listings
 */
export const getRealEstates = async (
  page: number = 1,
  limit: number = 10,
  search?: string,
  propertyType?: string,
  minPrice?: number,
  maxPrice?: number,
) => {
  try {
    const skip = (page - 1) * limit;

    // Build query filter
    const query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { 'location.address': { $regex: search, $options: 'i' } },
      ];
    }

    if (propertyType) {
      query.propertyType = propertyType;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = minPrice;
      if (maxPrice !== undefined) query.price.$lte = maxPrice;
    }

    const [realEstates, total] = await Promise.all([
      RealEstateModel.find(query).skip(skip).limit(limit),
      RealEstateModel.countDocuments(query),
    ]);

    return {
      realEstates,
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
