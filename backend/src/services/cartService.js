import { getDb } from '../config/database.js';

export class CartService {
  static getCart(sessionId) {
    const db = getDb();
    const sql = `
      SELECT cart_instance_id as cartInstanceId, gift_id as id, title, price, description, image,
             is_custom as isCustom, recipient, message, theme, design_id as designId, created_at as createdAt
      FROM cart_items
      WHERE session_id = ?
      ORDER BY created_at ASC
    `;
    const rows = db.prepare(sql).all(sessionId);

    const items = rows.map(r => ({
      ...r,
      isCustom: Boolean(r.isCustom),
      price: Number(r.price)
    }));

    const total = items.reduce((acc, item) => acc + item.price, 0);

    return {
      items,
      count: items.length,
      total: Number(total.toFixed(2))
    };
  }

  static addToCart(sessionId, data) {
    const db = getDb();
    const cartInstanceId = data.cartInstanceId || `${data.id || 'item'}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const giftId = data.giftId || data.id || null;
    const isCustom = data.isCustom ? 1 : 0;

    const sql = `
      INSERT INTO cart_items (cart_instance_id, session_id, gift_id, title, price, description, image, is_custom, recipient, message, theme, design_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.prepare(sql).run(
      cartInstanceId,
      sessionId,
      giftId,
      data.title,
      Number(data.price),
      data.description || null,
      data.image || null,
      isCustom,
      data.recipient || null,
      data.message || null,
      data.theme || null,
      data.designId || null
    );

    return this.getCartItem(cartInstanceId);
  }

  static getCartItem(cartInstanceId) {
    const db = getDb();
    const sql = `
      SELECT cart_instance_id as cartInstanceId, gift_id as id, title, price, description, image,
             is_custom as isCustom, recipient, message, theme, design_id as designId, created_at as createdAt
      FROM cart_items
      WHERE cart_instance_id = ?
    `;
    const r = db.prepare(sql).get(cartInstanceId);
    if (!r) return null;
    return {
      ...r,
      isCustom: Boolean(r.isCustom),
      price: Number(r.price)
    };
  }

  static removeFromCart(sessionId, cartInstanceId) {
    const db = getDb();
    // Allow matching either cart_instance_id or gift_id
    const sql = `
      DELETE FROM cart_items
      WHERE session_id = ? AND (cart_instance_id = ? OR gift_id = ?)
    `;
    const result = db.prepare(sql).run(sessionId, cartInstanceId, cartInstanceId);
    return {
      removed: result.changes > 0,
      cart: this.getCart(sessionId)
    };
  }

  static clearCart(sessionId) {
    const db = getDb();
    const sql = 'DELETE FROM cart_items WHERE session_id = ?';
    db.prepare(sql).run(sessionId);
    return {
      items: [],
      count: 0,
      total: 0
    };
  }
}
