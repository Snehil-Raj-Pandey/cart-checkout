import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbInstance = null;

export function getDatabasePath() {
  const envPath = process.env.DB_PATH || './data/digital_gift_paradise.db';
  return path.isAbsolute(envPath)
    ? envPath
    : path.resolve(__dirname, '../../', envPath);
}

export function initDatabase(customPath = null) {
  if (dbInstance) {
    return dbInstance;
  }

  const dbPath = customPath || getDatabasePath();

  // If in-memory database for testing
  if (dbPath !== ':memory:') {
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
  }

  const db = new DatabaseSync(dbPath);

  // Enable WAL mode for high concurrency & performance, and enable foreign keys
  if (dbPath !== ':memory:') {
    db.exec('PRAGMA journal_mode = WAL;');
  }
  db.exec('PRAGMA foreign_keys = ON;');

  // Apply schema
  const schemaPath = path.resolve(__dirname, '../db/schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schemaSql);
  }

  dbInstance = db;
  return dbInstance;
}

export function getDb() {
  if (!dbInstance) {
    return initDatabase();
  }
  return dbInstance;
}

export function closeDatabase() {
  if (dbInstance) {
    try {
      dbInstance.close();
    } catch {
      // Ignore already closed error
    }
    dbInstance = null;
  }
}
