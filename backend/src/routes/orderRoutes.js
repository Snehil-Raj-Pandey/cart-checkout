import { Router } from 'express';
import { OrderController } from '../controllers/orderController.js';

const router = Router();

router.post('/checkout', OrderController.checkout);
router.post('/', OrderController.checkout);
router.get('/:id', OrderController.getOrderById);
router.get('/', OrderController.getOrders);

export default router;
