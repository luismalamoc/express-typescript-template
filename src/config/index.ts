import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

const config = {
  app: {
    name: 'express-typescript-template',
    version: '1.0.0',
    description: 'Express TypeScript API Template with Modular Architecture'
  },
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    host: process.env.HOST || '0.0.0.0',
    debug: process.env.DEBUG === 'true',
    env: process.env.NODE_ENV || 'development'
  },
  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS ? 
      process.env.ALLOWED_ORIGINS.split(',') : 
      ['*']
  },
  files: {
    uploadDir: path.join(process.cwd(), 'uploads'),
    tmpDir: path.join(process.cwd(), 'tmp'),
    maxUploadSize: 5 * 1024 * 1024 // 5MB
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  }
};

export default config;
