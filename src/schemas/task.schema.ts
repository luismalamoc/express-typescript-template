import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { logger } from '../config/logger';
import { TaskStatus, CreateTaskDto, UpdateTaskDto } from '../types/task.types';

// Define task creation schema using Zod
export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().optional(),
  status: z.enum([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED]).optional().default(TaskStatus.PENDING),
  userId: z.string().optional()
});

// Define task update schema using Zod
export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters').optional(),
  description: z.string().optional(),
  status: z.enum([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED]).optional()
});

// Types for task data
export type TaskCreateInput = z.infer<typeof createTaskSchema>;
export type TaskUpdateInput = z.infer<typeof updateTaskSchema>;

// For backward compatibility
export type TaskInput = TaskCreateInput;

/**
 * Middleware to validate task creation data
 */
export const validateCreateTask = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Validate request body against schema
    const validatedData = createTaskSchema.parse(req.body);
    
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

/**
 * Middleware to validate task update data
 */
export const validateUpdateTask = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Validate request body against schema
    const validatedData = updateTaskSchema.parse(req.body);
    
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

// For backward compatibility
export const validateTask = validateCreateTask;
