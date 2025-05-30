import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';
import { TaskService } from '../services/task.service';

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
    
    res.status(200).json({ tasks, count: tasks.length });
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
    const taskData = req.body;
    logger.info(`Received request to create new task: ${taskData.title}`);
    
    // Get user ID from request (in a real app, this would come from authentication)
    const userId = req.body.userId || req.user?.id || '1';
    
    const newTask = await TaskService.createTask(taskData, userId);
    
    res.status(201).json({ task: newTask });
  } catch (error) {
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
    const taskData = req.body;
    logger.info(`Received request to update task with ID: ${id}`);
    
    const updatedTask = await TaskService.updateTask(id, taskData);
    
    res.status(200).json({ task: updatedTask });
  } catch (error) {
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
    const { id } = req.params;
    logger.info(`Received request to delete task with ID: ${id}`);
    
    await TaskService.deleteTask(id);
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
