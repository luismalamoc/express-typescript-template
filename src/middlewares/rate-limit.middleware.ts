import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

interface RateLimitOptions {
  statusCode: number;
  message: { message: string };
}

/**
 * Rate limiting middleware for general API endpoints
 * Less restrictive than the authentication rate limiter
 */
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { message: 'Too many requests, please try again later' },
  handler: (req: Request, res: Response, next: NextFunction, options: RateLimitOptions) => {
    logger.warn(`API rate limit exceeded for IP: ${req.ip}`);
    res.status(options.statusCode).json(options.message);
  }
});
