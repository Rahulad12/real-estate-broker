import z from 'zod';
import { createRealEstateSchema } from '../validation/real-estate.validation';

export type CreateRealEstatePayload = z.infer<typeof createRealEstateSchema>;
