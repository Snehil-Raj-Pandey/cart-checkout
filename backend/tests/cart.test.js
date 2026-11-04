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

test('GET /api/cart returns persistent cart items and computed total', async () => {
  const app = createApp();
  const res = await request(app)
    .get('/api/cart')
    .set('x-session-id', 'test-cart-session');

  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.ok(Array.isArray(res.body.data.items));
});

test('POST /api/cart adds item to cart and persists in database', async () => {
  const app = createApp();
  const newItem = {
    id: 'spotify-1yr',
    title: 'Spotify Premium - 1 Year',
    price: 99.00,
    description: '1 year music streaming pass',
    image: 'https://example.com/spotify.jpg'
  };

  const addRes = await request(app)
    .post('/api/cart')
    .set('x-session-id', 'test-cart-session')
    .send(newItem);

  assert.equal(addRes.status, 201);
  assert.equal(addRes.body.data.title, 'Spotify Premium - 1 Year');
  assert.equal(addRes.body.data.price, 99.00);

  // Verify cart now contains the item
  const getRes = await request(app)
    .get('/api/cart')
    .set('x-session-id', 'test-cart-session');

  assert.ok(getRes.body.data.items.some(i => i.title === 'Spotify Premium - 1 Year'));
  assert.ok(getRes.body.data.total >= 99);
});

test('DELETE /api/cart/:cartInstanceId removes item from cart', async () => {
  const app = createApp();
  // First add an item
  const addRes = await request(app)
    .post('/api/cart')
    .set('x-session-id', 'test-delete-session')
    .send({
      id: 'item-to-delete',
      title: 'Temporary Test Item',
      price: 10.00
    });

  const cartInstanceId = addRes.body.data.cartInstanceId;

  // Delete it
  const delRes = await request(app)
    .delete(`/api/cart/${cartInstanceId}`)
    .set('x-session-id', 'test-delete-session');

  assert.equal(delRes.status, 200);
  assert.ok(!delRes.body.data.items.some(i => i.cartInstanceId === cartInstanceId));
});

test('DELETE /api/cart clears all items in cart', async () => {
  const app = createApp();
  const clearRes = await request(app)
    .delete('/api/cart')
    .set('x-session-id', 'test-clear-session');

  assert.equal(clearRes.status, 200);
  assert.equal(clearRes.body.data.items.length, 0);
  assert.equal(clearRes.body.data.total, 0);
});
