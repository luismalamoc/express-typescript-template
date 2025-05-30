import { Repository } from 'typeorm';
import { dataSource } from '../config';
import { Task } from '../entities/Task';
import { NotFoundError } from '../utils/errors';
import { logger } from '../config/logger';
import { CreateTaskDto, UpdateTaskDto, TaskResponseDto, TaskListResponseDto, TaskStatus } from '../types/task.types';
import { TaskCreateInput, TaskUpdateInput } from '../schemas/task.schema';

/**
 * Service for task operations using TypeORM
 */
export class TaskService {
  private static taskRepository: Repository<Task> = dataSource.getRepository(Task);

  /**
   * Get all tasks
   */
  static async getAllTasks(): Promise<TaskListResponseDto> {
    logger.info('Getting all tasks');
    
    const tasks = await this.taskRepository.find({
      order: {
        createdAt: 'DESC'
      }
    });
    
    return {
      tasks: tasks.map(task => this.mapTaskToResponseDto(task)),
      count: tasks.length
    };
  }
  
  /**
   * Get a task by ID
   */
  static async getTaskById(id: string): Promise<TaskResponseDto> {
    logger.info(`Getting task with ID: ${id}`);
    
    const task = await this.taskRepository.findOne({ where: { id } });
    
    if (!task) {
      throw new NotFoundError(`Task with ID ${id} not found`);
    }
    
    return this.mapTaskToResponseDto(task);
  }
  
  /**
   * Create a new task
   */
  static async createTask(taskData: TaskCreateInput, userId: string): Promise<TaskResponseDto> {
    logger.info(`Creating new task: ${taskData.title}`);
    
    const taskDto: CreateTaskDto = {
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
      userId: taskData.userId || userId
    };
    
    const newTask = this.taskRepository.create(taskDto);
    const savedTask = await this.taskRepository.save(newTask);
    
    return this.mapTaskToResponseDto(savedTask);
  }
  
  /**
   * Update an existing task
   */
  static async updateTask(id: string, taskData: TaskUpdateInput): Promise<TaskResponseDto> {
    logger.info(`Updating task with ID: ${id}`);
    
    // Get the task entity directly from repository
    const taskEntity = await this.taskRepository.findOne({ where: { id } });
    
    if (!taskEntity) {
      throw new NotFoundError(`Task with ID ${id} not found`);
    }
    
    // Create update DTO
    const updateDto: UpdateTaskDto = {};
    
    // Only include properties that are defined
    if (taskData.title !== undefined) updateDto.title = taskData.title;
    if (taskData.description !== undefined) updateDto.description = taskData.description;
    if (taskData.status !== undefined) updateDto.status = taskData.status;
    
    // Update task with DTO
    Object.assign(taskEntity, updateDto);
    
    const updatedTask = await this.taskRepository.save(taskEntity);
    return this.mapTaskToResponseDto(updatedTask);
  }
  
  /**
   * Delete a task
   */
  static async deleteTask(id: string): Promise<void> {
    logger.info(`Deleting task with ID: ${id}`);
    
    // Get the task entity directly from repository
    const taskEntity = await this.taskRepository.findOne({ where: { id } });
    
    if (!taskEntity) {
      throw new NotFoundError(`Task with ID ${id} not found`);
    }
    
    await this.taskRepository.remove(taskEntity);
  }
  
  /**
   * Maps a Task entity to a TaskResponseDto
   * This prevents exposing the entity directly to the API
   */
  private static mapTaskToResponseDto(task: Task): TaskResponseDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    };
  }
}
