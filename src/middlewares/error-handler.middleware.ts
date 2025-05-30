import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/errors';
import { logger } from '../config/logger';
import { ZodError } from 'zod';

/**
 * Global error handler middleware
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error(`Error: ${err.message}`);
  
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    logger.error(`Validation error: ${JSON.stringify(err.errors)}`);
    res.status(400).json({
      error: 'Validation Error',
      details: err.errors,
      statusCode: 400
    });
    return;
  }
  
  // Handle custom API errors
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
      statusCode: err.statusCode
    });
    return;
  }
  
  // Handle JWT errors
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid token',
      statusCode: 401
    });
    return;
  }
  
  // Handle other errors
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong',
    statusCode: 500
  });
};
