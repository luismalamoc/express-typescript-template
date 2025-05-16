import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { errorHandler } from './middlewares/error-handler.middleware';
import config from './config';
import { logger } from './utils/logger';

// Import routes
import tasksRoutes from './modules/tasks/routes';

/**
 * Create and configure the Express application
 */
export const createApp = (): Express => {
  // Create Express app
  const app = express();

  // Configure middleware
  // Simple Helmet configuration with basic security settings
  app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for simplicity
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  }));
  app.use(morgan('dev')); // HTTP request logging
  app.use(express.json()); // Parse JSON bodies
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
  
  // Simple CORS configuration using allowedOrigins from config
  app.use(cors({
    origin: config.cors.allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    maxAge: 86400 // Cache preflight requests for 24 hours
  }));

  // Configure Swagger
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: config.app.name,
        version: config.app.version,
        description: config.app.description
      },
      servers: [
        {
          url: `http://${config.server.host}:${config.server.port}`,
          description: 'Development server'
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      }
    },
    apis: ['./src/modules/*/routes.ts']
  };
  
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Register routes
  app.use('/tasks', tasksRoutes);

  // Root route - API information
  app.get('/', (req: Request, res: Response) => {
    res.json({
      name: config.app.name,
      version: config.app.version,
      description: config.app.description,
      documentation: '/api-docs'
    });
  });

  // 404 handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      error: 'Not Found',
      message: `Route ${req.method}:${req.url} not found`,
      statusCode: 404
    });
  });

  // Error handler
  app.use(errorHandler);

  return app;
};

export default createApp;
