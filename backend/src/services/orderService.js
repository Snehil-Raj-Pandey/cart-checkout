import crypto from 'node:crypto';
import { getDb } from '../config/database.js';
import { CartService } from './cartService.js';

export class OrderService {
  static createOrder(sessionId, { recipientEmail, giftNote = '', paymentMethod = 'Card', items = null }) {
    const db = getDb();

    // If explicit items provided, use them; otherwise pull from session cart
    let orderItems = items;
    if (!orderItems || orderItems.length === 0) {
      const cart = CartService.getCart(sessionId);
      orderItems = cart.items;
    }

    if (!orderItems || orderItems.length === 0) {
      throw new Error('Cannot checkout with an empty cart.');
    }

    const totalAmount = orderItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);

    const now = new Date();
    const datePrefix = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
    const orderId = `GIFT-${datePrefix}-${randomSuffix}`;

    // Execute within transaction
    db.exec('BEGIN TRANSACTION;');
    try {
      // 1. Insert order record
      const orderSql = `
        INSERT INTO orders (id, session_id, recipient_email, gift_note, payment_method, total_amount, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      db.prepare(orderSql).run(
        orderId,
        sessionId,
        recipientEmail,
        giftNote || null,
        paymentMethod,
        Number(totalAmount.toFixed(2)),
        'completed'
      );

      // 2. Insert order items
      const itemSql = `
        INSERT INTO order_items (order_id, gift_id, title, price, is_custom, recipient, message, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const insertItemStmt = db.prepare(itemSql);

      for (const item of orderItems) {
        insertItemStmt.run(
          orderId,
          item.giftId || item.id || null,
          item.title,
          Number(item.price),
          item.isCustom ? 1 : 0,
          item.recipient || null,
          item.message || null,
          item.image || null
        );
      }

      // 3. Clear cart after successful order
      CartService.clearCart(sessionId);

      db.exec('COMMIT;');
    } catch (err) {
      db.exec('ROLLBACK;');
      throw err;
    }

    return this.getOrderById(orderId);
  }

  static getOrderById(orderId) {
    const db = getDb();
    const orderSql = `
      SELECT id, session_id as sessionId, recipient_email as recipientEmail, gift_note as giftNote,
             payment_method as paymentMethod, total_amount as totalAmount, status, created_at as createdAt
      FROM orders
      WHERE id = ?
    `;
    const order = db.prepare(orderSql).get(orderId);
    if (!order) return null;

    const itemsSql = `
      SELECT id, gift_id as giftId, title, price, is_custom as isCustom, recipient, message, image, created_at as createdAt
      FROM order_items
      WHERE order_id = ?
    `;
    const items = db.prepare(itemsSql).all(orderId);

    return {
      ...order,
      totalAmount: Number(order.totalAmount),
      items: items.map(it => ({
        ...it,
        isCustom: Boolean(it.isCustom),
        price: Number(it.price)
      }))
    };
  }

  static getOrders(limit = 20, offset = 0) {
    const db = getDb();
    const ordersSql = `
      SELECT id, session_id as sessionId, recipient_email as recipientEmail, gift_note as giftNote,
             payment_method as paymentMethod, total_amount as totalAmount, status, created_at as createdAt
      FROM orders
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    const rows = db.prepare(ordersSql).all(Number(limit), Number(offset));

    return rows.map(order => ({
      ...order,
      totalAmount: Number(order.totalAmount)
    }));
  }
}
