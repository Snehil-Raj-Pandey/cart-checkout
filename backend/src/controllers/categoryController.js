import { CategoryService } from '../services/categoryService.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class CategoryController {
  static async getCategories(req, res, next) {
    try {
      const { type } = req.query;
      if (type === 'quick') {
        const quick = CategoryService.getQuickCategories();
        return ApiResponse.success(res, quick);
      }
      if (type === 'vibe') {
        const vibes = CategoryService.getVibeCategories();
        return ApiResponse.success(res, vibes);
      }
      const all = CategoryService.getAllCategories();
      return ApiResponse.success(res, all);
    } catch (err) {
      next(err);
    }
  }
}
