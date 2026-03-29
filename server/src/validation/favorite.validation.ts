import { z } from 'zod';

export const createFavoriteSchema = z.object({
  userId: z.string().min(1),
  realEstateId: z.string().min(1),
  isFavorite: z.boolean().default(true),
});
