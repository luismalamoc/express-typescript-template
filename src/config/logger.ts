import winston from 'winston';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define log level based on environment
const level = () => {
  return process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug');
};

// Define console format for logs
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.errors({ stack: true }),
  winston.format.colorize(),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}${info.stack ? '\n' + info.stack : ''}`
  )
);

// Create the logger with console transport only
export const logger = winston.createLogger({
  level: level(),
  levels,
  defaultMeta: { service: 'express-typescript-template' },
  transports: [
    // Console transport with better formatting
    new winston.transports.Console({
      format: consoleFormat
    })
  ],
  exitOnError: false,
});

export default logger;
