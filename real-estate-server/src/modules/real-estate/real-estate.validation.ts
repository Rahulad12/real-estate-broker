import { z } from 'zod';

/**
 * @fileoverview Real Estate Validation Schemas
 * @description Zod validation schemas for property operations
 */

/**
 * Schema for creating a new real estate property
 * @type {z.ZodObject}
 * @property {z.ZodString} title - Property title (min 3 chars)
 * @property {z.ZodString} description - Property description (min 10 chars, optional)
 * @property {z.ZodNumber} price - Price (positive number)
 * @property {z.ZodObject} location - Location object with address, city, country, coordinates
 * @property {z.ZodNumber} bedrooms - Number of bedrooms (non-negative integer)
 * @property {z.ZodNumber} bathrooms - Number of bathrooms (non-negative integer)
 * @property {z.ZodNumber} area - Area in sq ft (positive)
 * @property {z.ZodEnum} propertyType - Type: house/apartment/land
 * @property {z.ZodEnum} status - Status: available/sold/pending (default: available)
 * @property {z.ZodEnum} type - Listing type: buy/rent
 * @property {z.ZodArray} images - Array of image URLs (optional, default: [])
 * @property {z.ZodNumber} views - Views count (optional, default: 0)
 * @property {z.ZodNumber} likes - Likes count (optional, default: 0)
 */
export const createRealEstateSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10).optional(),
  price: z.number().positive('Price must be positive'),
  location: z.object({
    address: z.string().min(2),
    city: z.string().min(2),
    country: z.string().min(2),
    lng: z.string().min(2),
    lat: z.string().min(2),
  }),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().int().nonnegative(),
  area: z.number().positive(),
  propertyType: z.enum(['house', 'apartment', 'land']),
  status: z.enum(['available', 'sold', 'pending']).default('available'),
  type: z.enum(['buy', 'rent']),
  images: z.array(z.string()).optional().default([]),
  views: z.number().int().nonnegative().optional().default(0),
  likes: z.number().int().nonnegative().optional().default(0),
});
