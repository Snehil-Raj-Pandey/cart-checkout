export const HERO_DATA = {
  title: "Send a Smile Digitally.",
  subtitle: "Thoughtful gifts for every moment, delivered instantly to their inbox.",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUuokKXEgJD65s2TKZ6m3tVOHfjnEhoJR9TSGcFasq9PvLfbhArrUAGFGKq2SqZNJLALe8RfXfXEYs9a1jROIxNScK1NQy7uw671u5ceIgMi8Q_K8hSgB9jvZVjfRXMXwKGgJM00PnptxLh3oNllfVK2qEcX_jtbO3rJ1L5dNJdAohm-ggZh6uHc-yBrVzbPjbja4Eg4cV7waIM4PL0wIto0lT3a4-SvZMvUv_h-VZeYR329Lb7pGE",
  alt: "A stylized 3D illustration of a floating digital gift box bursting with colorful confetti and soft glowing hearts, set against a warm peach and cream background."
};

export const QUICK_CATEGORIES = [
  { id: "ecards", name: "E-Cards", icon: "mail", bg: "bg-secondary-container", border: "border-secondary/20", text: "text-on-secondary-container" },
  { id: "subs", name: "Subs", icon: "autorenew", bg: "bg-tertiary-container", border: "border-tertiary/20", text: "text-on-tertiary-container" },
  { id: "gaming", name: "Gaming", icon: "sports_esports", bg: "bg-error-container", border: "border-error/20", text: "text-on-error-container" },
  { id: "experience", name: "Experience", icon: "local_activity", bg: "bg-primary-fixed", border: "border-primary/20", text: "text-on-primary-fixed" },
  { id: "all", name: "All Gifts", icon: "grid_view", bg: "bg-surface-variant", border: "border-outline-variant/50", text: "text-on-surface-variant" }
];

export const TRENDING_GIFTS = [
  {
    id: "spotify-1yr",
    title: "Spotify Premium - 1 Year",
    tag: "#1 Popular",
    tagIcon: "local_fire_department",
    description: "Give the gift of uninterrupted music. Perfect for commutes, workouts, and chill sessions.",
    price: 99.00,
    featured: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_N8w5UESayAUX_53VfHD40npbkPeKbOf0RLMON68T_vSWu0p8738K1bGvLDcFvlpyClI20M08I3SbYzfbakmn2xjX8MZYihcegbPGjgtzm5bQCHcELOaImFKvMq1cStTbkdgD-9hW3w7XLsETSLo8aGqZKNTDYBdCoyKQd3-C68bhB2nXFWoqWvTcqQlQEyuMDk9qP5C-3M6SFmUEzdyIRlGbd9pyv2lwpb4brKgqj3g72WR-vJF-",
    category: "subs"
  },
  {
    id: "starbucks-card",
    title: "Starbucks Gift Card",
    subtitle: "For the caffeine lover.",
    description: "Treat your friend to their favorite daily brew, specialty lattes, and bakery treats.",
    price: 25.00,
    featured: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKeGbGOdXzvCYe0GdHCHyP3qniMRLibmslL5F98UAbywjR20tstJdtGunW75Sm5bpTVWf1G0PuaP0-qjUiYt7NxnReYk8oLV_iyGSEvbpfCVTEI3gRXb7Ei9TYDPH_iXJDG_R7lxDu5iNVj1O00gaw4HILjU3CXhpAsz72OUBxfjvaQBRs8UN0ySx1m2mSA4b9hShXr0qPY1o1eJB9w0fzYa20J3v1X-4MIBSQ5Pg4fEqU1HgvvUYU",
    category: "ecards"
  },
  {
    id: "netflix-3mo",
    title: "Netflix 3 Months",
    subtitle: "Binge-watching bliss.",
    description: "Endless movies, shows, and documentaries right on demand anytime.",
    price: 45.00,
    featured: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCi07K2u-lNhk-pj-vlx88E6-FzzFoqefdf1fZJj8rj1gBCmpHDO2y5807S5MPyIXFDenMz9KSgiatKzmvokT_p3piUrJozx66G5Q3ia4lp3SR_s3Dbi7tA_NXTa438RReo78zQHHJASvUho_l0Mly0_dFZjltW2zp04opf9s46RbXoztJle0NFkZEvXpQ-C9Shj4yQAw_jFYyGp9JJsoNRrUshPoiyZAtjKcItxNR5Vp87V4zRlqvh",
    category: "subs"
  },
  {
    id: "premium-ecards",
    title: "Premium Animated E-Cards",
    subtitle: "Artisan Digital Greetings",
    description: "Send a beautifully crafted, animated message that feels personal and high-quality. Browse our artist collection.",
    price: 15.00,
    featured: true,
    actionText: "Customize Card",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxyWIKwDNehFxyy_iDe-VwqaaCe0XxkCgS2euGpb5unj2N4veXg3vwZsUK_iXnvjdURq7Dx58qXDw194KOUntqkRGOmSghtQ9_1v901ELexWAR2rY6_H4MR0xPQ7jTORYyh-FQOWefhN4ewoZg2jJ289tAKyFrDl__aT-HjQi4Vek0wZpToLoF8z4IBHy9IyhUH6He69EDzJ74TJLfcKBZSaAubSsxdSzvsTewbtUedkulXUXSoRdU",
    category: "ecards"
  }
];

export const VIBE_CATEGORIES = [
  {
    id: "gamers",
    title: "For Gamers",
    description: "RGB, comfort, and performance.",
    icon: "sports_esports",
    bgClass: "bg-secondary-fixed",
    borderClass: "border-secondary-fixed-dim",
    textClass: "text-on-secondary-fixed",
    buttonBg: "bg-on-secondary-fixed"
  },
  {
    id: "music-lovers",
    title: "Music Lovers",
    description: "Vinyl, speakers, and soundscapes.",
    icon: "headphones",
    bgClass: "bg-primary-fixed",
    borderClass: "border-primary-fixed-dim",
    textClass: "text-on-primary-fixed",
    buttonBg: "bg-on-primary-fixed"
  },
  {
    id: "coffee-addicts",
    title: "Coffee Addicts",
    description: "Beans, brewers, and mugs.",
    icon: "coffee",
    bgClass: "bg-tertiary-fixed",
    borderClass: "border-tertiary-fixed-dim",
    textClass: "text-on-tertiary-fixed",
    buttonBg: "bg-on-tertiary-fixed"
  },
  {
    id: "movie-buffs",
    title: "Movie Buffs",
    description: "Cinema snacks and cozy throws.",
    icon: "movie",
    bgClass: "bg-surface-container-highest",
    borderClass: "border-outline-variant",
    textClass: "text-on-surface",
    buttonBg: "bg-on-surface"
  },
  {
    id: "plant-parents",
    title: "Plant Parents",
    description: "Greenery and growing tools.",
    icon: "local_florist",
    bgClass: "bg-secondary-container",
    borderClass: "border-secondary-fixed",
    textClass: "text-on-secondary-container",
    buttonBg: "bg-on-secondary-container"
  },
  {
    id: "bookworms",
    title: "Bookworms",
    description: "Stories, bookmarks, and lamps.",
    icon: "menu_book",
    bgClass: "bg-error-container",
    borderClass: "border-error-container/80",
    textClass: "text-on-error-container",
    buttonBg: "bg-on-error-container"
  }
];

export const CARD_DESIGNS = [
  {
    id: "birthday",
    name: "Birthday",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvDZEhGP2uLQ1rAxqE63cVpQ97kS8olYtKl8se7qvVThaVP9o8wDP1qROx1DVyHrWgHeN2vATPmWMaY_9Id4YsW-_oI_2ZbY6f7GP7a3j2Ul7wxte-QcXu8_hVndkK20bBJ4GiO-_MRltusJArJLr7y7hSJ7YJK5RGfVmblV21V8R8rS4DaY2XJ9ZCnAvHkXpJURk8HFhZOz0XSdKBmcchG9TuoXX8WNUxwbN-SwsPWZMDBgh2dRLT",
    thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjG3fgRxP005mKzSPFn8Kz02JCB2SbKOC8OiAMT1v0GMDJvo2IG5OIEYzMFJsja7NVIyuJEpAl62glY3HgIbOxGuiwcnpspcbgML7WGGyg_7b6l8i9kbJA6MwI_taF_q8ZKEa0RxE0hUT_ruAw38DbtUQ2FhpsaH21JceL4lHPballeN4w9JoJJe8_sl7hFP3aLrPeZ_CmmkvLCwbCHY0LHQhwJI6m-Ro14S2_4uFYICXw8rBLLrAT",
    alt: "Pastel colored birthday cake with squiggly candles"
  },
  {
    id: "coffee",
    name: "Just Because",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAS1s-K0vR5dkFoce3_8R8LtRO1lBnKR4Hnph0YT3cfwdtes5zALfsf0UdWbfxSYB0U_nI9DGCnwT0t_J5TL75Rm5atkXW2-JaQkL3FAXGcNPu_LBRtrFnwK1Gt6g1xsF1p8dQUD_rUAhEuqFUbYv0BDmn_C6ZBnS0O5Iy4bkIVJiJICUSufbD8O5N5YYw-D77552LrB5d6AXCjizc5CgAqBqwHGUjNfplRHHuV5ptulOXrA2g2rnDF",
    thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuAS1s-K0vR5dkFoce3_8R8LtRO1lBnKR4Hnph0YT3cfwdtes5zALfsf0UdWbfxSYB0U_nI9DGCnwT0t_J5TL75Rm5atkXW2-JaQkL3FAXGcNPu_LBRtrFnwK1Gt6g1xsF1p8dQUD_rUAhEuqFUbYv0BDmn_C6ZBnS0O5Iy4bkIVJiJICUSufbD8O5N5YYw-D77552LrB5d6AXCjizc5CgAqBqwHGUjNfplRHHuV5ptulOXrA2g2rnDF",
    alt: "A minimalist steaming cup of artisan coffee"
  },
  {
    id: "plant",
    name: "Congrats",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjGQO6KF-Yn8dfxLEG9NIlA4mPsH-1QXbLVUX0hvM2Qj4cNREz8gY5ra5fc5okiESHslJqJFbnyFUU_qGL5QRG-oB-3fVhIrFKAzOW1DqoYPdyrWoIJw92DvXUy25BwAnfzdBhmjU3HjDTb5SDijkQ-bQJnl0KUGcLo9UCN9AoZZqoaYLam5mnVHu9zxO8qIhosnbSHwWpyrVUamty3k3GjYfAzViYm5eo-wZsChFpEL4p4Hx58tey",
    thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjGQO6KF-Yn8dfxLEG9NIlA4mPsH-1QXbLVUX0hvM2Qj4cNREz8gY5ra5fc5okiESHslJqJFbnyFUU_qGL5QRG-oB-3fVhIrFKAzOW1DqoYPdyrWoIJw92DvXUy25BwAnfzdBhmjU3HjDTb5SDijkQ-bQJnl0KUGcLo9UCN9AoZZqoaYLam5mnVHu9zxO8qIhosnbSHwWpyrVUamty3k3GjYfAzViYm5eo-wZsChFpEL4p4Hx58tey",
    alt: "A delicate potted plant celebrating growth and success"
  }
];

export const CARD_THEMES = [
  {
    id: "soft",
    name: "Soft Cozy",
    gradientClass: "from-surface-bright to-secondary-container",
    borderColor: "border-[#4a6458]/30",
    bgCard: "bg-secondary-container/50"
  },
  {
    id: "vibrant",
    name: "Modern Vibrant",
    gradientClass: "from-primary-container to-inverse-primary",
    borderColor: "border-[#894f3a]/40",
    bgCard: "bg-primary-container/40"
  }
];

export const INITIAL_CART = [
  {
    id: "coffee-card-cart",
    title: "Artisan Coffee eGift Card",
    price: 25.00,
    description: "A cozy treat for their morning routine. Redeemable at over 500 local cafes.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC78GNUoo2TgoX40B4l1ScVbdWLSiqkZiuCuziqEhyZjgfo53eqj2YG-xrrppzUnmetvtFU3IQdsYyVbZBfBtTVsSqoVd4_BC9l8o2bAsv4x3A5pFnTlmQoc95RkC2SGjgYUAtByrOkbgkHZikQMsVmb2ABoV9FW1izLRL92PdiH7WyVmB-c_rmxJLZbRyy218P5xzfnfXIX5ZbggrjGVPzbERjjTpS6hJDufXmfOG4Dr-GJvD3TSg_"
  },
  {
    id: "meditation-subs-cart",
    title: "Mindful Minutes Subscription",
    price: 15.00,
    description: "1-month access to premium guided meditations and sleep stories.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgFYlUN-vO3u2V20HnCE3jRxiDOBLXmYbalEYTPfVe0ZKENVPCBscX_F3-i8uEWWGkgd15Yo-8dEBXrEuUQeuMaHut6S5Ng739sQRMdyLSQ1ds6E2ruJgUJOBO24lFUOcxN2To3YqasX0F4Eiu8kaVbj3B-bFgTsq6VFJzfRnlsMEthnTbwaq34bXO3GKKb3xJ_iqABS4b7ayT7IGwZXa_ulmXUhOzpIlqxchlCSmyAwUrFq2ws6hh"
  }
];
