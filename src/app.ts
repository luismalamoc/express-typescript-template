import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { errorHandler } from './middlewares/error-handler.middleware';
import { apiRateLimiter } from './middlewares/rate-limit.middleware';
import config, { logger } from './config';

// Import routes
import taskRoutes from './routes/task.routes';

/**
 * Create and configure the Express application
 */
export const createApp = (): Express => {
  // Create Express app
  const app = express();

  // Configure middleware
  // Enhanced Helmet configuration with improved security settings
  /* app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Needed for Swagger UI
        styleSrc: ["'self'", "'unsafe-inline'"], // Needed for Swagger UI
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'", ...config.cors.allowedOrigins],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: { policy: 'credentialless' },
    crossOriginResourcePolicy: { policy: 'same-site' },
    crossOriginOpenerPolicy: { policy: 'same-origin' },
    xssFilter: true,
    hsts: {
      maxAge: 31536000, // 1 year in seconds
      includeSubDomains: true,
      preload: true
    },
    noSniff: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
  })); */
  app.use(morgan('dev')); // HTTP request logging
  app.use(express.json()); // Parse JSON bodies
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
  
  // Apply general rate limiting to all routes
  app.use(apiRateLimiter);
  
  // CORS configuration using allowedOrigins from config
  // Commented out to fix Swagger UI fetch issues
  // Original configuration:
  /*
  app.use(cors({
    origin: config.cors.allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    maxAge: 86400 // Cache preflight requests for 24 hours
  }));
  */
  

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
          url: `http://localhost:${config.server.port}`,
          description: 'Development server'
        },
        {
          url: `http://${config.server.host}:${config.server.port}`,
          description: 'Alternative server'
        }
      ],
      // Security schemes commented out for template project
      components: {
        // securitySchemes: {
        //   bearerAuth: {
        //     type: 'http',
        //     scheme: 'bearer',
        //     bearerFormat: 'JWT'
        //   }
        // }
      }
    },
    apis: ['./src/routes/*.routes.ts']
  };
  
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Register routes
  app.use('/tasks', taskRoutes);

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
