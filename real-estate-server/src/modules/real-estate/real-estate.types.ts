import z from 'zod';
import { createRealEstateSchema } from './real-estate.validation';

export type CreateRealEstatePayload = z.infer<typeof createRealEstateSchema>;
