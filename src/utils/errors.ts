/**
 * Base class for custom API errors
 */
export class ApiError extends Error {
  statusCode: number;
  
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error for bad requests (400)
 */
export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(400, message);
  }
}

/**
 * Error for unauthorized requests (401)
 */
export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(401, message);
  }
}

/**
 * Error for forbidden requests (403)
 */
export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden') {
    super(403, message);
  }
}

/**
 * Error for not found resources (404)
 */
export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found') {
    super(404, message);
  }
}

/**
 * Error for server errors (500)
 */
export class ServerError extends ApiError {
  constructor(message: string = 'Internal server error') {
    super(500, message);
  }
}

/**
 * Error for external service errors
 */
export class ExternalServiceError extends ApiError {
  serviceName: string;
  
  constructor(serviceName: string, message: string) {
    super(500, `${serviceName} service error: ${message}`);
    this.serviceName = serviceName;
  }
}
