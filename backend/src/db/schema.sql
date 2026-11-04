-- Digital Gift Paradise Database Schema

PRAGMA foreign_keys = ON;

-- Site Configuration Table
CREATE TABLE IF NOT EXISTS site_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Categories Table (Quick & Vibe)
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK(type IN ('quick', 'vibe')),
  name TEXT NOT NULL,
  title TEXT,
  description TEXT,
  icon TEXT NOT NULL,
  bg_class TEXT,
  border_class TEXT,
  text_class TEXT,
  button_bg TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Catalog Gifts Table
CREATE TABLE IF NOT EXISTS gifts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  tag TEXT,
  tag_icon TEXT,
  description TEXT NOT NULL,
  price REAL NOT NULL CHECK(price >= 0),
  featured INTEGER DEFAULT 0 CHECK(featured IN (0, 1)),
  action_text TEXT,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_gifts_category ON gifts(category);
CREATE INDEX IF NOT EXISTS idx_gifts_featured ON gifts(featured);

-- Card Designs for Custom E-Gifts
CREATE TABLE IF NOT EXISTS card_designs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  thumb TEXT NOT NULL,
  alt TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Card Themes for Custom E-Gifts
CREATE TABLE IF NOT EXISTS card_themes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  gradient_class TEXT NOT NULL,
  border_color TEXT NOT NULL,
  bg_card TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Persistent Cart Items per Session / User
CREATE TABLE IF NOT EXISTS cart_items (
  cart_instance_id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  gift_id TEXT,
  title TEXT NOT NULL,
  price REAL NOT NULL CHECK(price >= 0),
  description TEXT,
  image TEXT,
  is_custom INTEGER DEFAULT 0,
  recipient TEXT,
  message TEXT,
  theme TEXT,
  design_id TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_cart_session ON cart_items(session_id);

-- Persistent Wishlist per Session / User
CREATE TABLE IF NOT EXISTS wishlist_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  gift_id TEXT NOT NULL REFERENCES gifts(id) ON DELETE CASCADE,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(session_id, gift_id)
);

CREATE INDEX IF NOT EXISTS idx_wishlist_session ON wishlist_items(session_id);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  session_id TEXT,
  recipient_email TEXT NOT NULL,
  gift_note TEXT,
  payment_method TEXT NOT NULL,
  total_amount REAL NOT NULL CHECK(total_amount >= 0),
  status TEXT NOT NULL DEFAULT 'completed',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(recipient_email);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  gift_id TEXT,
  title TEXT NOT NULL,
  price REAL NOT NULL,
  is_custom INTEGER DEFAULT 0,
  recipient TEXT,
  message TEXT,
  image TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
