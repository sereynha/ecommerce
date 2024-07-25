import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (e: any) {
    res.status(422).json({
      message: 'Unprocessable entity',
      errorCode: 422,
      errors: e.errors,
    });
  }
};