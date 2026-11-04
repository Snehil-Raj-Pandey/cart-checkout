import { z } from 'zod';

export const createGiftSchema = z.object({
  id: z.string().min(2).max(100).optional(),
  title: z.string().min(2, 'Title must be at least 2 characters').max(150),
  subtitle: z.string().max(200).optional().nullable(),
  tag: z.string().max(50).optional().nullable(),
  tag_icon: z.string().max(50).optional().nullable(),
  description: z.string().min(5, 'Description must be at least 5 characters').max(1000),
  price: z.coerce.number().positive('Price must be greater than 0'),
  featured: z.boolean().or(z.number().min(0).max(1)).optional().default(false),
  action_text: z.string().max(50).optional().nullable(),
  image: z.string().min(5, 'Image URL is required'),
  category: z.string().min(2, 'Category is required')
});

export const updateGiftSchema = createGiftSchema.partial();

export const customGiftSchema = z.object({
  recipient: z.string().min(1, 'Recipient name is required').max(100),
  message: z.string().max(500, 'Message cannot exceed 500 characters').optional().default(''),
  amount: z.coerce.number().min(5, 'Minimum gift amount is $5').max(1000, 'Maximum gift amount is $1000'),
  designId: z.string().min(1, 'Design selection is required'),
  themeId: z.string().min(1, 'Theme selection is required')
});
