import {
  createRealEstate,
  getRealEstates,
  getPropertyById,
  uploadPropertyImages,
  incrementPropertyViews,
  getTrendingProperties,
} from './real-estate.service';
import { getImageUrl } from '@/middleware/upload.middleware';
import { CreateRealEstatePayload } from './real-estate.types';
import { Request, Response } from 'express';

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

export const getPropertyByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const property = await getPropertyById(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'Property fetched successfully',
      data: property,
    });
  } catch (error: any) {
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

export const uploadPropertyImagesController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded',
      });
    }

    const imagePaths = (req.files as Express.Multer.File[]).map((file) =>
      getImageUrl(file.filename),
    );

    const updatedProperty = await uploadPropertyImages(req.params.id, imagePaths);

    return res.status(200).json({
      success: true,
      message: 'Images uploaded successfully',
      data: updatedProperty,
    });
  } catch (error: any) {
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

export const incrementPropertyViewsController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const property = await incrementPropertyViews(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'Property views incremented',
      data: property,
    });
  } catch (error: any) {
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

export const getTrendingPropertiesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 6;
    const properties = await getTrendingProperties(limit);
    return res.status(200).json({
      success: true,
      message: 'Trending properties fetched successfully',
      data: properties,
    });
  } catch (error: any) {
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};
