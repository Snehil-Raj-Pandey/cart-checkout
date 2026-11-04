import { WishlistService } from '../services/wishlistService.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class WishlistController {
  static async getWishlist(req, res, next) {
    try {
      const items = WishlistService.getWishlist(req.sessionId);
      return ApiResponse.success(res, items);
    } catch (err) {
      next(err);
    }
  }

  static async toggleWishlist(req, res, next) {
    try {
      const { giftId } = req.body;
      if (!giftId || typeof giftId !== 'string') {
        return ApiResponse.badRequest(res, 'Valid giftId is required');
      }
      const result = WishlistService.toggleWishlist(req.sessionId, giftId.trim());
      const message = result.added ? 'Saved to wishlist!' : 'Removed from wishlist.';
      return ApiResponse.success(res, result, message);
    } catch (err) {
      next(err);
    }
  }
}
