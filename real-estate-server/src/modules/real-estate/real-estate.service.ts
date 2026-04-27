import RealEstateModel from './real-estate.schema';
import { CreateRealEstatePayload } from './real-estate.types';

export const createRealEstate = async (data: CreateRealEstatePayload) => {
  try {
    const realEstate = await RealEstateModel.create(data);
    return realEstate;
  } catch (error) {
    throw error;
  }
};

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

export const getPropertyById = async (id: string) => {
  try {
    const property = await RealEstateModel.findById(id);
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
      (error as any).statusCode = 404;
      throw error;
    }

    return property;
  } catch (error) {
    throw error;
  }
};
