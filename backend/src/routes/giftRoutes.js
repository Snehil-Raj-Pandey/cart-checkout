import { Router } from 'express';
import { GiftController } from '../controllers/giftController.js';

const router = Router();

// Custom options must be defined before /:id param route
router.get('/custom-options', GiftController.getCustomOptions);
router.post('/custom-gifts', GiftController.createCustomGift);

router.get('/', GiftController.getGifts);
router.get('/:id', GiftController.getGiftById);
router.post('/', GiftController.createGift);
router.put('/:id', GiftController.updateGift);
router.delete('/:id', GiftController.deleteGift);

export default router;
