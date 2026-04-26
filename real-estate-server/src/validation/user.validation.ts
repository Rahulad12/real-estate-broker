import { z } from 'zod';

export const CreateUserValidation = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
      },
    ),
  userName: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username can only contain letters, numbers and underscores',
    }),
  firstName: z
    .string()
    .min(3, { message: 'First name must be at least 3 characters' }),
  lastName: z
    .string()
    .min(3, { message: 'Last name must be at least 3 characters' }),
  role: z.enum(['user', 'admin']),
});

export const LoginValidation = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export const UpdateEmailValidation = z.object({
  newEmail: z.string().email({ message: 'Invalid email address' }),
  currentPassword: z
    .string()
    .min(1, { message: 'Current password is required' }),
});

export const UpdatePasswordValidation = z.object({
  newPassword: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
      },
    ),
  currentPassword: z
    .string()
    .min(1, { message: 'Current password is required' }),
});
