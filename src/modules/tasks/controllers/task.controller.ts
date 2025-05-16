import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../utils/logger';
import { NotFoundError } from '../../../utils/errors';

// Mock database for tasks
const tasks = [
  { id: '1', title: 'Complete project setup', description: 'Set up the initial project structure', status: 'completed', userId: '1' },
  { id: '2', title: 'Implement authentication', description: 'Add JWT authentication to the API', status: 'in-progress', userId: '1' },
  { id: '3', title: 'Write documentation', description: 'Create API documentation with Swagger', status: 'pending', userId: '2' }
];

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
    
    // Filter tasks by user ID if provided in query
    const userId = req.query.userId as string;
    let filteredTasks = tasks;
    
    if (userId) {
      filteredTasks = tasks.filter(task => task.userId === userId);
    }
    
    res.status(200).json({ tasks: filteredTasks });
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
    
    const task = tasks.find(t => t.id === id);
    
    if (!task) {
      throw new NotFoundError(`Task with ID ${id} not found`);
    }
    
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
    const { title, description, status, userId } = req.body;
    logger.info(`Received request to create new task: ${title}`);
    
    // In a real app, this would save to a database
    const newTask = {
      id: (tasks.length + 1).toString(),
      title,
      description,
      status: status || 'pending',
      userId: userId || req.user?.id
    };
    
    tasks.push(newTask);
    
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
    const { title, description, status } = req.body;
    logger.info(`Received request to update task with ID: ${id}`);
    
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      throw new NotFoundError(`Task with ID ${id} not found`);
    }
    
    // Update task properties
    const updatedTask = {
      ...tasks[taskIndex],
      title: title || tasks[taskIndex].title,
      description: description || tasks[taskIndex].description,
      status: status || tasks[taskIndex].status
    };
    
    tasks[taskIndex] = updatedTask;
    
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
    
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      throw new NotFoundError(`Task with ID ${id} not found`);
    }
    
    // Remove task
    tasks.splice(taskIndex, 1);
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
