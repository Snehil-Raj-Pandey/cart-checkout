# Digital Gift Paradise - React Frontend

This is the converted React application for the **Digital Gift Paradise** platform, bringing together all the project screens:
- 🏠 **Homepage / Flow**: Hero banner, search, horizontal category slider, and trending gifts.
- 🎁 **Gift Categories**: Curated vibe-based bento grid (Gamers, Music Lovers, Coffee Addicts, Movie Buffs, Plant Parents, Bookworms).
- 🎨 **Customize Gift**: Real-time live card preview, design options, themes, recipient and message inputs, amount selector.
- 🛒 **Cart & Checkout**: Interactive cart items, removal, subtotal calculation, delivery recipient details, payment options, and checkout confirmation.

---

## How to Run

### Option 1: Instant Browser Preview (Zero Setup Needed)
Since Python 3.13 is available on your system, you can immediately serve and test the application with a single command:
```bash
python -m http.server 3000 --directory cart_checkout/frontend
```
Then open [http://localhost:3000](http://localhost:3000) in your browser!

Or, you can simply **double-click** `index.html` to open it directly in Chrome, Edge, or Firefox.

### Option 2: Standard Vite / Node.js
If you install Node.js (v18+), you can run it with the standard Vite tooling:
```bash
cd cart_checkout/frontend
npm install
npm run dev
```

---

## Project Structure
```
frontend/
├── index.html               # Main entry point with instant browser preview
├── package.json             # Project dependencies & scripts
├── vite.config.js           # Vite configuration
├── src/
│   ├── index.css            # Soft-modern styling & design tokens
│   ├── main.jsx             # React DOM root render
│   ├── App.jsx              # Main shell with layout & routing
│   ├── context/
│   │   └── GiftContext.jsx  # Cart, Wishlist, Customization & Page state
│   ├── data/
│   │   └── mockData.js      # Curated catalog, trending items & themes
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx   # Sticky responsive TopAppBar with cart badge
│   │   │   ├── BottomNav.jsx# Mobile navigation bar
│   │   │   └── Toast.jsx    # Soft-styled feedback notifications
│   │   └── home/
│   │       ├── HeroBanner.jsx
│   │       ├── CategoryChips.jsx
│   │       └── TrendingGifts.jsx
│   └── pages/
│       ├── HomePage.jsx
│       ├── CategoriesPage.jsx
│       ├── CustomizePage.jsx
│       └── CheckoutPage.jsx
```
