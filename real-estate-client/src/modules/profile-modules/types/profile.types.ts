import { z } from "zod";
import { UpdateEmailSchema, UpdatePasswordSchema } from "../validation/profile.schema";

export type UpdateEmailPayload = z.infer<typeof UpdateEmailSchema>;
export type UpdatePasswordPayload = z.infer<typeof UpdatePasswordSchema>;
