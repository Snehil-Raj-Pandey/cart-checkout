import { logger } from '../utils/logger.js';

export function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, originalUrl } = req;
    const { statusCode } = res;

    const logMethod = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';
    logger[logMethod](`${method} ${originalUrl} - ${statusCode} [${duration}ms]`);
  });

  next();
}
