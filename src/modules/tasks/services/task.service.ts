import { NotFoundError } from '../../../utils/errors';
import { logger } from '../../../utils/logger';
import { TaskInput } from '../schemas/task.schema';

// Task interface
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mock database for tasks
const tasks: Task[] = [
  { 
    id: '1', 
    title: 'Complete project setup', 
    description: 'Set up the initial project structure', 
    status: 'completed', 
    userId: '1',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-02')
  },
  { 
    id: '2', 
    title: 'Implement authentication', 
    description: 'Add JWT authentication to the API', 
    status: 'in-progress', 
    userId: '1',
    createdAt: new Date('2023-01-03'),
    updatedAt: new Date('2023-01-03')
  }
];

/**
 * Service for task operations
 */
export class TaskService {
  /**
   * Get all tasks, optionally filtered by userId
   */
  static async getAllTasks(userId?: string): Promise<Task[]> {
    logger.info('Getting all tasks');
    
    if (userId) {
      return tasks.filter(task => task.userId === userId);
    }
    
    return tasks;
  }
  
  /**
   * Get a task by ID
   */
  static async getTaskById(id: string): Promise<Task> {
    logger.info(`Getting task with ID: ${id}`);
    
    const task = tasks.find(t => t.id === id);
    
    if (!task) {
      throw new NotFoundError(`Task with ID ${id} not found`);
    }
    
    return task;
  }
  
  /**
   * Create a new task
   */
  static async createTask(taskData: TaskInput, userId: string): Promise<Task> {
    logger.info(`Creating new task: ${taskData.title}`);
    
    const newTask: Task = {
      id: (tasks.length + 1).toString(),
      title: taskData.title,
      description: taskData.description,
      status: taskData.status || 'pending',
      userId: taskData.userId || userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    tasks.push(newTask);
    
    return newTask;
  }
  
  /**
   * Update an existing task
   */
  static async updateTask(id: string, taskData: Partial<TaskInput>): Promise<Task> {
    logger.info(`Updating task with ID: ${id}`);
    
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      throw new NotFoundError(`Task with ID ${id} not found`);
    }
    
    // Update task properties
    const updatedTask: Task = {
      ...tasks[taskIndex],
      title: taskData.title || tasks[taskIndex].title,
      description: taskData.description !== undefined ? taskData.description : tasks[taskIndex].description,
      status: taskData.status || tasks[taskIndex].status,
      updatedAt: new Date()
    };
    
    tasks[taskIndex] = updatedTask;
    
    return updatedTask;
  }
  
  /**
   * Delete a task
   */
  static async deleteTask(id: string): Promise<void> {
    logger.info(`Deleting task with ID: ${id}`);
    
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      throw new NotFoundError(`Task with ID ${id} not found`);
    }
    
    // Remove task
    tasks.splice(taskIndex, 1);
  }
}
