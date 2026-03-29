import { z } from 'zod';

export const createRealEstateSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10).optional(),
  price: z.number().positive('Price must be positive'),
  location: z.object({
    address: z.string().min(2),
    lng: z.string().min(2),
    lat: z.string().min(2),
  }),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().int().nonnegative(),
  area: z.number().positive(),
  propertyType: z.enum(['house', 'apartment', 'land']),
  status: z.enum(['available', 'sold', 'pending']).default('available'),
  type: z.enum(['buy', 'rent']),
});
