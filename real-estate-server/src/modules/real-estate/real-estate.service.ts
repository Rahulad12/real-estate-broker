import RealEstateModel from './real-estate.schema';
import { CreateRealEstatePayload } from './real-estate.types';

/**
 * Create a new real estate property
 * @async
 * @function createRealEstate
 * @param {CreateRealEstatePayload} data - Property data to create
 * @returns {Promise<Document>} Created property document
 * @throws {Error} If creation fails (Mongoose validation or DB error)
 * @example
 * const property = await createRealEstate({
 *   title: "Luxury Villa",
 *   price: 500000,
 *   location: { address: "123 Main St", city: "New York", country: "USA", lng: "-74.006", lat: "40.7128" },
 *   bedrooms: 4, bathrooms: 3, area: 2500, propertyType: "villa", status: "available", type: "buy"
 * });
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
 * Update an existing real estate property
 * @async
 * @function updateRealEstate
 * @param {string} id - Property ID
 * @param {Partial<CreateRealEstatePayload>} data - Property data to update
 * @returns {Promise<Document>} Updated property document
 */
export const updateRealEstate = async (id: string, data: Partial<CreateRealEstatePayload>) => {
  try {
    const property = await RealEstateModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!property) {
      const error = new Error('Property not found');
      (error as Error & { statusCode?: number }).statusCode = 404;
      throw error;
    }
    return property;
  } catch (error) {
    throw error;
  }
};

/**
 * Get a single property by its ID
 * @async
 * @function getPropertyById
 * @param {string} id - MongoDB ObjectId of the property
 * @returns {Promise<Document>} Property document
 * @throws {Error} With statusCode 404 if property not found
 * @throws {Error} If database query fails
 * @example
 * const property = await getPropertyById("507f1f77bcf86cd799439011");
 */
export const getPropertyById = async (id: string) => {
  try {
    const property = await RealEstateModel.findById(id);
    if (!property) {
      const error = new Error('Property not found');
      (error as Error & { statusCode?: number }).statusCode = 404;
      throw error;
    }
    return property;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all real estate properties with filtering and pagination
 * @async
 * @function getRealEstates
 * @param {number} [page=1] - Page number
 * @param {number} [limit=10] - Items per page
 * @param {string} [search] - Search term
 * @param {string} [propertyType] - Filter by property type
 * @param {number} [minPrice] - Minimum price
 * @param {number} [maxPrice] - Maximum price
 * @returns {Promise<{realEstates: Document[], pagination: Object}>} Properties with pagination
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
    const query: Record<string, unknown> = {};

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
      if (minPrice !== undefined) (query.price as Record<string, unknown>).$gte = minPrice;
      if (maxPrice !== undefined) (query.price as Record<string, unknown>).$lte = maxPrice;
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

/**
 * Upload images for a property
 * @async
 * @function uploadPropertyImages
 * @param {string} propertyId - MongoDB ObjectId of the property
 * @param {string[]} imagePaths - Array of image URLs to add
 * @returns {Promise<Document>} Updated property document with new images
 * @throws {Error} With statusCode 404 if property not found
 * @throws {Error} If database update fails
 * @example
 * const updated = await uploadPropertyImages("507f1f77bcf86cd799439011", [
 *   "/uploads/property1-img1.jpg",
 *   "/uploads/property1-img2.jpg"
 * ]);
 */
export const uploadPropertyImages = async (
  propertyId: string,
  imagePaths: string[],
) => {
  try {
    const property = await RealEstateModel.findByIdAndUpdate(
      propertyId,
      { $push: { images: { $each: imagePaths } } },
      { new: true, runValidators: true },
    );

    if (!property) {
      const error = new Error('Property not found');
      (error as Error & { statusCode?: number }).statusCode = 404;
      throw error;
    }

    return property;
  } catch (error) {
    throw error;
  }
};

/**
 * Increment the view count for a property
 * @async
 * @function incrementPropertyViews
 * @param {string} id - MongoDB ObjectId of the property
 * @returns {Promise<Document>} Updated property document
 * @throws {Error} With statusCode 404 if property not found
 * @throws {Error} If database update fails
 * @example
 * const updated = await incrementPropertyViews("507f1f77bcf86cd799439011");
 * // Returns property with views incremented by 1
 */
export const incrementPropertyViews = async (id: string) => {
  try {
    const property = await RealEstateModel.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true },
    );

    if (!property) {
      const error = new Error('Property not found');
      (error as Error & { statusCode?: number }).statusCode = 404;
      throw error;
    }

    return property;
  } catch (error) {
    throw error;
  }
};

/**
 * Get trending properties based on views and likes
 * @async
 * @function getTrendingProperties
 * @param {number} [limit=6] - Maximum number of properties to return
 * @returns {Promise<Document[]>} Array of trending properties sorted by likes and views
 * @throws {Error} If database query fails
 * @example
 * const trending = await getTrendingProperties(6);
 * // Returns top 6 properties sorted by (likes * 2 + views)
 */
export const getTrendingProperties = async (limit: number = 6) => {
  try {
    // Calculate trending score: (likes * 2) + views
    const properties = await RealEstateModel.find()
      .sort({ likes: -1, views: -1 })
      .limit(limit);
    
    return properties;
  } catch (error) {
    throw error;
  }
};
