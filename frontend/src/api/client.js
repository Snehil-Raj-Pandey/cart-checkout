/**
 * Digital Gift Paradise - API Client
 * Connects frontend to Express & SQLite Backend
 */

const rawBaseUrl = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL)
  ? import.meta.env.VITE_API_BASE_URL
  : (import.meta.env?.DEV ? 'http://localhost:5000/api' : '/api');

const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

// Persistent guest session ID for cart & wishlist isolation
export function getSessionId() {
  const STORAGE_KEY = 'digital_gift_session_id';
  let sessionId = null;
  try {
    sessionId = localStorage.getItem(STORAGE_KEY);
    if (!sessionId) {
      sessionId = 'guest-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 8);
      localStorage.setItem(STORAGE_KEY, sessionId);
    }
  } catch {
    sessionId = 'default-session';
  }
  return sessionId;
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const sessionId = getSessionId();

  const headers = {
    'Content-Type': 'application/json',
    'x-session-id': sessionId,
    ...(options.headers || {})
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || `Request failed with status ${res.status}`);
    }
    return json.data;
  } catch (err) {
    console.warn(`[API Client] ${options.method || 'GET'} ${endpoint} failed:`, err.message);
    throw err;
  }
}

export const api = {
  // Hero & Config
  getHeroConfig: () => request('/config/hero'),

  // Categories
  getCategories: (type) => request(`/categories${type ? `?type=${type}` : ''}`),

  // Catalog Gifts
  getGifts: (params = {}) => {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'all') query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.featured !== undefined) query.append('featured', params.featured);
    if (params.sort) query.append('sort', params.sort);
    const queryString = query.toString();
    return request(`/gifts${queryString ? `?${queryString}` : ''}`);
  },

  getGiftById: (id) => request(`/gifts/${id}`),

  // Customization Options
  getCustomOptions: () => request('/gifts/custom-options'),

  createCustomGift: (data) => request('/gifts/custom-gifts', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // Cart Management
  getCart: () => request('/cart'),

  addToCart: (item) => request('/cart', {
    method: 'POST',
    body: JSON.stringify(item)
  }),

  removeFromCart: (cartInstanceId) => request(`/cart/${cartInstanceId}`, {
    method: 'DELETE'
  }),

  clearCart: () => request('/cart', {
    method: 'DELETE'
  }),

  // Wishlist
  getWishlist: () => request('/wishlist'),

  toggleWishlist: (giftId) => request('/wishlist/toggle', {
    method: 'POST',
    body: JSON.stringify({ giftId })
  }),

  // Checkout & Orders
  checkout: (orderData) => request('/orders/checkout', {
    method: 'POST',
    body: JSON.stringify(orderData)
  }),

  getOrderById: (orderId) => request(`/orders/${orderId}`),

  // Health
  checkHealth: () => request('/health')
};

export default api;
