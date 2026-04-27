import { z } from 'zod';

export const createFavoriteSchema = z.object({
  realEstateId: z.string().min(1),
  isFavorite: z.coerce.boolean(),
});
