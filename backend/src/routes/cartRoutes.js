import { Router } from 'express';
import { CartController } from '../controllers/cartController.js';

const router = Router();

router.get('/', CartController.getCart);
router.post('/', CartController.addToCart);
router.delete('/:cartInstanceId', CartController.removeFromCart);
router.delete('/', CartController.clearCart);

export default router;
