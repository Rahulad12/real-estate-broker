import { createRealEstate, getRealEstates } from '@/services/real-estate.service';
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
    console.log('Create Real Estate Error', error);
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

/**
 * Get all real estate listings
 * @Routes GET /api/real-estates
 */
export const getRealEstatesController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const realEstates = await getRealEstates();
    return res.status(200).json({
      success: true,
      message: 'Real estates fetched successfully',
      data: realEstates,
    });
  } catch (error: any) {
    console.log('Get Real Estates Error', error);
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

