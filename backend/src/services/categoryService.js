import { getDb } from '../config/database.js';

export class CategoryService {
  static getQuickCategories() {
    const db = getDb();
    const rows = db.prepare(`
      SELECT id, name, icon, bg_class as bg, border_class as border, text_class as text
      FROM categories
      WHERE type = 'quick'
      ORDER BY sort_order ASC
    `).all();
    return rows;
  }

  static getVibeCategories() {
    const db = getDb();
    const rows = db.prepare(`
      SELECT id, name, title, description, icon, bg_class as bgClass, border_class as borderClass, text_class as textClass, button_bg as buttonBg
      FROM categories
      WHERE type = 'vibe'
      ORDER BY sort_order ASC
    `).all();
    return rows;
  }

  static getAllCategories() {
    return {
      quick: this.getQuickCategories(),
      vibes: this.getVibeCategories()
    };
  }
}
