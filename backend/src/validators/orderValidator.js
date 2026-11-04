import { z } from 'zod';
import { addToCartSchema } from './cartValidator.js';

export const checkoutOrderSchema = z.object({
  recipientEmail: z.string().email('Please enter a valid recipient email address'),
  giftNote: z.string().max(1000, 'Gift note cannot exceed 1000 characters').optional().default(''),
  paymentMethod: z.enum(['Card', 'Apple Pay', 'Google Pay'], {
    errorMap: () => ({ message: 'Payment method must be Card, Apple Pay, or Google Pay' })
  }).default('Card'),
  items: z.array(addToCartSchema).optional()
});
