import { Router } from 'express';
import { 
  getAllTasksHandler, 
  getTaskByIdHandler, 
  createTaskHandler,
  updateTaskHandler,
  deleteTaskHandler
} from '../controllers/task.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validateCreateTask, validateUpdateTask } from '../schemas/task.schema';

// Create router
const router = Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieves all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *       500:
 *         description: Server error
 */
// Authentication middleware commented out for template project
router.get('/', /* authenticate, */ getAllTasksHandler);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     description: Retrieves a specific task by its ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
// Authentication middleware commented out for template project
router.get('/:id', /* authenticate, */ getTaskByIdHandler);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
// Authentication middleware commented out for template project
router.post('/', /* authenticate, */ validateCreateTask, createTaskHandler);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Updates an existing task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
// Authentication middleware commented out for template project
router.put('/:id', /* authenticate, */ validateUpdateTask, updateTaskHandler);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Deletes an existing task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
// Authentication middleware commented out for template project
router.delete('/:id', /* authenticate, */ deleteTaskHandler);

export default router;
