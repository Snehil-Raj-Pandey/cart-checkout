import { GiftService } from '../services/giftService.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { createGiftSchema, updateGiftSchema, customGiftSchema } from '../validators/giftValidator.js';

export class GiftController {
  static async getGifts(req, res, next) {
    try {
      const { category, search, featured, limit, offset, sort } = req.query;
      const result = GiftService.getGifts({ category, search, featured, limit, offset, sort });
      return ApiResponse.success(res, result);
    } catch (err) {
      next(err);
    }
  }

  static async getGiftById(req, res, next) {
    try {
      const { id } = req.params;
      const gift = GiftService.getGiftById(id);
      if (!gift) {
        return ApiResponse.notFound(res, `Gift with ID '${id}' not found`);
      }
      return ApiResponse.success(res, gift);
    } catch (err) {
      next(err);
    }
  }

  static async createGift(req, res, next) {
    try {
      const validated = createGiftSchema.parse(req.body);
      const created = GiftService.createGift(validated);
      return ApiResponse.created(res, created, 'Gift created successfully');
    } catch (err) {
      next(err);
    }
  }

  static async updateGift(req, res, next) {
    try {
      const { id } = req.params;
      const validated = updateGiftSchema.parse(req.body);
      const updated = GiftService.updateGift(id, validated);
      if (!updated) {
        return ApiResponse.notFound(res, `Gift with ID '${id}' not found`);
      }
      return ApiResponse.success(res, updated, 'Gift updated successfully');
    } catch (err) {
      next(err);
    }
  }

  static async deleteGift(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = GiftService.deleteGift(id);
      if (!deleted) {
        return ApiResponse.notFound(res, `Gift with ID '${id}' not found`);
      }
      return ApiResponse.success(res, { id, deleted: true }, 'Gift deleted successfully');
    } catch (err) {
      next(err);
    }
  }

  static async getCustomOptions(req, res, next) {
    try {
      const options = GiftService.getCustomOptions();
      return ApiResponse.success(res, options);
    } catch (err) {
      next(err);
    }
  }

  static async createCustomGift(req, res, next) {
    try {
      const validated = customGiftSchema.parse(req.body);
      const { designs, themes } = GiftService.getCustomOptions();

      const selectedDesign = designs.find(d => d.id === validated.designId) || designs[0];
      const selectedTheme = themes.find(t => t.id === validated.themeId) || themes[0];

      const customGiftItem = {
        id: `custom-gift-${Date.now()}`,
        title: `${selectedDesign ? selectedDesign.name : 'Custom'} eGift Card for ${validated.recipient}`,
        price: validated.amount,
        description: validated.message || 'Happy gifting!',
        image: selectedDesign ? selectedDesign.image : '',
        isCustom: true,
        recipient: validated.recipient,
        message: validated.message,
        theme: selectedTheme ? selectedTheme.name : 'Soft Cozy',
        designId: validated.designId
      };

      return ApiResponse.created(res, customGiftItem, 'Custom eGift created successfully');
    } catch (err) {
      next(err);
    }
  }

  static async getHeroConfig(req, res, next) {
    try {
      const hero = GiftService.getHeroConfig();
      return ApiResponse.success(res, hero);
    } catch (err) {
      next(err);
    }
  }
}
