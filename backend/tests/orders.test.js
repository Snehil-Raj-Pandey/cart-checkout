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

test('POST /api/orders rejects invalid email or empty cart', async () => {
  const app = createApp();

  // Invalid email
  const invalidEmailRes = await request(app)
    .post('/api/orders')
    .set('x-session-id', 'test-order-session-1')
    .send({
      recipientEmail: 'not-an-email'
    });
  assert.equal(invalidEmailRes.status, 400);

  // Empty cart checkout attempt
  const emptyCartRes = await request(app)
    .post('/api/orders')
    .set('x-session-id', 'fresh-empty-session')
    .send({
      recipientEmail: 'alex@example.com'
    });
  assert.equal(emptyCartRes.status, 400);
  assert.match(emptyCartRes.body.message, /empty cart/i);
});

test('POST /api/orders processes full checkout, clears cart, and creates receipt', async () => {
  const app = createApp();
  const sessionId = 'test-checkout-flow';

  // 1. Add item to cart
  await request(app)
    .post('/api/cart')
    .set('x-session-id', sessionId)
    .send({
      id: 'spotify-1yr',
      title: 'Spotify Premium - 1 Year',
      price: 99.00
    });

  // 2. Checkout
  const orderRes = await request(app)
    .post('/api/orders')
    .set('x-session-id', sessionId)
    .send({
      recipientEmail: 'bestfriend@example.com',
      giftNote: 'Hope this brightens your day!',
      paymentMethod: 'Apple Pay'
    });

  assert.equal(orderRes.status, 201);
  assert.equal(orderRes.body.success, true);
  assert.ok(orderRes.body.data.id.startsWith('GIFT-'));
  assert.equal(orderRes.body.data.recipientEmail, 'bestfriend@example.com');
  assert.equal(orderRes.body.data.paymentMethod, 'Apple Pay');
  assert.equal(orderRes.body.data.totalAmount, 99.00);
  assert.equal(orderRes.body.data.items.length, 1);

  // 3. Verify cart was cleared
  const cartRes = await request(app)
    .get('/api/cart')
    .set('x-session-id', sessionId);
  assert.equal(cartRes.body.data.items.length, 0);

  // 4. Verify order lookup by ID
  const orderId = orderRes.body.data.id;
  const lookupRes = await request(app).get(`/api/orders/${orderId}`);
  assert.equal(lookupRes.status, 200);
  assert.equal(lookupRes.body.data.id, orderId);
  assert.equal(lookupRes.body.data.recipientEmail, 'bestfriend@example.com');
});
