import { Router } from 'express';
import { ApiResponse } from '../utils/apiResponse.js';
import { getDb } from '../config/database.js';
import { GiftController } from '../controllers/giftController.js';

import giftRoutes from './giftRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import cartRoutes from './cartRoutes.js';
import wishlistRoutes from './wishlistRoutes.js';
import orderRoutes from './orderRoutes.js';

const apiRouter = Router();

// Health Check Endpoint
apiRouter.get('/health', (req, res) => {
  try {
    const db = getDb();
    const testQuery = db.prepare('SELECT 1 as alive').get();

    return ApiResponse.success(res, {
      status: 'UP',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: testQuery && testQuery.alive === 1 ? 'connected' : 'error'
    }, 'Digital Gift Paradise API is healthy and operational');
  } catch (err) {
    return ApiResponse.error(res, 'Health check failed: ' + err.message, 500);
  }
});

// Site Hero Banner
apiRouter.get('/config/hero', GiftController.getHeroConfig);

// Mount feature routers
apiRouter.use('/gifts', giftRoutes);
apiRouter.use('/categories', categoryRoutes);
apiRouter.use('/cart', cartRoutes);
apiRouter.use('/wishlist', wishlistRoutes);
apiRouter.use('/orders', orderRoutes);

export default apiRouter;
