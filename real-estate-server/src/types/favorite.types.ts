import { createFavoriteSchema } from '@/validation/favorite.validation';
import z from 'zod';

export type CreateFavoritePayload = z.infer<typeof createFavoriteSchema>;
