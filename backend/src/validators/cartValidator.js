import { z } from 'zod';

export const addToCartSchema = z.object({
  id: z.string().optional(),
  giftId: z.string().optional().nullable(),
  title: z.string().min(1, 'Title is required'),
  price: z.coerce.number().min(0, 'Price must be non-negative'),
  description: z.string().optional().default(''),
  image: z.string().optional().default(''),
  isCustom: z.boolean().optional().default(false),
  recipient: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  theme: z.string().optional().nullable(),
  designId: z.string().optional().nullable(),
  cartInstanceId: z.string().optional()
});

export const updateCartItemSchema = z.object({
  quantity: z.coerce.number().int().min(1).optional()
});

