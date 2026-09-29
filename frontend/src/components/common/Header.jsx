import React, { useState } from 'react';
import { useGift } from '../../context/GiftContext.jsx';

export default function Header() {
  const { activePage, setActivePage, cartItems, searchQuery, setSearchQuery } = useGift();
  const [showSearchInput, setShowSearchInput] = useState(false);

  const cartCount = cartItems.length;

  return (
    <header className="w-full top-0 sticky z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 shadow-sm shadow-primary/10">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between px-6 py-3.5 w-full max-w-7xl mx-auto">
          {/* Left: Search Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full active:scale-95 duration-200"
              title="Search gifts"
            >
              <span className="material-symbols-outlined text-[24px]">search</span>
            </button>

            {showSearchInput && (
              <div className="relative animate-fadeIn">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search gifts..."
                  autoFocus
                  className="pl-4 pr-8 py-1.5 bg-surface-container-low border border-outline-variant/50 rounded-full text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-primary w-48 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface text-xs"
                  >
                    ×
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Center: Brand Logo */}
          <button
            onClick={() => setActivePage('home')}
            className="flex items-center gap-2 group text-left"
          >
            <h1 className="font-quicksand font-bold text-2xl lg:text-3xl text-primary tracking-tight transition-transform group-hover:scale-[1.02]">
              Gift Paradise
            </h1>
          </button>

          {/* Right: Cart Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActivePage('cart')}
              className={`relative p-2.5 rounded-full transition-all active:scale-95 ${
                activePage === 'cart'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
              }`}
              title="View Cart"
            >
              <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-primary text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-surface">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="flex justify-center gap-8 pb-2.5 pt-1 border-t border-outline-variant/20 max-w-7xl mx-auto px-6">
          <button
            onClick={() => setActivePage('home')}
            className={`font-dm-sans text-sm font-medium flex items-center gap-1.5 pb-1 border-b-2 transition-all ${
              activePage === 'home'
                ? 'text-primary border-primary'
                : 'text-on-surface-variant border-transparent hover:text-primary'
            }`}
          >
            <span className={`material-symbols-outlined text-[18px] ${activePage === 'home' ? 'fill' : ''}`}>home</span>
            Home
          </button>

          <button
            onClick={() => setActivePage('categories')}
            className={`font-dm-sans text-sm font-medium flex items-center gap-1.5 pb-1 border-b-2 transition-all ${
              activePage === 'categories'
                ? 'text-primary border-primary'
                : 'text-on-surface-variant border-transparent hover:text-primary'
            }`}
          >
            <span className={`material-symbols-outlined text-[18px] ${activePage === 'categories' ? 'fill' : ''}`}>redeem</span>
            Categories
          </button>

          <button
            onClick={() => setActivePage('customize')}
            className={`font-dm-sans text-sm font-medium flex items-center gap-1.5 pb-1 border-b-2 transition-all ${
              activePage === 'customize'
                ? 'text-primary border-primary'
                : 'text-on-surface-variant border-transparent hover:text-primary'
            }`}
          >
            <span className={`material-symbols-outlined text-[18px] ${activePage === 'customize' ? 'fill' : ''}`}>palette</span>
            Customize Gift
          </button>

          <button
            onClick={() => setActivePage('cart')}
            className={`font-dm-sans text-sm font-medium flex items-center gap-1.5 pb-1 border-b-2 transition-all ${
              activePage === 'cart'
                ? 'text-primary border-primary'
                : 'text-on-surface-variant border-transparent hover:text-primary'
            }`}
          >
            <span className={`material-symbols-outlined text-[18px] ${activePage === 'cart' ? 'fill' : ''}`}>shopping_bag</span>
            Cart & Checkout
            {cartCount > 0 && (
              <span className="bg-primary-container text-on-primary-container text-[11px] px-1.5 py-0.5 rounded-full font-bold ml-1">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-5 py-3.5">
        <button
          onClick={() => setActivePage('home')}
          className="font-quicksand font-bold text-xl text-primary tracking-tight"
        >
          Gift Paradise
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowSearchInput(!showSearchInput)}
            className="text-on-surface-variant p-2 rounded-full"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          <button
            onClick={() => setActivePage('cart')}
            className="text-on-surface-variant p-2 rounded-full relative"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full"></span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search input dropdown */}
      {showSearchInput && (
        <div className="md:hidden px-5 pb-3 animate-fadeIn">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search gifts..."
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant/40 rounded-full text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      )}
    </header>
  );
}
