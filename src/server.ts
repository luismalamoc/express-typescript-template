import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createApp } from './app';
import config from './config';
import { logger } from './utils/logger';
import http from 'http';
import { configureHealthChecks } from './middlewares/health.middleware';

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
