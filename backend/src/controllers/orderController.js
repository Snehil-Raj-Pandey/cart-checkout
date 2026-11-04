import { OrderService } from '../services/orderService.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { checkoutOrderSchema } from '../validators/orderValidator.js';

export class OrderController {
  static async checkout(req, res, next) {
    try {
      const validated = checkoutOrderSchema.parse(req.body);
      const order = OrderService.createOrder(req.sessionId, validated);
      return ApiResponse.created(res, order, 'Gift order placed successfully! Confirmation receipt generated.');
    } catch (err) {
      if (err.message && err.message.includes('empty cart')) {
        return ApiResponse.badRequest(res, err.message);
      }
      next(err);
    }
  }

  static async getOrderById(req, res, next) {
    try {
      const { id } = req.params;
      const order = OrderService.getOrderById(id);
      if (!order) {
        return ApiResponse.notFound(res, `Order '${id}' not found`);
      }
      return ApiResponse.success(res, order);
    } catch (err) {
      next(err);
    }
  }

  static async getOrders(req, res, next) {
    try {
      const { limit, offset } = req.query;
      const orders = OrderService.getOrders(limit, offset);
      return ApiResponse.success(res, orders);
    } catch (err) {
      next(err);
    }
  }
}
