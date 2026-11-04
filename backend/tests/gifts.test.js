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

test('GET /api/gifts returns list of catalog gifts', async () => {
  const app = createApp();
  const res = await request(app).get('/api/gifts');

  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.ok(Array.isArray(res.body.data.items));
  assert.ok(res.body.data.items.length > 0);
  assert.ok(res.body.data.total > 0);
});

test('GET /api/gifts?category=subs filters by subscription category', async () => {
  const app = createApp();
  const res = await request(app).get('/api/gifts?category=subs');

  assert.equal(res.status, 200);
  assert.ok(res.body.data.items.length > 0);
  for (const item of res.body.data.items) {
    assert.equal(item.category, 'subs');
  }
});

test('GET /api/gifts?search=spotify filters by keyword', async () => {
  const app = createApp();
  const res = await request(app).get('/api/gifts?search=spotify');

  assert.equal(res.status, 200);
  assert.ok(res.body.data.items.length >= 1);
  assert.match(res.body.data.items[0].title.toLowerCase(), /spotify/);
});

test('GET /api/gifts/:id returns single gift details', async () => {
  const app = createApp();
  const res = await request(app).get('/api/gifts/spotify-1yr');

  assert.equal(res.status, 200);
  assert.equal(res.body.data.id, 'spotify-1yr');
  assert.equal(res.body.data.price, 99);
});

test('GET /api/gifts/:id returns 404 for nonexistent gift', async () => {
  const app = createApp();
  const res = await request(app).get('/api/gifts/nonexistent-item-999');

  assert.equal(res.status, 404);
  assert.equal(res.body.success, false);
});

test('POST /api/gifts validates required fields and creates new gift', async () => {
  const app = createApp();

  // Invalid payload (missing required title & price)
  const invalidRes = await request(app)
    .post('/api/gifts')
    .send({ description: 'Short' });
  assert.equal(invalidRes.status, 400);
  assert.equal(invalidRes.body.success, false);

  // Valid payload
  const validGift = {
    id: 'test-cozy-book-bundle',
    title: 'Cozy Winter Reading Bundle',
    description: 'A curated pack of three bestselling cozy fiction e-books.',
    price: 34.50,
    category: 'subs',
    image: 'https://example.com/books.jpg',
    featured: true
  };

  const createRes = await request(app)
    .post('/api/gifts')
    .send(validGift);

  assert.equal(createRes.status, 201);
  assert.equal(createRes.body.data.id, 'test-cozy-book-bundle');
  assert.equal(createRes.body.data.price, 34.50);
});

test('GET /api/gifts/custom-options returns designs and themes', async () => {
  const app = createApp();
  const res = await request(app).get('/api/gifts/custom-options');

  assert.equal(res.status, 200);
  assert.ok(Array.isArray(res.body.data.designs));
  assert.ok(Array.isArray(res.body.data.themes));
  assert.ok(res.body.data.designs.some(d => d.id === 'birthday'));
  assert.ok(res.body.data.themes.some(t => t.id === 'soft'));
});

test('POST /api/gifts/custom-gifts validates and creates custom e-gift item', async () => {
  const app = createApp();
  const payload = {
    recipient: 'Emma Watson',
    message: 'Happy Graduation! Enjoy your celebration!',
    amount: 75,
    designId: 'plant',
    themeId: 'soft'
  };

  const res = await request(app)
    .post('/api/gifts/custom-gifts')
    .send(payload);

  assert.equal(res.status, 201);
  assert.equal(res.body.data.price, 75);
  assert.equal(res.body.data.recipient, 'Emma Watson');
  assert.equal(res.body.data.isCustom, true);
});
