import {
  createRealEstate,
  getRealEstates,
} from '@/services/real-estate.service';
import { CreateRealEstatePayload } from '@/types/real-estate.types';
import { Request, Response } from 'express';

/**
 * Create a new real estate listing
 * @Route POST /api/real-estates
 */
export const createRealEstateController = async (
  req: Request<{}, {}, CreateRealEstatePayload>,
  res: Response,
) => {
  try {
    const realEstate = await createRealEstate(req.body);
    return res.status(201).json({
      success: true,
      message: 'Real estate created successfully',
      data: realEstate,
    });
  } catch (error: any) {
    
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

/**
 * Get all real estate listings
 * @Routes GET /api/real-estates
 */
export const getRealEstatesController = async (req: Request, res: Response) => {
  try {
    const { page, limit, search, propertyType, minPrice, maxPrice } = req.query;
    const result = await getRealEstates(
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
      search as string | undefined,
      propertyType as string | undefined,
      minPrice ? Number(minPrice) : undefined,
      maxPrice ? Number(maxPrice) : undefined,
    );
    return res.status(200).json({
      success: true,
      message: 'Real estates fetched successfully',
      data: result,
    });
  } catch (error: any) {
    
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};
