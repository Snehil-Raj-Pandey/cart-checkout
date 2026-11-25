import { createApp } from './app.js';
import { config } from './config/env.js';
import { initDatabase, closeDatabase, getDb } from './config/database.js';
import { seedDatabase } from './db/seed.js';
import { logger } from './utils/logger.js';

async function startServer() {
  try {
    // 1. Initialize SQLite Database & Ensure Tables
    initDatabase();
    logger.info(`SQLite Database connected at: ${config.dbPath}`);

    // 2. Check if database needs initial seeding
    const db = getDb();
    const giftCount = db.prepare('SELECT COUNT(*) as count FROM gifts').get();
    if (giftCount.count === 0) {
      logger.info('Database empty. Running initial catalog seed...');
      seedDatabase(db);
      logger.info('Database initial seed complete.');
    }

    // 3. Create and start Express server
    const app = createApp();
    const server = app.listen(config.port, config.host, () => {
      logger.info(`Digital Gift Paradise Backend running at http://${config.host}:${config.port}`);
      logger.info(`Health check: http://${config.host}:${config.port}/api/health`);
      logger.info(`API docs & root: http://${config.host}:${config.port}/`);
    });

    // 4. Graceful Shutdown
    function handleShutdown(signal) {
      logger.info(`Received ${signal}. Shutting down gracefully...`);
      server.close(() => {
        logger.info('HTTP server closed.');
        closeDatabase();
        logger.info('Database connection closed.');
        process.exit(0);
      });

      // Force shutdown after timeout
      setTimeout(() => {
        logger.error('Forced shutdown due to timeout.');
        process.exit(1);
      }, 5000);
    }

    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));

    return server;
  } catch (err) {
    logger.error('Failed to start server:', { message: err.message, stack: err.stack });
    process.exit(1);
  }
}

startServer();
