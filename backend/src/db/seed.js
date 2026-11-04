import { initDatabase, getDb, closeDatabase } from '../config/database.js';

export const SEED_HERO = {
  title: "Send a Smile Digitally.",
  subtitle: "Thoughtful gifts for every moment, delivered instantly to their inbox.",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUuokKXEgJD65s2TKZ6m3tVOHfjnEhoJR9TSGcFasq9PvLfbhArrUAGFGKq2SqZNJLALe8RfXfXEYs9a1jROIxNScK1NQy7uw671u5ceIgMi8Q_K8hSgB9jvZVjfRXMXwKGgJM00PnptxLh3oNllfVK2qEcX_jtbO3rJ1L5dNJdAohm-ggZh6uHc-yBrVzbPjbja4Eg4cV7waIM4PL0wIto0lT3a4-SvZMvUv_h-VZeYR329Lb7pGE",
  alt: "A stylized 3D illustration of a floating digital gift box bursting with colorful confetti and soft glowing hearts, set against a warm peach and cream background."
};

export const SEED_QUICK_CATEGORIES = [
  { id: "ecards", name: "E-Cards", icon: "mail", bg_class: "bg-secondary-container", border_class: "border-secondary/20", text_class: "text-on-secondary-container", sort_order: 1 },
  { id: "subs", name: "Subs", icon: "autorenew", bg_class: "bg-tertiary-container", border_class: "border-tertiary/20", text_class: "text-on-tertiary-container", sort_order: 2 },
  { id: "gaming", name: "Gaming", icon: "sports_esports", bg_class: "bg-error-container", border_class: "border-error/20", text_class: "text-on-error-container", sort_order: 3 },
  { id: "experience", name: "Experience", icon: "local_activity", bg_class: "bg-primary-fixed", border_class: "border-primary/20", text_class: "text-on-primary-fixed", sort_order: 4 },
  { id: "all", name: "All Gifts", icon: "grid_view", bg_class: "bg-surface-variant", border_class: "border-outline-variant/50", text_class: "text-on-surface-variant", sort_order: 5 }
];

export const SEED_VIBE_CATEGORIES = [
  {
    id: "gamers",
    name: "For Gamers",
    title: "For Gamers",
    description: "RGB, comfort, and performance.",
    icon: "sports_esports",
    bg_class: "bg-secondary-fixed",
    border_class: "border-secondary-fixed-dim",
    text_class: "text-on-secondary-fixed",
    button_bg: "bg-on-secondary-fixed",
    sort_order: 1
  },
  {
    id: "music-lovers",
    name: "Music Lovers",
    title: "Music Lovers",
    description: "Vinyl, speakers, and soundscapes.",
    icon: "headphones",
    bg_class: "bg-primary-fixed",
    border_class: "border-primary-fixed-dim",
    text_class: "text-on-primary-fixed",
    button_bg: "bg-on-primary-fixed",
    sort_order: 2
  },
  {
    id: "coffee-addicts",
    name: "Coffee Addicts",
    title: "Coffee Addicts",
    description: "Beans, brewers, and mugs.",
    icon: "coffee",
    bg_class: "bg-tertiary-fixed",
    border_class: "border-tertiary-fixed-dim",
    text_class: "text-on-tertiary-fixed",
    button_bg: "bg-on-tertiary-fixed",
    sort_order: 3
  },
  {
    id: "movie-buffs",
    name: "Movie Buffs",
    title: "Movie Buffs",
    description: "Cinema snacks and cozy throws.",
    icon: "movie",
    bg_class: "bg-surface-container-highest",
    border_class: "border-outline-variant",
    text_class: "text-on-surface",
    button_bg: "bg-on-surface",
    sort_order: 4
  },
  {
    id: "plant-parents",
    name: "Plant Parents",
    title: "Plant Parents",
    description: "Greenery and growing tools.",
    icon: "local_florist",
    bg_class: "bg-secondary-container",
    border_class: "border-secondary-fixed",
    text_class: "text-on-secondary-container",
    button_bg: "bg-on-secondary-container",
    sort_order: 5
  },
  {
    id: "bookworms",
    name: "Bookworms",
    title: "Bookworms",
    description: "Stories, bookmarks, and lamps.",
    icon: "menu_book",
    bg_class: "bg-error-container",
    border_class: "border-error-container/80",
    text_class: "text-on-error-container",
    button_bg: "bg-on-error-container",
    sort_order: 6
  }
];

export const SEED_GIFTS = [
  {
    id: "spotify-1yr",
    title: "Spotify Premium - 1 Year",
    subtitle: null,
    tag: "#1 Popular",
    tag_icon: "local_fire_department",
    description: "Give the gift of uninterrupted music. Perfect for commutes, workouts, and chill sessions.",
    price: 99.00,
    featured: 1,
    action_text: null,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_N8w5UESayAUX_53VfHD40npbkPeKbOf0RLMON68T_vSWu0p8738K1bGvLDcFvlpyClI20M08I3SbYzfbakmn2xjX8MZYihcegbPGjgtzm5bQCHcELOaImFKvMq1cStTbkdgD-9hW3w7XLsETSLo8aGqZKNTDYBdCoyKQd3-C68bhB2nXFWoqWvTcqQlQEyuMDk9qP5C-3M6SFmUEzdyIRlGbd9pyv2lwpb4brKgqj3g72WR-vJF-",
    category: "subs"
  },
  {
    id: "starbucks-card",
    title: "Starbucks Gift Card",
    subtitle: "For the caffeine lover.",
    tag: null,
    tag_icon: null,
    description: "Treat your friend to their favorite daily brew, specialty lattes, and bakery treats.",
    price: 25.00,
    featured: 0,
    action_text: null,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKeGbGOdXzvCYe0GdHCHyP3qniMRLibmslL5F98UAbywjR20tstJdtGunW75Sm5bpTVWf1G0PuaP0-qjUiYt7NxnReYk8oLV_iyGSEvbpfCVTEI3gRXb7Ei9TYDPH_iXJDG_R7lxDu5iNVj1O00gaw4HILjU3CXhpAsz72OUBxfjvaQBRs8UN0ySx1m2mSA4b9hShXr0qPY1o1eJB9w0fzYa20J3v1X-4MIBSQ5Pg4fEqU1HgvvUYU",
    category: "ecards"
  },
  {
    id: "netflix-3mo",
    title: "Netflix 3 Months",
    subtitle: "Binge-watching bliss.",
    tag: null,
    tag_icon: null,
    description: "Endless movies, shows, and documentaries right on demand anytime.",
    price: 45.00,
    featured: 0,
    action_text: null,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCi07K2u-lNhk-pj-vlx88E6-FzzFoqefdf1fZJj8rj1gBCmpHDO2y5807S5MPyIXFDenMz9KSgiatKzmvokT_p3piUrJozx66G5Q3ia4lp3SR_s3Dbi7tA_NXTa438RReo78zQHHJASvUho_l0Mly0_dFZjltW2zp04opf9s46RbXoztJle0NFkZEvXpQ-C9Shj4yQAw_jFYyGp9JJsoNRrUshPoiyZAtjKcItxNR5Vp87V4zRlqvh",
    category: "subs"
  },
  {
    id: "premium-ecards",
    title: "Premium Animated E-Cards",
    subtitle: "Artisan Digital Greetings",
    tag: null,
    tag_icon: null,
    description: "Send a beautifully crafted, animated message that feels personal and high-quality. Browse our artist collection.",
    price: 15.00,
    featured: 1,
    action_text: "Customize Card",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxyWIKwDNehFxyy_iDe-VwqaaCe0XxkCgS2euGpb5unj2N4veXg3vwZsUK_iXnvjdURq7Dx58qXDw194KOUntqkRGOmSghtQ9_1v901ELexWAR2rY6_H4MR0xPQ7jTORYyh-FQOWefhN4ewoZg2jJ289tAKyFrDl__aT-HjQi4Vek0wZpToLoF8z4IBHy9IyhUH6He69EDzJ74TJLfcKBZSaAubSsxdSzvsTewbtUedkulXUXSoRdU",
    category: "ecards"
  },
  {
    id: "steam-gift-50",
    title: "Steam $50 Wallet Pass",
    subtitle: "The ultimate gaming library.",
    tag: "Gamer Favorite",
    tag_icon: "sports_esports",
    description: "Instant access to thousands of indie and AAA games, DLCs, and digital community items.",
    price: 50.00,
    featured: 0,
    action_text: null,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKeGbGOdXzvCYe0GdHCHyP3qniMRLibmslL5F98UAbywjR20tstJdtGunW75Sm5bpTVWf1G0PuaP0-qjUiYt7NxnReYk8oLV_iyGSEvbpfCVTEI3gRXb7Ei9TYDPH_iXJDG_R7lxDu5iNVj1O00gaw4HILjU3CXhpAsz72OUBxfjvaQBRs8UN0ySx1m2mSA4b9hShXr0qPY1o1eJB9w0fzYa20J3v1X-4MIBSQ5Pg4fEqU1HgvvUYU",
    category: "gaming"
  },
  {
    id: "airbnb-exp-75",
    title: "Airbnb Cozy Experience Voucher",
    subtitle: "Memories that last forever.",
    tag: "Unique",
    tag_icon: "local_activity",
    description: "Cooking workshops, pottery classes, or nature tours hosted by passionate locals.",
    price: 75.00,
    featured: 0,
    action_text: null,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_N8w5UESayAUX_53VfHD40npbkPeKbOf0RLMON68T_vSWu0p8738K1bGvLDcFvlpyClI20M08I3SbYzfbakmn2xjX8MZYihcegbPGjgtzm5bQCHcELOaImFKvMq1cStTbkdgD-9hW3w7XLsETSLo8aGqZKNTDYBdCoyKQd3-C68bhB2nXFWoqWvTcqQlQEyuMDk9qP5C-3M6SFmUEzdyIRlGbd9pyv2lwpb4brKgqj3g72WR-vJF-",
    category: "experience"
  }
];

export const SEED_CARD_DESIGNS = [
  {
    id: "birthday",
    name: "Birthday",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvDZEhGP2uLQ1rAxqE63cVpQ97kS8olYtKl8se7qvVThaVP9o8wDP1qROx1DVyHrWgHeN2vATPmWMaY_9Id4YsW-_oI_2ZbY6f7GP7a3j2Ul7wxte-QcXu8_hVndkK20bBJ4GiO-_MRltusJArJLr7y7hSJ7YJK5RGfVmblV21V8R8rS4DaY2XJ9ZCnAvHkXpJURk8HFhZOz0XSdKBmcchG9TuoXX8WNUxwbN-SwsPWZMDBgh2dRLT",
    thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjG3fgRxP005mKzSPFn8Kz02JCB2SbKOC8OiAMT1v0GMDJvo2IG5OIEYzMFJsja7NVIyuJEpAl62glY3HgIbOxGuiwcnpspcbgML7WGGyg_7b6l8i9kbJA6MwI_taF_q8ZKEa0RxE0hUT_ruAw38DbtUQ2FhpsaH21JceL4lHPballeN4w9JoJJe8_sl7hFP3aLrPeZ_CmmkvLCwbCHY0LHQhwJI6m-Ro14S2_4uFYICXw8rBLLrAT",
    alt: "Pastel colored birthday cake with squiggly candles",
    sort_order: 1
  },
  {
    id: "coffee",
    name: "Just Because",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAS1s-K0vR5dkFoce3_8R8LtRO1lBnKR4Hnph0YT3cfwdtes5zALfsf0UdWbfxSYB0U_nI9DGCnwT0t_J5TL75Rm5atkXW2-JaQkL3FAXGcNPu_LBRtrFnwK1Gt6g1xsF1p8dQUD_rUAhEuqFUbYv0BDmn_C6ZBnS0O5Iy4bkIVJiJICUSufbD8O5N5YYw-D77552LrB5d6AXCjizc5CgAqBqwHGUjNfplRHHuV5ptulOXrA2g2rnDF",
    thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuAS1s-K0vR5dkFoce3_8R8LtRO1lBnKR4Hnph0YT3cfwdtes5zALfsf0UdWbfxSYB0U_nI9DGCnwT0t_J5TL75Rm5atkXW2-JaQkL3FAXGcNPu_LBRtrFnwK1Gt6g1xsF1p8dQUD_rUAhEuqFUbYv0BDmn_C6ZBnS0O5Iy4bkIVJiJICUSufbD8O5N5YYw-D77552LrB5d6AXCjizc5CgAqBqwHGUjNfplRHHuV5ptulOXrA2g2rnDF",
    alt: "A minimalist steaming cup of artisan coffee",
    sort_order: 2
  },
  {
    id: "plant",
    name: "Congrats",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjGQO6KF-Yn8dfxLEG9NIlA4mPsH-1QXbLVUX0hvM2Qj4cNREz8gY5ra5fc5okiESHslJqJFbnyFUU_qGL5QRG-oB-3fVhIrFKAzOW1DqoYPdyrWoIJw92DvXUy25BwAnfzdBhmjU3HjDTb5SDijkQ-bQJnl0KUGcLo9UCN9AoZZqoaYLam5mnVHu9zxO8qIhosnbSHwWpyrVUamty3k3GjYfAzViYm5eo-wZsChFpEL4p4Hx58tey",
    thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjGQO6KF-Yn8dfxLEG9NIlA4mPsH-1QXbLVUX0hvM2Qj4cNREz8gY5ra5fc5okiESHslJqJFbnyFUU_qGL5QRG-oB-3fVhIrFKAzOW1DqoYPdyrWoIJw92DvXUy25BwAnfzdBhmjU3HjDTb5SDijkQ-bQJnl0KUGcLo9UCN9AoZZqoaYLam5mnVHu9zxO8qIhosnbSHwWpyrVUamty3k3GjYfAzViYm5eo-wZsChFpEL4p4Hx58tey",
    alt: "A delicate potted plant celebrating growth and success",
    sort_order: 3
  }
];

export const SEED_CARD_THEMES = [
  {
    id: "soft",
    name: "Soft Cozy",
    gradient_class: "from-surface-bright to-secondary-container",
    border_color: "border-[#4a6458]/30",
    bg_card: "bg-secondary-container/50",
    sort_order: 1
  },
  {
    id: "vibrant",
    name: "Modern Vibrant",
    gradient_class: "from-primary-container to-inverse-primary",
    border_color: "border-[#894f3a]/40",
    bg_card: "bg-primary-container/40",
    sort_order: 2
  }
];

export const SEED_INITIAL_CART = [
  {
    cart_instance_id: "default-cart-item-1",
    session_id: "default-session",
    gift_id: "coffee-card-cart",
    title: "Artisan Coffee eGift Card",
    price: 25.00,
    description: "A cozy treat for their morning routine. Redeemable at over 500 local cafes.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC78GNUoo2TgoX40B4l1ScVbdWLSiqkZiuCuziqEhyZjgfo53eqj2YG-xrrppzUnmetvtFU3IQdsYyVbZBfBtTVsSqoVd4_BC9l8o2bAsv4x3A5pFnTlmQoc95RkC2SGjgYUAtByrOkbgkHZikQMsVmb2ABoV9FW1izLRL92PdiH7WyVmB-c_rmxJLZbRyy218P5xzfnfXIX5ZbggrjGVPzbERjjTpS6hJDufXmfOG4Dr-GJvD3TSg_",
    is_custom: 0
  },
  {
    cart_instance_id: "default-cart-item-2",
    session_id: "default-session",
    gift_id: "meditation-subs-cart",
    title: "Mindful Minutes Subscription",
    price: 15.00,
    description: "1-month access to premium guided meditations and sleep stories.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgFYlUN-vO3u2V20HnCE3jRxiDOBLXmYbalEYTPfVe0ZKENVPCBscX_F3-i8uEWWGkgd15Yo-8dEBXrEuUQeuMaHut6S5Ng739sQRMdyLSQ1ds6E2ruJgUJOBO24lFUOcxN2To3YqasX0F4Eiu8kaVbj3B-bFgTsq6VFJzfRnlsMEthnTbwaq34bXO3GKKb3xJ_iqABS4b7ayT7IGwZXa_ulmXUhOzpIlqxchlCSmyAwUrFq2ws6hh",
    is_custom: 0
  }
];

export function seedDatabase(db = null) {
  const database = db || getDb();

  // Site config
  const insertConfig = database.prepare(`
    INSERT OR REPLACE INTO site_config (key, value) VALUES (?, ?)
  `);
  insertConfig.run('hero', JSON.stringify(SEED_HERO));

  // Categories
  const insertCat = database.prepare(`
    INSERT OR REPLACE INTO categories (id, type, name, title, description, icon, bg_class, border_class, text_class, button_bg, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const cat of SEED_QUICK_CATEGORIES) {
    insertCat.run(cat.id, 'quick', cat.name, cat.name, null, cat.icon, cat.bg_class, cat.border_class, cat.text_class, null, cat.sort_order);
  }

  for (const cat of SEED_VIBE_CATEGORIES) {
    insertCat.run(cat.id, 'vibe', cat.name, cat.title, cat.description, cat.icon, cat.bg_class, cat.border_class, cat.text_class, cat.button_bg, cat.sort_order);
  }

  // Gifts
  const insertGift = database.prepare(`
    INSERT OR REPLACE INTO gifts (id, title, subtitle, tag, tag_icon, description, price, featured, action_text, image, category)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const gift of SEED_GIFTS) {
    insertGift.run(gift.id, gift.title, gift.subtitle, gift.tag, gift.tag_icon, gift.description, gift.price, gift.featured, gift.action_text, gift.image, gift.category);
  }

  // Card designs
  const insertDesign = database.prepare(`
    INSERT OR REPLACE INTO card_designs (id, name, image, thumb, alt, sort_order)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  for (const design of SEED_CARD_DESIGNS) {
    insertDesign.run(design.id, design.name, design.image, design.thumb, design.alt, design.sort_order);
  }

  // Card themes
  const insertTheme = database.prepare(`
    INSERT OR REPLACE INTO card_themes (id, name, gradient_class, border_color, bg_card, sort_order)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  for (const theme of SEED_CARD_THEMES) {
    insertTheme.run(theme.id, theme.name, theme.gradient_class, theme.border_color, theme.bg_card, theme.sort_order);
  }

  // Default cart items for session 'default-session'
  const countCart = database.prepare('SELECT COUNT(*) as count FROM cart_items WHERE session_id = ?').get('default-session');
  if (countCart.count === 0) {
    const insertCart = database.prepare(`
      INSERT INTO cart_items (cart_instance_id, session_id, gift_id, title, price, description, image, is_custom)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const item of SEED_INITIAL_CART) {
      insertCart.run(item.cart_instance_id, item.session_id, item.gift_id, item.title, item.price, item.description, item.image, item.is_custom);
    }
  }

  // Default wishlist
  const countWishlist = database.prepare('SELECT COUNT(*) as count FROM wishlist_items WHERE session_id = ?').get('default-session');
  if (countWishlist.count === 0) {
    const insertWish = database.prepare(`
      INSERT OR IGNORE INTO wishlist_items (session_id, gift_id) VALUES (?, ?)
    `);
    insertWish.run('default-session', 'spotify-1yr');
  }

  return { success: true, message: 'Database seeded successfully' };
}

// Run standalone if executed directly
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  try {
    initDatabase();
    const result = seedDatabase();
    console.log(result.message);
    closeDatabase();
    process.exit(0);
  } catch (err) {
    console.error('Failed to seed database:', err);
    process.exit(1);
  }
}
