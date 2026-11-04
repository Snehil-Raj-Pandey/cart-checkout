/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-dim": "#dddad4",
        "on-secondary-fixed": "#062017",
        "tertiary-fixed": "#f2e0c6",
        "secondary": "#4a6458",
        "surface": "#fdf9f3",
        "outline": "#85736e",
        "primary-container": "#ffb399",
        "tertiary-fixed-dim": "#d5c4ab",
        "surface-bright": "#fdf9f3",
        "on-primary": "#ffffff",
        "surface-container-high": "#ebe8e2",
        "tertiary-container": "#d4c3aa",
        "on-primary-container": "#7a432f",
        "on-surface": "#1c1c18",
        "outline-variant": "#d7c2bb",
        "surface-container-lowest": "#ffffff",
        "on-primary-fixed": "#360e02",
        "primary-fixed": "#ffdbcf",
        "secondary-fixed-dim": "#b0cdbe",
        "on-tertiary-container": "#5c503c",
        "on-tertiary-fixed-variant": "#504532",
        "inverse-primary": "#ffb59c",
        "on-secondary-fixed-variant": "#334c41",
        "on-error-container": "#93000a",
        "tertiary": "#695d48",
        "inverse-on-surface": "#f4f0ea",
        "on-tertiary-fixed": "#231a0a",
        "surface-tint": "#894f3a",
        "on-background": "#1c1c18",
        "primary": "#894f3a",
        "error": "#ba1a1a",
        "on-tertiary": "#ffffff",
        "surface-container": "#f1ede7",
        "background": "#fdf9f3",
        "inverse-surface": "#31302d",
        "on-secondary": "#ffffff",
        "secondary-fixed": "#cce9da",
        "surface-variant": "#e6e2dc",
        "on-primary-fixed-variant": "#6d3825",
        "secondary-container": "#c9e6d7",
        "on-secondary-container": "#4e685c",
        "primary-fixed-dim": "#ffb59c",
        "on-surface-variant": "#52433f",
        "surface-container-highest": "#e6e2dc",
        "error-container": "#ffdad6",
        "surface-container-low": "#f7f3ed",
        "on-error": "#ffffff"
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
      fontFamily: {
        "quicksand": ["Quicksand", "sans-serif"],
        "dm-sans": ["DM Sans", "sans-serif"]
      }
    }
  },
  plugins: []
};
