import { Router } from 'express';
import { WishlistController } from '../controllers/wishlistController.js';

const router = Router();

router.get('/', WishlistController.getWishlist);
router.post('/toggle', WishlistController.toggleWishlist);

export default router;
