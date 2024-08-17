import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export default function errorMiddleware(
  err: Error | AppError,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
