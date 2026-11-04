import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env.js';
import { requestLogger } from './middleware/requestLogger.js';
import { sessionHandler } from './middleware/sessionHandler.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import apiRouter from './routes/index.js';

export function createApp() {
  const app = express();

  // Security Headers
  app.use(helmet({
    contentSecurityPolicy: false // Keep permissive for embedded assets/fonts in dev
  }));

  // CORS Configuration
  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      const allowAll = config.corsOrigins.includes('*');
      const isExplicitlyAllowed = config.corsOrigins.includes(origin);
      const isVercel = origin.endsWith('.vercel.app');
      const isLocalhost = origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:');

      if (allowAll || isExplicitlyAllowed || isVercel || (!config.isProduction && isLocalhost)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-session-id']
  }));

  // Body Parsing
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // Custom Request Logger
  app.use(requestLogger);

  // Session / Guest ID Management
  app.use(sessionHandler);

  // API Root Welcome & Version
  app.get('/', (req, res) => {
    res.json({
      name: 'Digital Gift Paradise API',
      version: '1.0.0',
      description: 'Production-ready Express & SQLite REST backend',
      endpoints: {
        health: '/api/health',
        gifts: '/api/gifts',
        categories: '/api/categories',
        cart: '/api/cart',
        wishlist: '/api/wishlist',
        orders: '/api/orders',
        customOptions: '/api/gifts/custom-options'
      }
    });
  });

  // Mount API Endpoints
  app.use('/api', apiRouter);

  // 404 and Global Error Handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

export default createApp;
