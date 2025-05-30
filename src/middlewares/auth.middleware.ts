import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors';
import config from '../config';
import { logger } from '../config/logger';
// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

/**
 * Middleware to authenticate requests using JWT
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }

    // Extract token
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedError('Invalid token format');
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, config.jwt.secret) as {
        id: string;
        email: string;
        role: string;
      };
      
      // Attach user info to request
      req.user = decoded;
      next();
    } catch (error) {
      logger.error(`Token verification failed: ${(error as Error).message}`);
      throw new UnauthorizedError('Invalid token');
    }
  } catch (error) {
    next(error);
  }
};
