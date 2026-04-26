// src/middlewares/validate.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

type ValidateTarget = 'body' | 'query' | 'params';

// export const validateRequest =
//   (schema: ZodSchema, target: ValidateTarget = 'body') =>
//   (req: Request, res: Response, next: NextFunction): void => {
//     const result = schema.safeParse(req[target]);

//     if (!result.success) {
//       res.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         errors: formatZodErrors(result.error),
//       });
//       return;
//     }

//     // Replace req[target] with parsed (sanitized + typed) data
//     req[target] = result.data;
//     next();
//   };

export const validateRequest =
  (schema: ZodSchema, target: ValidateTarget = 'body') =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: formatZodErrors(result.error),
      });
      return;
    }
    next();
  };

const formatZodErrors = (error: ZodError) =>
  error.issues.map((e) => ({
    field: e.path.join('.'),
    message: e.message,
  }));
