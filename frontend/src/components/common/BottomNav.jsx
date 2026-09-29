import React from 'react';
import { useGift } from '../../context/GiftContext.jsx';

export default function BottomNav() {
  const { activePage, setActivePage, cartItems } = useGift();
  const cartCount = cartItems.length;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-surface-container-low border-t-[1.5px] border-outline-variant/30 shadow-[0_-4px_20px_rgba(137,79,58,0.08)] rounded-t-2xl">
      {/* Home */}
      <button
        onClick={() => setActivePage('home')}
        className={`flex flex-col items-center justify-center rounded-full px-4 py-1.5 active:scale-90 transition-all duration-300 ease-out ${
          activePage === 'home'
            ? 'bg-primary-container text-on-primary-container shadow-sm'
            : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        <span className={`material-symbols-outlined text-[22px] ${activePage === 'home' ? 'fill' : ''}`}>home</span>
        <span className="text-[11px] font-medium mt-0.5">Home</span>
      </button>

      {/* Categories */}
      <button
        onClick={() => setActivePage('categories')}
        className={`flex flex-col items-center justify-center rounded-full px-4 py-1.5 active:scale-90 transition-all duration-300 ease-out ${
          activePage === 'categories'
            ? 'bg-primary-container text-on-primary-container shadow-sm'
            : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        <span className={`material-symbols-outlined text-[22px] ${activePage === 'categories' ? 'fill' : ''}`}>redeem</span>
        <span className="text-[11px] font-medium mt-0.5">Categories</span>
      </button>

      {/* Customize */}
      <button
        onClick={() => setActivePage('customize')}
        className={`flex flex-col items-center justify-center rounded-full px-4 py-1.5 active:scale-90 transition-all duration-300 ease-out ${
          activePage === 'customize'
            ? 'bg-primary-container text-on-primary-container shadow-sm'
            : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        <span className={`material-symbols-outlined text-[22px] ${activePage === 'customize' ? 'fill' : ''}`}>palette</span>
        <span className="text-[11px] font-medium mt-0.5">Customize</span>
      </button>

      {/* Cart */}
      <button
        onClick={() => setActivePage('cart')}
        className={`flex flex-col items-center justify-center rounded-full px-4 py-1.5 active:scale-90 transition-all duration-300 ease-out relative ${
          activePage === 'cart'
            ? 'bg-primary-container text-on-primary-container shadow-sm'
            : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        <div className="relative">
          <span className={`material-symbols-outlined text-[22px] ${activePage === 'cart' ? 'fill' : ''}`}>shopping_bag</span>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[11px] font-medium mt-0.5">Cart</span>
      </button>
    </nav>
  );
}
