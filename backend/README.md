# Digital Gift Paradise - Backend API

Production-ready, secure, and resilient REST API backend built with **Node.js, Express, and persistent SQLite**, powering the **Digital Gift Paradise** e-gifting platform.

---

## 🌟 Key Features

- **Express.js REST Architecture**: Clean Separation of Concerns (Routes, Controllers, Services, Validators, Middleware, Utils).
- **Persistent SQLite Database**: Zero-configuration, high-performance embedded database using Node.js 24's native `DatabaseSync` with Write-Ahead Logging (WAL) and foreign keys enabled.
- **Data Persistence**:
  - Catalog gifts with categories, search keyword indexing, pricing, and badges.
  - Quick category chips and vibe personality collections.
  - Card designs and themes for custom e-gift creation.
  - Session-isolated persistent shopping carts.
  - Persistent user wishlists.
  - Atomic transactional order checkout with item snapshots, recipient details, and confirmation receipts.
- **Robust Validation**: Powered by **Zod** for strong request sanitization and error reporting.
- **Security & Reliability**:
  - **Helmet** security headers.
  - **CORS** whitelisting for frontend origins.
  - Parameterized SQLite queries preventing SQL injection.
  - Centralized error handler returning sanitized client responses without stack traces in production.
  - Graceful shutdown handling (SIGINT / SIGTERM).
- **Automated Test Suite**: Full end-to-end and integration tests with `node:test` and `supertest`.

---

## 📁 Project Structure

```
backend/
├── .env.example              # Environment variables template
├── .env                      # Local environment configuration
├── package.json              # Backend dependencies and run scripts
├── README.md                 # Backend documentation
├── data/
│   └── digital_gift_paradise.db  # Persistent SQLite database file
├── src/
│   ├── server.js             # Server entrypoint and graceful shutdown
│   ├── app.js                # Express app setup, CORS, Helmet, routes
│   ├── config/
│   │   ├── env.js            # Environment loader & validator
│   │   └── database.js       # SQLite connection manager & WAL configuration
│   ├── db/
│   │   ├── schema.sql        # SQLite relational schema DDL
│   │   └── seed.js           # Catalog, categories, designs & themes seeder
│   ├── routes/
│   │   ├── index.js          # Master /api router
│   │   ├── giftRoutes.js     # /api/gifts & custom options
│   │   ├── categoryRoutes.js # /api/categories
│   │   ├── cartRoutes.js     # /api/cart
│   │   ├── wishlistRoutes.js # /api/wishlist
│   │   └── orderRoutes.js    # /api/orders & checkout
│   ├── controllers/
│   │   ├── giftController.js
│   │   ├── categoryController.js
│   │   ├── cartController.js
│   │   ├── wishlistController.js
│   │   └── orderController.js
│   ├── services/
│   │   ├── giftService.js
│   │   ├── categoryService.js
│   │   ├── cartService.js
│   │   ├── wishlistService.js
│   │   └── orderService.js
│   ├── validators/
│   │   ├── giftValidator.js
│   │   ├── cartValidator.js
│   │   └── orderValidator.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── requestLogger.js
│   │   └── sessionHandler.js
│   └── utils/
│       ├── apiResponse.js
│       └── logger.js
└── tests/
    ├── health.test.js
    ├── gifts.test.js
    ├── cart.test.js
    └── orders.test.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v20+ or v24+ (Node v24 includes native SQLite engine)
- **npm**: v10+

### Installation

```bash
cd backend
npm install
```

### Environment Setup

Create `.env` based on `.env.example`:

```bash
cp .env.example .env
```

Default configuration:
```env
PORT=5000
NODE_ENV=development
DB_PATH=./data/digital_gift_paradise.db
CORS_ORIGIN=http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173
LOG_LEVEL=info
```

### Database Seeding

The server automatically initializes tables and seeds the catalog on first start, but you can also manually re-seed at any time:

```bash
npm run seed
```

### Start Server

```bash
# Production start
npm start

# Development mode with auto-reload
npm run dev
```

---

## 📡 REST API Reference

### Health & Config
- `GET /api/health` - Health check & database connectivity
- `GET /api/config/hero` - Hero banner configuration

### Catalog Gifts
- `GET /api/gifts` - Query parameters:
  - `category`: Filter by category slug (`subs`, `ecards`, `gaming`, `experience`)
  - `search`: Keyword search in title & description
  - `featured`: Filter featured items (`true` / `false`)
  - `sort`: `price_asc`, `price_desc`, `title`
  - `limit`, `offset`: Pagination
- `GET /api/gifts/:id` - Fetch single gift details
- `POST /api/gifts` - Create new gift
- `PUT /api/gifts/:id` - Update gift details
- `DELETE /api/gifts/:id` - Delete gift
- `GET /api/gifts/custom-options` - List card designs & themes
- `POST /api/gifts/custom-gifts` - Validate and create customized e-card

### Categories
- `GET /api/categories` - Returns all categories
- `GET /api/categories?type=quick` - Quick filter chips
- `GET /api/categories?type=vibe` - Vibe personality cards

### Cart (Session-Persistent)
- `GET /api/cart` - Get current session's cart and calculated total
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/:cartInstanceId` - Remove specific item
- `DELETE /api/cart` - Clear cart

### Wishlist
- `GET /api/wishlist` - Get saved gift IDs
- `POST /api/wishlist/toggle` - Toggle item in wishlist (`{ giftId: "..." }`)

### Orders & Checkout
- `POST /api/orders/checkout` - Checkout form submission:
  - Body: `{ recipientEmail, giftNote, paymentMethod }`
  - Validates recipient email, executes atomic database transaction, persists order items, clears session cart, and returns order receipt.
- `GET /api/orders/:id` - Lookup order receipt & tracking details
- `GET /api/orders` - List recent orders

---

## 🧪 Testing

Run the automated test suite:

```bash
npm test
```
