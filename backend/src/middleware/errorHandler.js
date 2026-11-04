import { ZodError } from 'zod';
import { ApiResponse } from '../utils/apiResponse.js';
import { logger } from '../utils/logger.js';
import { config } from '../config/env.js';

export function notFoundHandler(req, res) {
  return ApiResponse.notFound(res, `Route not found: ${req.method} ${req.originalUrl}`);
}

export function errorHandler(err, req, res, next) {
  // If headers already sent, delegate to Express
  if (res.headersSent) {
    return next(err);
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message
    }));
    return ApiResponse.badRequest(res, 'Validation error', formattedErrors);
  }

  // Handle JSON parse errors from express.json()
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return ApiResponse.badRequest(res, 'Invalid JSON body payload');
  }

  // Log error
  logger.error(`Unhandled error at ${req.method} ${req.originalUrl}:`, {
    message: err.message,
    stack: config.isProduction ? undefined : err.stack
  });

  const message = config.isProduction
    ? 'Internal server error'
    : err.message || 'Internal server error';

  const details = config.isProduction ? null : err.stack;

  return ApiResponse.error(res, message, err.statusCode || 500, details);
}
