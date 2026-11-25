# Cart & Checkout — Digital Gift Haven 🎁

> **Academic Assessment Submission**  
> **Course / Degree:** Full-Stack Web Development Assessment  
> **Student / Author:** Snehil Raj Pandey  
> **Repository:** [https://github.com/Snehil-Raj-Pandey/cart-checkout](https://github.com/Snehil-Raj-Pandey/cart-checkout)  
> **Academic Integrity Statement:** This project represents original full-stack engineering and development work conducted by the author.

---

## 📌 1. Project Overview

**Cart & Checkout — Digital Gift Haven** is a production-ready, full-stack digital gifting web application. It enables users to browse curated digital gifts, design and personalize custom e-gift cards, manage a persistent shopping cart and wishlist, and execute a checkout flow with instant receipt generation.

The application is structured into two decoupled tiers:
1. **Frontend:** A React 18 Single Page Application (SPA) bundled with Vite 5 and styled using Tailwind CSS 3 with warm, tactile UI tokens and Google Fonts (*DM Sans* and *Quicksand*).
2. **Backend:** A Node.js and Express 4 RESTful API backed by an embedded SQLite database using Node's native `node:sqlite` engine, featuring automated table migration, initial catalog seeding, Zod schema validation, Helmet security headers, and an automated integration test suite.

---

## 🌟 2. Key Features

### Frontend Capabilities
- **Dynamic Hero Banner & Real-time Search:** Search gift cards and digital experiences instantly by keyword.
- **Category Filter Chips:** Seamlessly filter the catalog across subscriptions, wellness, coffee & dining, and digital e-cards.
- **eGift Card Customization Studio:**
  - Card Templates: Birthday, Anniversary, Thank You.
  - Visual Color Themes: Soft Cozy, Warm Sunset, Forest Sage.
  - Custom recipient name, personalized message note, and customizable denomination ($5 to $1,000).
  - Live interactive card preview reflecting theme, typography, and gift details.
- **Persistent Shopping Cart:**
  - Guest session isolation via `x-session-id` headers and local storage persistence.
  - Add standard or customized gifts, adjust quantities, remove items, or clear cart.
  - Real-time order summary calculation (subtotal, taxes, shipping $0.00 for instant digital dispatch).
- **Wishlist Management:** One-click favorite toggling on any catalog card with toast feedback.
- **Checkout & Receipt Generation:**
  - Input validation for recipient email and optional personal gift note.
  - Multiple payment methods: Apple Pay, Google Pay, or Credit/Debit Card.
  - Generates a timestamped order receipt with a unique identifier (`GIFT-YYYYMMDD-XXXXXX`).
- **Resilient Offline Fallback:** If the backend API is starting up or temporarily offline, the frontend seamlessly operates with built-in mock catalog data and local cart persistence without unhandled exceptions.

### Backend Capabilities
- **Native SQLite Integration (`node:sqlite`):** Uses Node.js's built-in synchronous SQLite database with Write-Ahead Logging (`PRAGMA journal_mode = WAL`) and foreign key enforcement.
- **Automatic Migration & Seeding:** Automatically creates SQLite tables from `schema.sql` on startup and seeds catalog data via `seed.js` if the database is unpopulated.
- **Strict Input Validation:** All cart, order, and gift payloads are strictly validated using **Zod** schemas before reaching controller logic.
- **Security & Middleware:**
  - **Helmet:** Enforces security headers on all HTTP responses.
  - **CORS Whitelist:** Whitelists local development ports, production frontend domains, and all `*.vercel.app` preview deployments.
  - **Standardized API Responses:** Clean JSON structure (`{ success, message, data, timestamp }`).
  - **Error Sanitization:** Hides stack traces from API responses in production (`NODE_ENV=production`).
- **Graceful Shutdown:** Handles `SIGINT` and `SIGTERM` signals, safely closing database connections and HTTP listeners.

---

## 🛠️ 3. Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18.3.1 |
| **Build Tool & Bundler** | Vite 5.4.21 |
| **Styling & Design System** | Tailwind CSS 3.4.11, PostCSS 8.4.47, Autoprefixer |
| **Typography & Icons** | Google Fonts (*DM Sans*, *Quicksand*), Material Symbols Outlined |
| **Backend Runtime** | Node.js (>= 22.5.0 required for native `node:sqlite`) |
| **Web Server Framework** | Express 4.21.2 (ES Modules) |
| **Database** | SQLite via native `node:sqlite` (zero external C++ bindings required) |
| **Data Validation** | Zod 3.24.1 |
| **Security & Utilities** | Helmet 8.0.0, CORS 2.8.5, Dotenv 16.4.7 |
| **Testing Framework** | Node.js native test runner (`node:test`), Supertest 7.0.0 |
| **Deployment Platforms** | Vercel (Frontend SPA), Render / Railway / Fly.io (Backend API) |

---

## 📂 4. Project Structure

```text
cart_checkout/
├── backend/                              # Express & SQLite REST API
│   ├── data/                             # SQLite database storage (excluded from git)
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js               # Database initialization & WAL configuration
│   │   │   └── env.js                    # Environment variable loader & defaults
│   │   ├── controllers/
│   │   │   ├── cartController.js         # Cart HTTP handlers (get, add, remove, clear)
│   │   │   ├── categoryController.js     # Category list handler
│   │   │   ├── giftController.js         # Gift catalog & customization options
│   │   │   ├── orderController.js        # Checkout & receipt lookup handlers
│   │   │   └── wishlistController.js     # Wishlist toggle & retrieve handlers
│   │   ├── db/
│   │   │   ├── schema.sql                # DDL tables & indexes
│   │   │   └── seed.js                   # Initial catalog & card design seeder
│   │   ├── middleware/
│   │   │   ├── errorHandler.js           # Centralized 404 & error formatting
│   │   │   ├── requestLogger.js          # Timestamped request logger
│   │   │   └── sessionHandler.js         # Guest x-session-id coordinator
│   │   ├── routes/
│   │   │   ├── cartRoutes.js             # /api/cart endpoints
│   │   │   ├── categoryRoutes.js         # /api/categories endpoints
│   │   │   ├── giftRoutes.js             # /api/gifts endpoints
│   │   │   ├── index.js                  # Central router & /api/health check
│   │   │   ├── orderRoutes.js            # /api/orders endpoints
│   │   │   └── wishlistRoutes.js         # /api/wishlist endpoints
│   │   ├── services/                     # Business logic and database operations
│   │   │   ├── cartService.js
│   │   │   ├── categoryService.js
│   │   │   ├── giftService.js
│   │   │   ├── orderService.js
│   │   │   └── wishlistService.js
│   │   ├── utils/
│   │   │   ├── apiResponse.js            # Standardized JSON response envelope
│   │   │   └── logger.js                 # Production logger
│   │   ├── validators/                   # Zod schemas
│   │   │   ├── cartValidator.js
│   │   │   ├── giftValidator.js
│   │   │   └── orderValidator.js
│   │   ├── app.js                        # Express app factory (Helmet, CORS, Routes)
│   │   └── server.js                     # HTTP server entrypoint & graceful shutdown
│   ├── tests/                            # Automated integration test suite
│   │   ├── cart.test.js
│   │   ├── gifts.test.js
│   │   ├── health.test.js
│   │   └── orders.test.js
│   ├── .env.example                      # Backend environment variable template
│   ├── package.json                      # Backend dependencies, scripts & engines
│   └── README.md
│
├── frontend/                             # React 18 + Vite SPA
│   ├── dist/                             # Compiled production assets (excluded from git)
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js                 # API client with VITE_API_BASE_URL resolution
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── BottomNav.jsx         # Mobile sticky navigation
│   │   │   │   ├── Header.jsx            # Header with search & cart counter
│   │   │   │   └── Toast.jsx             # Floating notification alerts
│   │   │   └── home/
│   │   │       ├── CategoryChips.jsx     # Category chips selector
│   │   │       ├── HeroBanner.jsx        # Hero banner with embedded search
│   │   │       └── TrendingGifts.jsx     # Responsive gift card grid
│   │   ├── context/
│   │   │   └── GiftContext.jsx           # Global state provider (cart, wishlist, pages)
│   │   ├── data/
│   │   │   └── mockData.js               # Offline fallback catalog & theme definitions
│   │   ├── pages/
│   │   │   ├── CategoriesPage.jsx        # Full categories browse view
│   │   │   ├── CheckoutPage.jsx          # Cart review, checkout form & order receipt
│   │   │   ├── CustomizePage.jsx         # Interactive e-card builder studio
│   │   │   └── HomePage.jsx              # Main storefront landing view
│   │   ├── App.jsx                       # Main view layout router
│   │   ├── index.css                     # Tailwind directives & cozy theme styles
│   │   └── main.jsx                      # React 18 DOM root entrypoint
│   ├── .env.example                      # Frontend environment variable template
│   ├── index.html                        # Lightweight HTML entrypoint (SEO meta tags)
│   ├── package.json                      # Frontend dependencies & scripts
│   ├── postcss.config.js                 # PostCSS configuration for Tailwind
│   ├── tailwind.config.js                # Custom palette tokens & typography
│   ├── vercel.json                       # Vercel SPA routing configuration
│   └── vite.config.js                    # Vite configuration with /api reverse proxy
│
├── .gitignore                            # Strict exclusion rules (env, node_modules, dist, DB)
└── README.md                             # Repository documentation
```

---

## ⚙️ 5. Prerequisites

Before running the project locally, ensure you have:
- **Node.js**: Version **`>= 22.5.0`** (Node 22 LTS or Node 24 recommended).
  * Check version: `node -v`
  * *Reason:* The backend uses the native `node:sqlite` module built into Node.js 22.5+.
- **npm**: Version **`>= 10.x`**
  * Check version: `npm -v`
- **Git**: Installed for version control.

---

## 🚀 6. Installation & Setup Guide

### Step 1: Clone the Repository
```bash
git clone https://github.com/Snehil-Raj-Pandey/cart-checkout.git
cd cart-checkout
```

---

### Step 2: Backend Setup & Execution

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy the `.env.example` file to create your `.env` configuration:
   ```bash
   # Windows (PowerShell)
   Copy-Item .env.example .env

   # macOS / Linux
   cp .env.example .env
   ```

   *Default values in `backend/.env`:*
   ```env
   PORT=5000
   NODE_ENV=development
   DB_PATH=./data/digital_gift_paradise.db
   CORS_ORIGIN=http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173
   LOG_LEVEL=info
   ```

4. **Initialize and Seed the Database:**
   The backend automatically creates tables and runs initial seeding upon first start. You can also seed manually at any time:
   ```bash
   npm run seed
   ```

5. **Run Backend Automated Tests:**
   Verify the integration test suite:
   ```bash
   npm test
   ```
   *Expected Output:* `17 pass, 0 fail`

6. **Start the Backend Server:**
   - **For Development (with file watch):**
     ```bash
     npm run dev
     ```
   - **For Production:**
     ```bash
     npm start
     ```
   *Server will start on `http://localhost:5000`.*  
   *API Root:* `http://localhost:5000/`  
   *Health Check:* `http://localhost:5000/api/health`

---

### Step 3: Frontend Setup & Execution

1. **Open a new terminal window and navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables (optional for local development):**
   ```bash
   # Windows (PowerShell)
   Copy-Item .env.example .env

   # macOS / Linux
   cp .env.example .env
   ```
   *Default value in `frontend/.env`:*
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
   *(Note: Vite's local dev server automatically proxies any relative `/api` calls to `http://localhost:5000`, so this works out-of-the-box even without a `.env` file).*

4. **Start the Frontend Development Server:**
   ```bash
   npm run dev
   ```
   *Open your browser at `http://localhost:3000`.*

5. **Test the Production Build:**
   ```bash
   npm run build
   ```
   *Compiles all assets to `dist/` with minified CSS and JavaScript chunks in under 3 seconds.*

---

## 📡 7. REST API Documentation

The backend exposes a structured REST API under the `/api` prefix:

| Method | Endpoint | Description | Request Body / Query Params | Status Codes |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | API status and overview | None | `200` |
| `GET` | `/api/health` | Health check & SQLite status | None | `200`, `500` |
| `GET` | `/api/config/hero` | Hero banner configuration | None | `200` |
| `GET` | `/api/categories` | List gift categories | `?type=quick` (optional) | `200` |
| `GET` | `/api/gifts` | Filterable gift catalog | `?category=...&search=...` | `200` |
| `GET` | `/api/gifts/:id` | Single gift item details | None | `200`, `404` |
| `POST` | `/api/gifts` | Add a new gift to catalog | `{ title, price, category, ... }` | `201`, `400` |
| `GET` | `/api/gifts/custom-options` | Custom card designs & themes | None | `200` |
| `POST` | `/api/gifts/custom-gifts` | Create a customized e-card | `{ designId, themeId, recipient, message, amount }` | `201`, `400` |
| `GET` | `/api/cart` | Get current session cart | Header: `x-session-id` | `200` |
| `POST` | `/api/cart` | Add item to cart | `{ giftId, title, price, ... }` | `201`, `400` |
| `DELETE`| `/api/cart/:cartInstanceId`| Remove item from cart | Header: `x-session-id` | `200`, `404` |
| `DELETE`| `/api/cart` | Clear entire cart | Header: `x-session-id` | `200` |
| `GET` | `/api/wishlist` | Get session wishlist IDs | Header: `x-session-id` | `200` |
| `POST` | `/api/wishlist/toggle` | Toggle gift in wishlist | `{ giftId }` | `200`, `400` |
| `POST` | `/api/orders/checkout` | Process order checkout | `{ recipientEmail, giftNote, paymentMethod, items }` | `201`, `400` |
| `GET` | `/api/orders/:id` | Retrieve order receipt | None | `200`, `404` |

---

## 🧪 8. Automated Testing & Verification

The project includes automated integration tests utilizing Node.js's native test runner (`node:test`) and `supertest`.

### Running Tests:
```bash
cd backend
npm test
```

### Test Coverage (17 Test Cases):
1. **Health Check (`health.test.js`)**:
   - `GET /` returns API info.
   - `GET /api/health` validates operational status and live SQLite connection.
   - `GET /api/unknown-route` returns structured 404 response.
2. **Gift Catalog (`gifts.test.js`)**:
   - `GET /api/gifts` lists catalog gifts.
   - Filters by category (`?category=subs`).
   - Filters by keyword (`?search=spotify`).
   - `GET /api/gifts/:id` fetches individual gift details.
   - Validates 404 for nonexistent gift IDs.
   - `POST /api/gifts` validates Zod schema constraints and creates records.
   - `GET /api/gifts/custom-options` loads card designs and theme tokens.
   - `POST /api/gifts/custom-gifts` creates custom e-gift instances.
3. **Cart Operations (`cart.test.js`)**:
   - `GET /api/cart` returns persistent guest items and computed totals.
   - `POST /api/cart` persists items across session restarts.
   - `DELETE /api/cart/:cartInstanceId` removes targeted items.
   - `DELETE /api/cart` clears the active cart session.
4. **Checkout & Orders (`orders.test.js`)**:
   - `POST /api/orders` enforces email validation and rejects empty carts.
   - Processes checkout, clears session cart, creates receipt with unique order ID.
   - `GET /api/orders/:id` fetches receipt details.

---

## 🔒 9. Security & Repository Hygiene

- **Protected Secrets**: `.gitignore` strictly blocks `.env`, `.env.*`, `node_modules/`, `dist/`, `build/`, `.vercel/`, logs, and `*.db` SQLite database files.
- **Zero Credentials in Git**: Repository inspection confirmed zero hardcoded tokens, passwords, or connection strings in source code.
- **Public Accessibility**: The repository is public, allowing seamless evaluation without login.
- **Production Error Shield**: Internal database error traces are omitted in production mode.

---

## ☁️ 10. Cloud Deployment Guide

### Deploying Frontend to Vercel
1. Log into [vercel.com](https://vercel.com) and click **Add New...** > **Project**.
2. Select repository: `Snehil-Raj-Pandey/cart-checkout`.
3. In **Project Settings**:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. In **Environment Variables**, set:
   - `VITE_API_BASE_URL` = `https://<your-backend-domain>/api`
5. Click **Deploy**. Vercel will build the frontend with `vercel.json` managing SPA rewrites.

### Deploying Backend to Render / Railway
1. Create a new **Web Service** connected to `Snehil-Raj-Pandey/cart-checkout`.
2. Configure settings:
   - **Root Directory**: `backend`
   - **Runtime**: `Node` (Node 22+)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
3. In **Environment Variables**, set:
   - `NODE_ENV` = `production`
   - `CORS_ORIGIN` = `https://<your-frontend-app>.vercel.app`
   - `DB_PATH` = `./data/digital_gift_paradise.db` (or mount a persistent disk volume)

---

## 📜 11. Author & Academic Declaration

This project was developed by **Snehil Raj Pandey** for college assessment submission. All source code in the frontend and backend directories represents original architectural and engineering work.
