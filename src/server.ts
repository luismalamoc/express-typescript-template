import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import http from 'http';
import { createApp } from './app';
import config, { logger, dataSource } from './config';
import { initializeDataSource } from './config/typeorm.config';
import { configureHealthChecks } from './middlewares/health.middleware';

/**
 * Start the server after initializing necessary services
 */
async function startServer() {
  try {
    // Initialize database connection
    logger.info('Initializing database connection...');
    await initializeDataSource();
    
    // Create Express app
    const app = createApp();
    
    // Create HTTP server
    const server = http.createServer(app);
    
    // Configure health checks
    configureHealthChecks(app, server);
    
    // Start server
    server.listen(config.server.port, () => {
      logger.info(`Server running at http://${config.server.host}:${config.server.port}`);
      logger.info(`Environment: ${config.server.env}`);
      logger.info(`Debug mode: ${config.server.debug ? 'enabled' : 'disabled'}`);
      logger.info(`API Documentation: http://${config.server.host}:${config.server.port}/api-docs`);
    });
    
    // Handle server shutdown
    process.on('SIGTERM', () => gracefulShutdown(server));
    process.on('SIGINT', () => gracefulShutdown(server));
    
  } catch (error: any) {
    logger.error(`Failed to start server: ${error.message}`, { error });
    process.exit(1);
  }
}

/**
 * Gracefully shutdown the server
 */
async function gracefulShutdown(server: http.Server) {
  logger.info('Received shutdown signal, closing connections...');
  
  try {
    // Close server to stop accepting new connections
    server.close(() => {
      logger.info('HTTP server closed');
      
      // Close database connection
      if (dataSource.isInitialized) {
        dataSource.destroy().then(() => {
          logger.info('Database connection closed');
          process.exit(0);
        }).catch((err) => {
          logger.error(`Error closing database connection: ${err.message}`);
          process.exit(1);
        });
      } else {
        logger.info('No database connection to close');
        process.exit(0);
      }
    });
    
    // Force close if graceful shutdown takes too long
    setTimeout(() => {
      logger.error('Forcing server shutdown after timeout');
      process.exit(1);
    }, 10000); // 10 seconds timeout
    
  } catch (error: any) {
    logger.error(`Error during shutdown: ${error.message}`);
    process.exit(1);
  }
}

// Start the server
startServer();
