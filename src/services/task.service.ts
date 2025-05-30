import { Repository } from 'typeorm';
import { dataSource } from '../config';
import { Task } from '../entities/Task';
import { NotFoundError } from '../utils/errors';
import { logger } from '../config/logger';
import { CreateTaskDto, UpdateTaskDto } from '../types/task.types';
import { TaskCreateInput, TaskUpdateInput } from '../schemas/task.schema';

/**
 * Service for task operations using TypeORM
 */
export class TaskService {
  private static taskRepository: Repository<Task> = dataSource.getRepository(Task);

  /**
   * Get all tasks
   */
  static async getAllTasks(): Promise<Task[]> {
    logger.info('Getting all tasks');
    
    return this.taskRepository.find({
      order: {
        createdAt: 'DESC'
      }
    });
  }
  
  /**
   * Get a task by ID
   */
  static async getTaskById(id: string): Promise<Task> {
    logger.info(`Getting task with ID: ${id}`);
    
    const task = await this.taskRepository.findOne({ where: { id } });
    
    if (!task) {
      throw new NotFoundError(`Task with ID ${id} not found`);
    }
    
    return task;
  }
  
  /**
   * Create a new task
   */
  static async createTask(taskData: TaskCreateInput, userId: string): Promise<Task> {
    logger.info(`Creating new task: ${taskData.title}`);
    
    const taskDto: CreateTaskDto = {
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
      userId: taskData.userId || userId
    };
    
    const newTask = this.taskRepository.create(taskDto);
    
    return this.taskRepository.save(newTask);
  }
  
  /**
   * Update an existing task
   */
  static async updateTask(id: string, taskData: TaskUpdateInput): Promise<Task> {
    logger.info(`Updating task with ID: ${id}`);
    
    const task = await this.getTaskById(id);
    
    // Create update DTO
    const updateDto: UpdateTaskDto = {};
    
    // Only include properties that are defined
    if (taskData.title !== undefined) updateDto.title = taskData.title;
    if (taskData.description !== undefined) updateDto.description = taskData.description;
    if (taskData.status !== undefined) updateDto.status = taskData.status;
    
    // Update task with DTO
    Object.assign(task, updateDto);
    
    return this.taskRepository.save(task);
  }
  
  /**
   * Delete a task
   */
  static async deleteTask(id: string): Promise<void> {
    logger.info(`Deleting task with ID: ${id}`);
    
    const task = await this.getTaskById(id);
    
    await this.taskRepository.remove(task);
  }
}
