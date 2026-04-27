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

/**
 * @fileoverview Real Estate Controller
 * @description Handles HTTP requests for property-related endpoints
 * @module RealEstateController
 */

/**
 * Controller to create a new real estate property
 * @async
 * @function createRealEstateController
 * @param {Request} req - Express request with property data in body
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Sends JSON response with created property
 * @status 201 - Property created successfully
 * @status 400 - Validation error (handled by middleare)
 * @status 500 - Server error
 * @example POST /api/real-estate
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
 * Controller to get all real estate properties with filtering
 * @async
 * @function getRealEstatesController
 * @param {Request} req - Express request with query params (page, limit, search, propertyType, minPrice, maxPrice)
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Sends JSON response with properties and pagination
 * @status 200 - Properties fetched successfully
 * @status 500 - Server error
 * @example GET /api/real-estate?page=1&limit=10&search=villa&propertyType=villa
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

/**
 * Controller to get a single property by ID
 * @async
 * @function getPropertyByIdController
 * @param {Request<{id: string}>} req - Express request with property ID in params
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Sends JSON response with property data
 * @status 200 - Property fetched successfully
 * @status 404 - Property not found
 * @status 500 - Server error
 * @example GET /api/real-estate/507f1f77bcf86cd799439011
 */
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

/**
 * Controller to upload images for a property
 * @async
 * @function uploadPropertyImagesController
 * @param {Request<{id: string}>} req - Express request with property ID and files
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Sends JSON response with updated property
 * @status 200 - Images uploaded successfully
 * @status 400 - No files uploaded
 * @status 404 - Property not found
 * @status 500 - Server error
 * @example POST /api/real-estate/507f1f77bcf86cd799439011/images
 */
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

/**
 * Controller to increment property view count
 * @async
 * @function incrementPropertyViewsController
 * @param {Request<{id: string}>} req - Express request with property ID in params
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Sends JSON response with updated property
 * @status 200 - Views incremented successfully
 * @status 404 - Property not found
 * @status 500 - Server error
 * @example POST /api/real-estate/507f1f77bcf86cd799439011/view
 */
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

/**
 * Controller to get trending properties
 * @async
 * @function getTrendingPropertiesController
 * @param {Request} req - Express request with optional limit query param
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Sends JSON response with trending properties
 * @status 200 - Trending properties fetched successfully
 * @status 500 - Server error
 * @example GET /api/real-estate/trending?limit=6
 */
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
