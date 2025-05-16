import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { logger } from '../../../utils/logger';

// Define task schema using Zod
const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().optional(),
  status: z.enum(['pending', 'in-progress', 'completed']).optional().default('pending'),
  userId: z.string().optional()
});

// Type for task data
export type TaskInput = z.infer<typeof taskSchema>;

/**
 * Middleware to validate task data
 */
export const validateTask = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Validate request body against schema
    const validatedData = taskSchema.parse(req.body);
    
    // Replace request body with validated data
    req.body = validatedData;
    
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error(`Task validation error: ${JSON.stringify(error.errors)}`);
      next(error);
    } else {
      next(error);
    }
  }
};
