import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';
import { TaskService } from '../services/task.service';
import { createTaskSchema, updateTaskSchema, TaskCreateInput, TaskUpdateInput } from '../schemas/task.schema';
import { z } from 'zod';

/**
 * Controller for getting all tasks
 */
export const getAllTasksHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info('Received request to get all tasks');
    
    const tasks = await TaskService.getAllTasks();
    
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller for getting a task by ID
 */
export const getTaskByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    logger.info(`Received request to get task with ID: ${id}`);
    
    const task = await TaskService.getTaskById(id);
    
    res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller for creating a new task
 */
export const createTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // The validation middleware has already validated the request body,
    // but we can explicitly parse it again for type safety
    const taskData: TaskCreateInput = createTaskSchema.parse(req.body);
    logger.info(`Received request to create new task: ${taskData.title}`);
    
    // Get user ID from request (in a real app, this would come from authentication)
    const userId = taskData.userId || req.user?.id || '1';
    
    const newTask = await TaskService.createTask(taskData, userId);
    
    res.status(201).json({ task: newTask });
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error(`Task validation error: ${JSON.stringify(error.errors)}`);
      res.status(400).json({ errors: error.errors });
      return;
    }
    next(error);
  }
};

/**
 * Controller for updating a task
 */
export const updateTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    // The validation middleware has already validated the request body,
    // but we can explicitly parse it again for type safety
    const taskData: TaskUpdateInput = updateTaskSchema.parse(req.body);
    logger.info(`Received request to update task with ID: ${id}`);
    
    const updatedTask = await TaskService.updateTask(id, taskData);
    
    res.status(200).json({ task: updatedTask });
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error(`Task validation error: ${JSON.stringify(error.errors)}`);
      res.status(400).json({ errors: error.errors });
      return;
    }
    next(error);
  }
};

/**
 * Controller for deleting a task
 */
export const deleteTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validate the ID parameter (could use a separate schema for this)
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      res.status(400).json({ error: 'Invalid task ID' });
      return;
    }
    
    logger.info(`Received request to delete task with ID: ${id}`);
    
    await TaskService.deleteTask(id);
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
