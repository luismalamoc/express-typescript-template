/**
 * Task status enum
 */
export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed'
}

/**
 * Task interface - represents a task entity
 */
export interface ITask {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Task creation DTO (Data Transfer Object)
 */
export interface CreateTaskDto {
  title: string;
  description?: string;
  status?: TaskStatus;
  userId?: string;
}

/**
 * Task update DTO (Data Transfer Object)
 */
export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

/**
 * Task response DTO (Data Transfer Object)
 */
export interface TaskResponseDto {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Task list response DTO (Data Transfer Object)
 */
export interface TaskListResponseDto {
  tasks: TaskResponseDto[];
  count: number;
}
