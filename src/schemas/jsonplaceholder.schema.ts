import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { logger } from '../config/logger';

// Define post schema using Zod
export const postSchema = z.object({
  userId: z.number(),
  id: z.number().optional(),
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required')
});

// Define comment schema using Zod
export const commentSchema = z.object({
  postId: z.number(),
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  body: z.string().min(1, 'Body is required')
});

// Define user schema using Zod
export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email format'),
  address: z.object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    zipcode: z.string(),
    geo: z.object({
      lat: z.string(),
      lng: z.string()
    })
  }),
  phone: z.string(),
  website: z.string(),
  company: z.object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string()
  })
});

// Define todo schema using Zod
export const todoSchema = z.object({
  userId: z.number(),
  id: z.number().optional(),
  title: z.string().min(1, 'Title is required'),
  completed: z.boolean()
});

// Define album schema using Zod
export const albumSchema = z.object({
  userId: z.number(),
  id: z.number().optional(),
  title: z.string().min(1, 'Title is required')
});

// Define photo schema using Zod
export const photoSchema = z.object({
  albumId: z.number(),
  id: z.number().optional(),
  title: z.string(),
  url: z.string().url('Invalid URL format'),
  thumbnailUrl: z.string().url('Invalid URL format')
});

// Types for data validation
export type PostInput = z.infer<typeof postSchema>;
export type CommentInput = z.infer<typeof commentSchema>;
export type UserInput = z.infer<typeof userSchema>;
export type TodoInput = z.infer<typeof todoSchema>;
export type AlbumInput = z.infer<typeof albumSchema>;
export type PhotoInput = z.infer<typeof photoSchema>;

/**
 * Middleware to validate post data
 */
export const validatePost = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Validate request body against schema
    const validatedData = postSchema.parse(req.body);
    
    // Replace request body with validated data
    req.body = validatedData;
    
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error(`Post validation error: ${JSON.stringify(error.errors)}`);
      next(error);
    } else {
      next(error);
    }
  }
};
