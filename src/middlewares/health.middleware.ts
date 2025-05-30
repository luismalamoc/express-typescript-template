import { Express } from 'express';
import { createTerminus } from '@godaddy/terminus';
import { Server } from 'http';
import { logger } from '../config/logger';

/**
 * Configure health checks for the application
 * @param app Express application
 * @param server HTTP server
 */
export const configureHealthChecks = (app: Express, server: Server): void => {
  // Health check function
  const healthCheck = async () => {
    // Add your health checks here (database, cache, etc.)
    // For example:
    // await checkDatabaseConnection();
    // await checkRedisConnection();
    
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: Date.now()
    };
  };

  // Configure terminus
  createTerminus(server, {
    signal: 'SIGINT',
    healthChecks: {
      '/health': healthCheck,
      '/healthz': healthCheck,
    },
    onSignal: async () => {
      logger.info('Server is shutting down...');
      
      // Cleanup logic here (close database connections, etc.)
      // For example:
      // await closeDatabase();
      // await closeRedisConnection();
      
      logger.info('Cleanup completed, server is shutting down');
    },
    onShutdown: async () => {
      logger.info('Server has been shut down');
    },
    logger: (msg, err) => {
      if (err) {
        logger.error(msg, err);
      } else {
        logger.info(msg);
      }
    },
  });
};
