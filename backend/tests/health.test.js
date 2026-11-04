import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { initDatabase, closeDatabase } from '../src/config/database.js';
import { seedDatabase } from '../src/db/seed.js';

test.before(() => {
  initDatabase(':memory:');
  seedDatabase();
});

test.after(() => {
  closeDatabase();
});

test('GET / returns API info', async () => {
  const app = createApp();
  const res = await request(app).get('/');

  assert.equal(res.status, 200);
  assert.equal(res.body.name, 'Digital Gift Paradise API');
  assert.ok(res.body.endpoints);
});

test('GET /api/health returns operational status and database connection', async () => {
  const app = createApp();
  const res = await request(app).get('/api/health');

  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.status, 'UP');
  assert.equal(res.body.data.database, 'connected');
});

test('GET /api/unknown-route returns 404 with structured error', async () => {
  const app = createApp();
  const res = await request(app).get('/api/unknown-route');

  assert.equal(res.status, 404);
  assert.equal(res.body.success, false);
  assert.match(res.body.message, /Route not found/);
});
