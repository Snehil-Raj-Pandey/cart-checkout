import { getDb } from '../config/database.js';

export class WishlistService {
  static getWishlist(sessionId) {
    const db = getDb();
    const rows = db.prepare('SELECT gift_id as giftId FROM wishlist_items WHERE session_id = ?').all(sessionId);
    return rows.map(r => r.giftId);
  }

  static toggleWishlist(sessionId, giftId) {
    const db = getDb();
    const existing = db.prepare('SELECT id FROM wishlist_items WHERE session_id = ? AND gift_id = ?').get(sessionId, giftId);

    let added = false;
    if (existing) {
      db.prepare('DELETE FROM wishlist_items WHERE id = ?').run(existing.id);
      added = false;
    } else {
      db.prepare('INSERT OR IGNORE INTO wishlist_items (session_id, gift_id) VALUES (?, ?)').run(sessionId, giftId);
      added = true;
    }

    const wishlist = this.getWishlist(sessionId);
    return {
      added,
      wishlist
    };
  }
}
