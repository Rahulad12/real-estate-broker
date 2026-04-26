import { z } from "zod";

export const UpdateEmailSchema = z.object({
  newEmail: z.string().email({ message: "Invalid email address" }),
  currentPassword: z.string().min(1, { message: "Current password is required" }),
});

export const UpdatePasswordSchema = z.object({
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      }
    ),
  confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
  currentPassword: z.string().min(1, { message: "Current password is required" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
