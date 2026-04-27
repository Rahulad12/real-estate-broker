import z from 'zod';
import { createRealEstateSchema } from './real-estate.validation';

/**
 * @fileoverview Real Estate Types
 * @description TypeScript types and interfaces for Real Estate module
 */

/**
 * Payload for creating a new real estate property
 * @type {CreateRealEstatePayload}
 * @property {string} title - Property title (min 3 chars)
 * @property {string} [description] - Detailed description (min 10 chars, optional)
 * @property {number} price - Property price in USD (must be positive)
 * @property {Object} location - Location information
 * @property {string} location.address - Full street address (min 2 chars)
 * @property {string} location.city - City name (min 2 chars)
 * @property {string} location.country - Country name (min 2 chars)
 * @property {string} location.lng - Longitude coordinate (min 2 chars)
 * @property {string} location.lat - Latitude coordinate (min 2 chars)
 * @property {number} bedrooms - Number of bedrooms (non-negative integer)
 * @property {number} bathrooms - Number of bathrooms (non-negative integer)
 * @property {number} area - Area in square feet (positive number)
 * @property {string} propertyType - Type: house/apartment/land
 * @property {string} status - Status: available/sold/pending (default: available)
 * @property {string} type - Listing type: buy/rent
 * @property {string[]} [images] - Optional array of image URLs (default: [])
 * @property {number} [views] - Optional views count (default: 0)
 * @property {number} [likes] - Optional likes count (default: 0)
 */
export type CreateRealEstatePayload = z.infer<typeof createRealEstateSchema>;
