import { CartService } from '../services/cartService.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { addToCartSchema } from '../validators/cartValidator.js';

export class CartController {
  static async getCart(req, res, next) {
    try {
      const cart = CartService.getCart(req.sessionId);
      return ApiResponse.success(res, cart);
    } catch (err) {
      next(err);
    }
  }

  static async addToCart(req, res, next) {
    try {
      const validated = addToCartSchema.parse(req.body);
      const item = CartService.addToCart(req.sessionId, validated);
      return ApiResponse.created(res, item, 'Item added to cart');
    } catch (err) {
      next(err);
    }
  }

  static async removeFromCart(req, res, next) {
    try {
      const { cartInstanceId } = req.params;
      const result = CartService.removeFromCart(req.sessionId, cartInstanceId);
      return ApiResponse.success(res, result.cart, 'Item removed from cart');
    } catch (err) {
      next(err);
    }
  }

  static async clearCart(req, res, next) {
    try {
      const cart = CartService.clearCart(req.sessionId);
      return ApiResponse.success(res, cart, 'Cart cleared');
    } catch (err) {
      next(err);
    }
  }
}
