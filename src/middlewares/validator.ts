import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

// TODO: Parse params

export const validate = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(
          error.issues.map((issue) => ({
            path: issue.path,
            message: issue.message,
          })),
        );
      }
      return res.status(500).json({ msg: 'Internal server error', error });
    }
  };
};
