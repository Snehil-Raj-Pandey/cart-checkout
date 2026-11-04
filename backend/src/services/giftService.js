import { getDb } from '../config/database.js';

export class GiftService {
  static getGifts({ category, search, featured, limit = 50, offset = 0, sort = 'default' }) {
    const db = getDb();
    const conditions = [];
    const params = [];

    if (category && category !== 'all') {
      conditions.push('category = ?');
      params.push(category);
    }

    if (search && search.trim() !== '') {
      conditions.push('(LOWER(title) LIKE ? OR LOWER(description) LIKE ?)');
      const searchPattern = `%${search.trim().toLowerCase()}%`;
      params.push(searchPattern, searchPattern);
    }

    if (featured !== undefined && featured !== null && featured !== '') {
      conditions.push('featured = ?');
      params.push(featured === 'true' || featured === true || featured === 1 ? 1 : 0);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    let orderBy = 'ORDER BY featured DESC, created_at DESC';
    if (sort === 'price_asc') {
      orderBy = 'ORDER BY price ASC';
    } else if (sort === 'price_desc') {
      orderBy = 'ORDER BY price DESC';
    } else if (sort === 'title') {
      orderBy = 'ORDER BY title ASC';
    }

    // Total count query
    const countSql = `SELECT COUNT(*) as total FROM gifts ${whereClause}`;
    const totalResult = db.prepare(countSql).get(...params);
    const total = totalResult ? totalResult.total : 0;

    // Items query
    const sql = `
      SELECT id, title, subtitle, tag, tag_icon as tagIcon, description, price, featured, action_text as actionText, image, category
      FROM gifts
      ${whereClause}
      ${orderBy}
      LIMIT ? OFFSET ?
    `;

    const items = db.prepare(sql).all(...params, Number(limit), Number(offset));

    const formattedItems = items.map(item => ({
      ...item,
      featured: Boolean(item.featured),
      price: Number(item.price)
    }));

    return {
      items: formattedItems,
      total,
      limit: Number(limit),
      offset: Number(offset)
    };
  }

  static getGiftById(id) {
    const db = getDb();
    const sql = `
      SELECT id, title, subtitle, tag, tag_icon as tagIcon, description, price, featured, action_text as actionText, image, category
      FROM gifts
      WHERE id = ?
    `;
    const item = db.prepare(sql).get(id);
    if (!item) return null;

    return {
      ...item,
      featured: Boolean(item.featured),
      price: Number(item.price)
    };
  }

  static createGift(data) {
    const db = getDb();
    const id = data.id || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36);
    const featured = data.featured ? 1 : 0;

    const sql = `
      INSERT INTO gifts (id, title, subtitle, tag, tag_icon, description, price, featured, action_text, image, category)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.prepare(sql).run(
      id,
      data.title,
      data.subtitle || null,
      data.tag || null,
      data.tag_icon || null,
      data.description,
      data.price,
      featured,
      data.action_text || null,
      data.image,
      data.category
    );

    return this.getGiftById(id);
  }

  static updateGift(id, data) {
    const db = getDb();
    const existing = this.getGiftById(id);
    if (!existing) return null;

    const updates = [];
    const params = [];

    if (data.title !== undefined) { updates.push('title = ?'); params.push(data.title); }
    if (data.subtitle !== undefined) { updates.push('subtitle = ?'); params.push(data.subtitle); }
    if (data.tag !== undefined) { updates.push('tag = ?'); params.push(data.tag); }
    if (data.tag_icon !== undefined) { updates.push('tag_icon = ?'); params.push(data.tag_icon); }
    if (data.description !== undefined) { updates.push('description = ?'); params.push(data.description); }
    if (data.price !== undefined) { updates.push('price = ?'); params.push(data.price); }
    if (data.featured !== undefined) { updates.push('featured = ?'); params.push(data.featured ? 1 : 0); }
    if (data.action_text !== undefined) { updates.push('action_text = ?'); params.push(data.action_text); }
    if (data.image !== undefined) { updates.push('image = ?'); params.push(data.image); }
    if (data.category !== undefined) { updates.push('category = ?'); params.push(data.category); }

    if (updates.length === 0) return existing;

    updates.push("updated_at = datetime('now')");
    params.push(id);

    const sql = `UPDATE gifts SET ${updates.join(', ')} WHERE id = ?`;
    db.prepare(sql).run(...params);

    return this.getGiftById(id);
  }

  static deleteGift(id) {
    const db = getDb();
    const result = db.prepare('DELETE FROM gifts WHERE id = ?').run(id);
    return result.changes > 0;
  }

  static getCustomOptions() {
    const db = getDb();
    const designs = db.prepare('SELECT id, name, image, thumb, alt FROM card_designs ORDER BY sort_order ASC').all();
    const themes = db.prepare('SELECT id, name, gradient_class as gradientClass, border_color as borderColor, bg_card as bgCard FROM card_themes ORDER BY sort_order ASC').all();
    return { designs, themes };
  }

  static getHeroConfig() {
    const db = getDb();
    const row = db.prepare('SELECT value FROM site_config WHERE key = ?').get('hero');
    if (!row) return null;
    try {
      return JSON.parse(row.value);
    } catch {
      return null;
    }
  }
}
