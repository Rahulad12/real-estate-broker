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
 * Get all real estate listings
 * @returns Array of real estate listings
 */
export const getRealEstates = async () => {
  try {
    const realEstates = await RealEstateModel.find();
    return realEstates;
  } catch (error) {
    throw error;
  }
};